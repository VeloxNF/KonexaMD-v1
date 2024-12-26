import util from 'util'
import { suntik } from '../lib/suntik_web.js'
const api_id = global.apiId.smm
const api_key = global.api.smm

let handler = async (m, {conn, usedPrefix, command, args, text}) => {

switch (command) {
case "my_seller": {
const  CekProfile = await new suntik(api_id, api_key).cekProfile()
m.reply(`Profile Berhasil Ditemukan\n\nSaldo: Rp ${util.format(CekProfile.balance)}`)
}
break
case "listproduk_web": {
if (!args[0]) return m.reply(`mau dikirim lewat apa ka\n1. document\n2. chat\n\nContoh: ${command} 1`)

  await new suntik(api_id, api_key).cekServices().then(data => {
    const produk = data.services.map((txt1, txt2) => {
      const gettxt = ["ID: " + txt1.id + "\nProduct Name: " + txt1.name + "\nDeskripsi: " + txt1.type + "\nHarga: Rp " + txt1.price + "\nCategory: " + txt1.category + "\nMin Order: " + txt1.min + "\nMax Order: " + txt1.max + "\nRefill: " + txt1.refill + "\nStatus: " + txt1.status + "\nNote: " + txt1.note].join("\n\n")
      return gettxt
    }).join("\n\n")
    
if  (args[0] == '1') {
    conn.sendMessage(m.chat, {
      "document": Buffer.from(produk, "utf8"),
      "fileName": "list-produk.txt",
      "caption": "List Ada Di Dalem File Ini",
      "mimetype": "text/plain"
    }, { quoted: m })
    } else if (args[0] == '2') {
    m.reply(produk)
    } else {
m.reply(`perintah tidak ditemukan\nmasukkan perintah berikut:\n1. document\n2. chat\n\nContoh: ${command} 1`)
    }
  })
}
break
case "suntik_web": {
  if (!text) return m.reply(`Silahkan Isi Format Berikut\n\n${usedPrefix+command} ID Layanan,Jumlah Pesanan,Link Tujuan`)
  const id_tujuan = text.split(",")[0]
  const jumlah_pesanan = text.split(",")[1]
  const link_tujuan = text.split(",")[2]
let functions = `Format Salah!!\nsilahkan isi sesuai format\n\n${usedPrefix+command} ID Layanan,Jumlah Pesanan,Link Tujuan`
if (!id_tujuan && !jumlah_pesanan && !link_tujuan) return m.reply(functions)
  try {
    await new suntik(api_id, api_key).order(id_tujuan, link_tujuan, jumlah_pesanan).then(data => {
      const mesk = data
      m.reply(util.format(`Id: ${mesk.order}\nMsg: ${mesk.msg}`))
      console.log(data)
    })
  } catch (err) {
    m.reply(util.format(err.response.data))
  }
}
break
case "cekorder_web": {
  if (!text) return m.reply(`Example: ${usedPrefix+command} IdTransaksi`)
  try {
    await new suntik(api_id, api_key).cekStatus(text).then(data => {
      const meski = data
      m.reply(util.format(meski))
    })
  } catch (error) {
    m.reply(util.format(error.response.data))
  }
}
break
case "refill_web": {
  if (!text) return m.reply(`Example: ${usedPrefix+command} IdTransaksi`)
  try {
    await new suntik(api_id, api_key).refill(text).then(data => {
      const meskii = data
      m.reply(util.format(meskii))
    })
  } catch (error) {
    m.reply(util.format(error.response.data))
  }
}
break
case "refill_status": {
  if (!text) return m.reply(`Example: ${usedPrefix+command} IdTransaksi`)
  try {
    await new suntik(api_id, api_key).refillStatus(text).then(data => {
      const meskki = data
      m.reply(util.format(meskki))
    })
  } catch (error) {
    m.reply(util.format(error.response.data))
  }
}
break
}
}
handler.help = handler.command = ["my_seller",
"listproduk_web",
"suntik_web",
"cekorder_web",
"refill_web",
"refill_status"]
handler.tags = ['internet']
handler.owner = true

export default handler