/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, command, text }) => {
	
    if (!text) return conn.reply(m.chat, 'Ketik Namanya!', m)
	
  let kon = `
╭─────「 *Kontol ${text}* 」
│◦ Nama : ${text}
│◦ Kontol : ${pickRandom(['Bersih','Kotor','Mulus','Berbintik','Mancung','Bengkok','Cacat','Putus'])}
│◦ Ukuran : ${pickRandom(['Besar','Besar Dan Berotot','11/12 Sama Punya Kucing','Ber urat','Sebesar Titan', 'Sebutir pasir', 'Tipis kaya tisu', 'Kurus kaya ranting pohon'])}
│◦ Jembut : ${pickRandom(['Lebat','Ada sedikit','Gada jembut','Tipis','Muluss', 'Hutan mangrove', 'Hutan amazon'])}
│◦ Warna : ${pickRandom(['Black Doff','Black Glossy','Super Super Black','Pink Glossy','Pink Terang', 'Coklat', 'Sangat Amat hitam'])}
╰──────────────
`.trim()

conn.reply(m.chat, kon, m)
}
handler.help = ['cekkontol']
handler.tags = ['fun']
handler.command = /^cekkontol/i

export default handler 

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}