import axios from 'axios'

let handler = async (m, {
    conn,
    usedPrefix,
    args,
    command,
    text
}) => {
    let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} https://vm.tiktok.com/ZSL7p9jRV/`
    if (!text) return m.reply(input)
    try {
    await m.reply(wait)
    let {
        data
    } = await axios.get(APIs.nightTeam + '/api/tiktokv2?url=' + text)

   await conn.sendMessage(m.chat, {
        audio: {
            url: data.result.medias[3].url
        },
        mimetype: 'audio/mpeg',
        fileName: `${data.result.title}.mp3`,
        ptt: false,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'Tiktok mp3',
                body: text,
                mediaType: 1,
                thumbnail: await (await conn.getFile(data.result.thumbnail)).data,
                sourceUrl: text
            }
        }
    }, {
        quoted: m
    })
} catch (e) {
throw eror
}
}

handler.help = ['tiktokmp3']
handler.tags = ['downloader']
handler.command = /^(tiktokmp3|ttmp3)$/i
handler.limit = true
handler.register = true

export default handler