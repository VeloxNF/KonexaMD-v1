import axios from "axios";

let handler = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    if (m.quoted) {
        text = m.quoted.text
    } else if (text) {
        text = text
    } else if (!text) return m.reply('Masukan prompt!')
    try {
        m.react('📌')
        let result = await photoleap(text), i = 0
        for (let res of result) {
            await conn.sendFile(m.chat, res || emror, '', 'Gambar ke - ' + i++ + '\n' + command.toUpperCase() + ' ' + text, m)
            await conn.delay(500)
        }
        m.react('✨')
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['photoleap']
handler.tags = ['main']
export default handler

async function photoleap(prompt) {
    try {
        let result = []
        for (let i = 0; i < 4; i++) {
            let {
                data
            } = await axios.get('https://tti.photoleapapp.com/api/v1/generate?prompt=' + prompt);
            result.push(data.result_url)
        }
        return result
    } catch (e) {
        return ({
            msg: 404
        })
    }
}