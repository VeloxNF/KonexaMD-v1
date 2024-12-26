import axios from 'axios';

export async function before(m) {
    if (m.isGroup) return 
    const chat = global.db.data.chats[m.chat];
    if (m.isBaileys || !m.text) return false;
    let text = m.text;
    let prompt = "kamu adalah asisten"
    try {
        if (chat.autoAi) {
            let { data } = await axios.get(`https://api.tioxy.my.id/api/deepenglish?prompt=${encodeURIComponent(prompt)}&text=${encodeURIComponent(text)}`)
            await m.reply(data.data)
        }
    } catch (e) {
        throw e
    }
}

export const disabled = false;