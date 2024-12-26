import axios from 'axios'

let handler = async (m, {args, text, conn, usedPrefix }) => {
try {

if (!text) return m.reply("kode nya mana")
conn.sendMessage(m.chat, { react: { text: "⏱️", key: m.key }})
let yanz = await fetchJson("https://api.yanzbotz.my.id/api/ai/codetranslator?code=" + text + "&fromlang=javascript&tolang=Javascript")
conn.reply(m.chat, yanz.result[0], m)
} catch (e) {
m.reply("Eror!!")
}
}

handler.help = ['java']
handler.tags = ['tools']
handler.command = ['java', 'node']
handler.limit = true

export default handler

async function fetchJson(url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}