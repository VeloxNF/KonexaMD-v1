import fetch from 'node-fetch';
import crypto from "crypto";

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let teks
    if (m.quoted) {
        teks = m.quoted.text
    } else if (text) {
        teks = text
    } else return m.reply(usedPrefix + command + ' buatkan kode javascript untuk memfilter teks')
    const userId = crypto.randomUUID();

    await m.react('🔮')
    let Id = m.sender.split('@')[0]
    if (command == 'aijavascript' || 'aijava') {
        try {

            let result = await chat(Id, teks, userId, 'javascript')
            await conn.sendFile(m.chat, 'https://telegra.ph/file/57cef7233d2b0393509e9.png', '', result, m)
            await m.react('✨')
        } catch (e) {
            throw eror
        }
    } else if (command == 'aihtml') {
        try {
            await m.react('🔮')
            let results = await chat(Id, teks, userId, 'html')
            await conn.sendFile(m.chat, 'https://telegra.ph/file/6ac1e2a8eafc6a8c209b7.jpg', '', results, m)
            await m.react('✨')
        } catch (e) {
            throw eror
        }
    }
}
handler.help = ['aijavascript', 'aihtml']
handler.tags = ['ai']
handler.register = handler.limit = true
handler.command = /^(aijava(script)?|aihtml)$/i
export default handler
async function chat(Id, teks, userId, code) {
    try {
        let id = Id
        let json = {
            "messages": [{
                "id": id,
                "content": teks,
                "role": "user"
            }],
            "id": id,
            "previewToken": null,
            "userId": userId,
            "codeModelMode": true,
            "agentMode": {
                "mode": true,
                "id": "expert-" + code
            },
            "trendingAgentMode": {},
            "isMicMode": false,
            "isChromeExt": false,
            "githubToken": null
        }

        let {
            data
        } = await axios.post('https://www.blackbox.ai/api/chat', json)
        return data
    } catch (e) {
        return e
    }
}