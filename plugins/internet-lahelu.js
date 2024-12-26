/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    conn.lahelu = conn.lahelu ? conn.lahelu : {}
    conn.helu = conn.helu ? conn.helu : {}
    let id = m.sender
    if (!text) throw `gunakan seperti dibawah:\n*${usedPrefix+command} meme Spongebob*`
    try {
        const {
            data
        } = await axios.get('https://lahelu.com/api/post/get-search?query=' + text)
        const datas = data.postInfos
        let result = datas.map((item, index) => ({
            author: item.userUsername,
            judul: item.title,
            media: item.media
        }))


        conn.lahelu[id] = result.map(v => v.media)

        conn.helu[id] = [
            await conn.sendFile(m.chat, 'https://cache.lahelu.com/' + datas[0].media, '', '*Reply pesan ini dengan mengetik angka*:\n\n' + result.map((item, index) => `\n\n${index + 1}.*username*: ${item.author}\n    *judul:* ${item.judul}`).join("\n"), m)
        ]
    } catch (e) {
        throw eror
    }

}
handler.help = handler.command = ['lahelu']
handler.tags = ['internet']
handler.limit = true

export default handler