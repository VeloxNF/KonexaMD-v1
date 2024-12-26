let { follSun } = (await import('../lib/follSun.js'))
import util from 'util'
const api_id = global.apiId.lapak
const api_key = global.api.lapak

let handler = async (m, {conn, usedPrefix, command, args, text}) => {

switch (command) {
case "profile_seller": {
const  CekProfile = await new follSun(api_id, api_key).cekProfile()
m.reply(`Profile Berhasil Ditemukan\n\nFull Name: ${util.format(CekProfile.data.full_name)}\nUsername: ${util.format(CekProfile.data.username)}\nSaldo: Rp ${util.format(CekProfile.data.balance)}`)
}
break
case "listproduk_suntik": {
if (!args[0]) return m.reply(`mau dikirim lewat apa ka\n1. document\n2. chat\n\nContoh: ${command} 1`)

  await new follSun(api_id, api_key).cekServices("SMM").then(data => {
    const produk = data.data.map((txt1, txt2) => {
      const gettxt = ["ID: " + txt1.id + "\nProduct Name: " + txt1.name + "\nDeskripsi: " + txt1.description + "\nHarga: Rp " + txt1.price + "\nCategory: " + txt1.category + "\nMin Order: " + txt1.min + "\nMax Order: " + txt1.max].join("\n\n")
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
case "suntik_sosmed": {
  if (!text) return m.reply(`Silahkan Isi Format Berikut\n\n${usedPrefix+command} ID Layanan,Jumlah Pesanan,Link Tujuan`)
  const id_tujuan = text.split(",")[0]
  const jumlah_pesanan = text.split(",")[1]
  const link_tujuan = text.split(",")[2]
let functions = `Format Salah!!\nsilahkan isi sesuai format\n\n${usedPrefix+command} ID Layanan,Jumlah Pesanan,Link Tujuan`
if (!id_tujuan && !jumlah_pesanan && !link_tujuan) return m.reply(functions)
  try {
    await new follSun(api_id, api_key).order(id_tujuan, link_tujuan, jumlah_pesanan).then(data => {
      const mesk = data.data
      m.reply(util.format(mesk))
      console.log(data)
    })
  } catch (err) {
    m.reply(util.format(err.response.data))
  }
}
break
case "cekorder_sosmed": {
  if (!text) return m.reply(`Example: ${usedPrefix+command} IdTransaksi`)
  try {
    await new follSun(api_id, api_key).cekStatus(text).then(data => {
      const meski = data.data
      m.reply(util.format(meski))
    })
  } catch (error) {
    m.reply(util.format(error.response.data))
  }
}
break
}
}
handler.help = handler.command = ['listproduk_suntik','profile_seller','cekorder_sosmed','suntik_sosmed']
handler.tags = ['main']
handler.owner = true

export default handler