/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`“${pickRandom(global.wota)}”`, m)
}
handler.help = ['wotacek']
handler.tags = ['primbon']
handler.command = /^(wotacek|cekwota)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

export default handler 

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.wota = [
'Wota Cek : 2%\n\nWota Baru Kah!!??🥵',
'Wota Cek : 7%\n\nCih Wota cupu🤪',
'Wota Cek : 12%\n\nMasih Butuh Bimbingan😌',
'Wota Cek : 22%\n\nBoleh Juga',
'Wota Cek : 27%\n\nWota Dikit',
'Wota Cek : 35%\n\nWota ¼',
'Wota Cek : 41%\n\nLumayan Tapi Masih Cupu',
'Wota Cek : 48%\n\nSetengah Wota',
'Wota Cek : 56%\n\nAnak Wota Biasa',
'Wota Cek : 64%\n\nUdah Boleh Nih😏',
'Wota Cek : 71%\n\nPasti Lu Punya Seribu Oshi',
'Wota Cek : 1%\n\n99% Ga Bener :v !!!',
'Wota Cek : 77%\n\nGak Akan Salah Lagi Dah Lu Bejibun Oshi Cuy🤣',
'Wota Cek : 83%\n\nSYNDROM WOTA🗿',
'Wota Cek : 89%\n\nSEPUH WOTA😌👍',
'Wota Cek : 94%\n\nUdah Elite Sih Ini😂',
'Wota Cek : 100%\n\nBAU OSHI NYA SAMPE SINI CUY!!!🥵',
'Wota Cek : 100%\n\nBAU OSHI NYA SAMPE SINI CUY!!!🥵',
'Wota Cek : 100%\n\nBAU OSHI NYA SAMPE SINI CUY!!!🥵',
'Wota Cek : 100%\n\nBAU OSHI NYA SAMPE SINI CUY!!!🥵',
]