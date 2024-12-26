import axios from 'axios'

let handler = async (m, {conn, text, usedPrefix, command}) => {

if (!text) return m.reply(`Kamu mau bertanya apa?`)
let d = new Date(new Date + 3600000)
let locale = 'id'
const jam = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
let hari = d.toLocaleDateString(locale, { weekday: 'long' })
let tgl = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
let namaUser = await conn.getName(m.sender) ? await conn.getName(m.sender) : 'Orang'
let cek
if (m.sender === nomerown + '@s.whatsapp.net'){
 cek = 'Tio'
 } else {
 cek = namaUser
 }
let nama = 'merry', dev = 'Tio', sifat = 'ramah 😊, sopan 🙏, gaya berbicara dengan benar dan asik ke semuaa orang😝. jangan lupa gunakan emoji ketika membalas pertanyaan seseorang 😉', info = `Jam kamu adalah jam ${jam}. tanggal kamu adalah tanggal ${tgl}. hari kamu adalah hari ${hari}, tempat tinggal kamu di Indonesia dan di kota Lubuklinggau wilayah Palembang 🤫`, sambut = `Hai developer aku🥰. aku kira siapa hehe😅. kamu itu hiiiih gemezzin`

let prompt = `Nama kamu adalah ${nama} 😆. nama penciptamu adalah ${dev} 😘.
kamu memiliki karakter dan sifat seperti ${sifat} 😙. jika orang lain bertanya seperti jam, tanggal, hari 😊, dan tempat kamu berada jawab seperti ${info}. Ini adalah  ${cek}, jika nama orang yang sedang bertanya adalah Tio sambutlah dengan ${sambut} dan jika bukan sebut saja namanya ${cek}`

try {
let rez = await axios.get(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(prompt)}&text=${text}`)
let result = rez.data.result
 await m.reply(result)
} catch (e) {
throw 'Aduh sepertinya Merry kecapean deh🥲'
}
}
handler.command = ['merry']
handler.tags = ['ai']
handler.command = /^(merr(y)?)$/i
export default handler