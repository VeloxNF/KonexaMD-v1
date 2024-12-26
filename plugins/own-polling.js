let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
	text = text.split(`\n`)
	if (!text || text.length == 1) throw `Contoh :\n*${usedPrefix + command} deskripsi\npoll1\npoll2\ndst...*\n\nContoh :\n*${usedPrefix + command} romdom admin\niya\ntidak*`
	if (text.length > 1 && text.length < 3) throw `[!] Minimum inputs *2* selection!`
	if (text.length > 200) throw `Kebanyakan, Maksimal *200* !`
	let array = []
	text.slice(1).forEach(function(i) { array.push(i) })
	await conn.sendPoll(m.chat, text[0], array)
}

handler.help = ['poll']
handler.tags = ['group']
handler.command = /^((create)?poll(ing)?)$/i

handler.group = true

export default handler