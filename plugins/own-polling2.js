let handler = async (m, { conn, args, text, usedPrefix, command, participants }) => {
	let teks = text.split(`\n`)
	
	if (!text || text.length == 1) throw `Format :\n*${usedPrefix + command} deskripsi*\n*pilih1*\n*pilih2*\n*dst...*\n\nContoh :\n*${usedPrefix + command} Vote Game*\n*Gates Of Olympus*\n*Starlight Princess*`
	if (text.length > 1 && text.length < 3) throw `[!] Minimal input *2* pilihan!`
	if (text.length > 25) throw `[!] Pilihan terlalu banyak, maksimal *12* !`
	
				let options = []
		    teks.slice(1).forEach(function(i) { options.push(i) })

				await conn.sendMessage(m.chat, {
					poll: {
						name: teks[0],
						values: options
					}
				})
}

handler.help = ['poll2 <desc>\nopts1\nopts2\netc...']
handler.tags = ['group']
handler.command = /^((create)?poll(2|ing2)?)$/i
handler.group = true
export default handler