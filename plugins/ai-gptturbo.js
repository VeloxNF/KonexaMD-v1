import axios from 'axios'

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    if (!text) return m.reply('> ✨Hallo ada yang bisa saya bantu?')
    try {
        const {
            key
        } = await conn.sendMessage(m.chat, {
            image: {
                url: 'https://telegra.ph/file/f4863e1811d18f6f7c011.jpg'
            },
            caption: wait
        }, {
            quoted: fVerif,
            mentions: [m.sender]
        })
        const result = await gemini(text);

        await conn.delay(500)
        await conn.sendMessage(m.chat, {
            image: {
                url: 'https://telegra.ph/file/f4863e1811d18f6f7c011.jpg'
            },
            caption: '\n> ✨'+result.reply,
            edit: key
        }, {
            quoted: fVerif,
            mentions: [m.sender]
        })
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["gpt-turbo"]
handler.tags = ["ai"]
handler.command = /^(gpt-turbo)$/i
handler.register = true
handler.premium = true

export default handler

async function gemini(txt) {
    try {
        var api = await axios.get(`https://hercai.onrender.com/turbo/hercai?question=${encodeURIComponent(txt)}`, {
            headers: {
                "content-type": "application/json",
            },
        })
        return api.data;
    } catch (e) {
    console.log(e)
}
}