/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, text, command, usedPrefix, isOwner }) => {
  let image = 'https://telegra.ph/file/25dec652d3cb057a23dd0.jpg'
  let caption = ''
  let changelogs = global.db.data.changelog || []
  
  switch (command) {
    case 'changelog':
    case 'log':
      if (!changelogs.length) return conn.reply(m.chat, 'There are no changelogs yet', m)
      caption = changelogs.map(changelog => {
        let [date, ...items] = changelog.split(' - ')
        return `• \`\`\`${date}\`\`\`\n${items.map(item => `  ◦ ${item}`).join('\n')}`
      }).join('\n\n')
      conn.sendMessage(m.chat, {text: caption, contextInfo:
					{
						"externalAdReply": {
							"title": namebot,
							"body": command,
							"showAdAttribution": true,
							"mediaType": 1,
							"sourceUrl": sgc,
							"thumbnailUrl": image,
							"renderLargerThumbnail": true

						}
					}}, {
					quoted: m
					})
      break
      
    case 'addchangelog':
      if (!isOwner) return conn.reply(m.chat, 'Maaf, hanya Owner yang dapat menggunakan command ini', m)
      if (!text) return conn.reply(m.chat, `Usage: ${usedPrefix}addchangelog <text>`, m)
      changelogs.unshift(`${new Date().toDateString()} - ${text}`)
      global.db.data.changelog = changelogs
      conn.reply(m.chat, 'Changelog telah berhasil ditambahkan', m)
      break
      
    case 'rchangelog':
      if (!isOwner) return conn.reply(m.chat, 'Maaf, hanya Owner yang dapat menggunakan command ini', m)
      if (!text) return conn.reply(m.chat, `Usage: ${usedPrefix}rchangelog <text>`, m)
      let index = changelogs.findIndex(changelog => changelog.includes(text))
      if (index === -1) return conn.reply(m.chat, 'Changelog not found', m)
      changelogs.splice(index, 1)
      global.db.data.changelog = changelogs
      conn.reply(m.chat, 'Changelog telah berhasil dihapus', m)
      break
  }
}

handler.help = ['changelog', 'log', 'addchangelog <text>', 'rchangelog <text>']
handler.tags = ['info']
handler.premium = false

handler.command = /^(changelog|log|addchangelog|rchangelog)$/i
handler.owner = false

export default handler