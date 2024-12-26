import { instagramStory } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.room = conn.room ? conn.room: {}
    if (!text) return m.reply(`Masukan Username Instagram!\n\nContoh :\n${usedPrefix + command} animeroles`)
    let id = 'igstory_' + m.sender
    if (!isNaN(text) && id in conn.room) {
        let { result } = conn.room[id]
        if (!(id in conn.room)) return m.reply('Kamu belum berada di sesi')
        if (text > result.length) return m.reply('Invalid Number')
        conn.sendFile(m.chat, result[text - 1].url, null, 'Ini Dia Kak', m)
    } else {
        let { results } = await instagramStory(text)
        for (let vid of results ) {
        await conn.sendFile(m.chat, vid.url, '', null, m)
        }
    }
}
handler.help = ['instagramstory'].map(v => v + ' <username>')
handler.tags = ['downloader']
handler.command = /^(igstory)$/i
handler.register = true
handler.limit = true
export default handler