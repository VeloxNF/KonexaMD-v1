import axios from 'axios'
import {
    Saweria
} from '../scraper/saweria.js';
import fs from 'fs';

let handler = async (m, {
    text,
    conn,
    func
}) => {
    let json = JSON.parse(await fs.readFileSync('./lib/database/login_saweria.js'))
    conn.depo = conn.depo ? conn.depo : {}
    if ((m.sender in conn.depo)) throw 'Kamu masih ada sesi pembayaran yang belum selesai'

    if (!text) return m.reply('Masukan nominal & pesan')
    let [nominal, msg] = text.split(" ");
    let swr = new Saweria();
    let { data: user } = await swr.login(json.email, json.pass);
    let sawer = new Saweria(user.user_id);
    let harga = nominal * 1 + 200;
    let {
        data
    } = await sawer.createQr(harga, msg);
    
    conn.depo[m.sender] = {
        nama: m.name,
        message: msg,
        method_payment: data.payment_type,
        status: data.status === 'PENDING' ? 'PENDING' : 'SUKSES',
        id: data.id,
        nominal: `Rp${await func.toRupiah(harga)} (+ PPN Rp200)`,
        expired: data.expired_at,
        mata_uang: data.currency
    }

    let cap = `*Transaksi saweria*
    
*Nama*: ${m.name}
*Message*: ${msg}
*Method_payment*: ${data.payment_type}
*Status*: ${data.status === 'PENDING' ? 'PENDING' : 'SUKSES'}
*Id*: ${data.id}
*Nominal*: Rp${await func.toRupiah(harga)} (+ PPN Rp200)
*Expired*: ${data.expired_at}
*Mata uang*: ${data.currency}

Note: 
.cekpay <id> (untuk mengecek pembayaran)
.canceldepo (untuk membatalkan pembayaran)

#Mohon_tunggu_konfirmasi_pembayaran_setelah_5_menit
#Bayar_segera_dalam_waktu_5_menit
`

    let img = Buffer.from(data.qr_image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    let key = await conn.sendMessage(m.chat, {
        image: img,
        caption: cap
    }, {
        quoted: m
    })

    /*
    Verifikasi pembayaran 
    */
    
        setTimeout(async () => {
        let imgg = await ssweb(`https://saweria.co/receipt/${data.id}`)
            conn.sendMessage(m.chat, {
                image: imgg.result,
                caption: cap
            }, {
                quoted: m
            })
        
        }, 1000 * 60 * 5)
        
        setTimeout(async () => {
        conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: true,
                id: key.id,
                participant: m.sender
            }
        })
       delete conn.depo[m.sender]
    }, 1000 * 60 * 10)
    
    
    
}
handler.help = ['deposit']
handler.tags = ['owner']
handler.command = /^(depo(sit)?)$/i

export default handler

async function ssweb(url, device = 'desktop') {
    return new Promise((resolve, reject) => {
        const base = 'https://www.screenshotmachine.com'
        const param = {
            url: url,
            device: device,
            cacheLimit: 0
        }
        axios({
            url: base + '/capture.php',
            method: 'POST',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((data) => {
            const cookies = data.headers['set-cookie']
            if (data.data.status == 'success') {
                axios.get(base + '/' + data.data.link, {
                    headers: {
                        'cookie': cookies.join('')
                    },
                    responseType: 'arraybuffer'
                }).then(({
                    data
                }) => {
                    let result = {
                        status: 200,
                        author: 'tio',
                        result: data
                    }
                    resolve(result)
                })
            } else {
                reject({
                    status: 404,
                    author: 'Tio',
                    message: data.data
                })
            }
        }).catch(reject)
    })
}