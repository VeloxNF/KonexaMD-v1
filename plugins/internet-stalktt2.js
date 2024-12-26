/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'

let handler = async (m, {usedPrefix, command, conn, text }) => {

if (!text) throw `*[❗] input query*\n*contoh: ${usedPrefix + command} notnot8*`

const {status, result} = await stalk(text)
if (status == true) {
let teks = `乂  *STALKER TIKTOK*

◦  Id: ${result.id}
◦  Username: ${result.uniqueId}
◦  Nickname : ${result.nickname}
◦  Followers : ${result.followers}
◦  Following : ${result.following}
◦  Likes : ${result.hearts}
◦  Videos : ${result.videos}
◦  Bio : ${result.signature}
◦  BioLink : ${result.bioLink}
◦  Videos : ${result.videos}
◦  Created: ${result.createdAt}
`

await conn.sendThumb(m.chat, teks, result.avatar, m)
} else {
m.reply(eror)
}
}
handler.help = ['stalktiktok2 <username>']
handler.tags = ['stalker']
handler.command = /^(ttstalk2|stalktt2|tiktokstalk2|stalktiktok2)$/i
handler.limit = true
handler.register = true

export default handler

function stalk(username) {
  return new Promise((resolve, reject) => {
    if (!username) return reject(new Error("username is required"));
    axios.get("https://tiktod.eu.org" + "/stalk", { params: { username } })
      .then((stalker) => resolve(stalker.data))
      .catch(reject);
  });
}