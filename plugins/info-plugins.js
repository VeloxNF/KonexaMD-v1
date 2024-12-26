let handler = async (m, { args, usedPrefix, text, command }) => {
let ar = Object.keys(plugins)
let ar1 = ar.map(v => v.replace('.js', ''))
let spas = "                "
	if (!text) return conn.reply(m.chat, "*[ CHECK PLUGINS ]*\nPILIH PLUGINS YG INGIN DI CEK", m)

try {
    let { total, success, last, lastSuccess } = global.db.data.stats[text + '.js']
    let txt = `*[ PLUGINS CHECKED ]*
📑 *Plugins:* ${args[0]}
*💬 Total :* ${total}
*✔️ Succes :* ${success}
${readMore}
*🕔 Last time used:* ${new Date(last)}
*🕔 Last time it worked:* ${new Date(lastSuccess)}`
conn.sendMessage(m.chat, {
text: txt,
contextInfo: {
externalAdReply: {
title: `[ P L U G I N S - C H E C K ]`,
thumbnailUrl: "https://telegra.ph/file/f794cf3fd1b4ef80cc6be.jpg",
mediaType: 1,
renderLargerThumbnail: true
}}})
} catch (e) {
        m.reply('plugins tidak ditemukan / error tidak di ketahui')
}
}

handler.help = ['pluginsc', 'pluginsearch']
handler.tags = ['owner']
handler.command = /^pluginsc|pluginsearch$/i
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)