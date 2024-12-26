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
    let json = JSON.parse(await fs.readFileSync('./lib/database/login_saweria.js'));
    conn.depo = conn.depo ? conn.depo : {}
    if (!(m.sender in conn.depo)) throw 'Kamu tidak ada sesi pembayaran. silahkan lakukan deposit terlebih dahulu';
    if (!text) throw 'masukan id transaksi';
    let user = conn.depo[m.sender];
    if (text !== user.id) throw 'id pembayaran tidak valid'
    let swr = new Saweria();
    let { data: logg } = await swr.login(json.email, json.pass);
    let sawer = new Saweria(logg.user_id);
    let cap = `*Transaksi saweria*
 
*Nama*: ${user.nama}
*Message*: ${user.message}
*Method_payment*: ${user.method_payment}
*Status*: ${user.status === 'PENDING' ? 'PENDING' : 'SUKSES'}
*Id*: ${user.id}
*Nominal*: ${user.nominal}
*Expired*: ${user.expired}
*Mata uang*: ${user.mata_uang}

Note: .cekpay <id> (untuk mengecek pembayaran)
#Mohon_tunggu_konfirmasi_pembayaran_setelah_5_menit
#Bayar_segera_dalam_waktu_5_menit
`
    let {
        status
    } = await sawer.cekPay(text);
    if (status === true) {
        conn.sendMessage(m.sender, {
            image: (await ssweb('https://saweria.co/receipt/' + user.id)).result,
            caption: cap
        }, {
            quoted: m
        })
    } else {
        conn.sendMessage(m.sender, {
            image: {
                url: 'https://telegra.ph/file/6b5754b68d22094858127.jpg'
            },
            caption: cap
        }, {
            quoted: m
        })
    }
}
handler.help = ['cekpayment']
handler.tags = ['owner']
handler.command = /^(cekpay(ment)?)$/i

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
                        author: 'Ryzn',
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