/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i

async function isUrl(url) {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
let handler = async (m, {conn, text, args, usedPrefix, command }) => {
  let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} sadxzyq`
	if (!text) return m.reply(input)
    m.reply(wait)
    if (!isUrl(args[0]) && !args[0].includes('github.com')) return m.reply(`Link invalid!!`)
	let [, user, repo] = args[0].match(regex) || []
	repo = repo.replace(/.git$/, '')
				let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let name = `${encodeURIComponent(repo)}.zip`
    conn.sendFile(m.chat, url, name, null, m)
}
handler.help = ['gitclone <link>']
handler.tags = ['downloader']
handler.command = /gitclone/i

handler.limit = true
handler.register = true

export default handler