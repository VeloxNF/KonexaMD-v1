/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
let handler = async (m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) => {
  let response = args.join(' ').split('|')
  if (!args[0]) throw `Contoh pemakaian: ${usedPrefix}${command} komennya|usernamenya`
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  let res = `https://api.lolhuman.xyz/api/phcomment?apikey=Akiraa&img=https://telegra.ph/file/570cd42fdac7aa5fa5c1e.jpg&text=${response[0]}&username=${response[1]}`
  conn.sendFile(m.chat, res, 'phcomments.jpg', `*Selesai*`, m, false)
}
handler.help = ['phcomment']
handler.tags = ['maker']
handler.command = /^(phcomment)$/i
handler.limit = 3

export default handler