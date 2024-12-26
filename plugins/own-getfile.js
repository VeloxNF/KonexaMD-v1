import fs from 'fs'

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} index.js`
	if (!text) return m.reply(input)
				var folder = text.split('|')[0]
				var file = text.split('|')[1]
				if (!folder) return m.reply(`nama foldernya apa banh?`)
				if (!file) return m.reply(`nama filenya apa banh?`)
				var user_bot = await fs.readFileSync(`./${folder}/${file}`)
				conn.sendMessage(m.chat, {
					document: user_bot,
					mimetype: 'document/application',
					fileName: `${file}`
				}, {
					quoted: m
					})
}
handler.help = ['getfile']
handler.tags = ['owner']
handler.command = /^(getfile)$/i
handler.rowner = true

export default handler