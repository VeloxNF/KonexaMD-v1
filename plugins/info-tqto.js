import fetch from 'node-fetch'

let handler = async function (m, { conn, text, usedPrefix }) {
  
let m2 = `
≡ _Saya sangat berterima kasih kepada kalian semua_

╭╾─⊷ _*THANKS TO*_
⋄ My self 
⋄ Zeltoria (Base)
⋄ Lolhuman (apikey)
⋄ Adiwijshing (baileys)
⋄ Creator Bot..
╰╾──•••
`

    conn.sendFile(m.chat, thumbnail, 'menu.jpg', m2, m)
}
handler.customPrefix = /^(tqto)$/i
handler.command = new RegExp

export default handler