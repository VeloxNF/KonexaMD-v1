import axios from "axios"
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
    } else return m.reply('Hai kak ada bisa yang saya bantu?')

    try {
        await m.react('🔮')
        /**
        Buat realtime waktu.
        **/
        let d = new Date(new Date + 3600000)

        let locale = 'id'
        const jam = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        });
        let hari = d.toLocaleDateString(locale, {
            weekday: 'long'
        })
        let tgl = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        const prompt = `Kamu adalah seorang asisten ai yang cerdas. kamu diciptakan oleh tio. gunakan bahasa sopan dan gunakan emoji tiap kata. Gunakan jam ${jam}. gunakan hari ${hari}. gunakan tanggal ${tgl}.`

        const result = await chatAI(teks, prompt)
        await m.reply(result)
        await m.react('✨')
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['lbbai']
handler.tags = ['ai']
handler.limit = handler.register = true
export default handler

const API_URL = 'https://openai.lbbai.cc/v1/chat/completions';
async function chatAI(query, profile) {
    const payload = {
        messages: [{
                role: "system",
                content: profile
            },
            {
                role: "user",
                content: query
            },
        ],
        model: "gpt-3.5-turbo",
        presence_penalty: 0,
        stream: true,
        temperature: 0.7,
    };

    try {
        const response = await axios.post(API_URL, payload);
        const inputString = response.data;

        return inputString
            .split('\n\n')
            .filter(data => data.includes('data: {"id":"chatcmpl'))
            .map(data => {
                try {
                    return JSON.parse(data.match(/{.*}/)?.[0]);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    return null;
                }
            })
            .filter(Boolean)
            .map(data => data.choices[0].delta.content)
            .join('');
    } catch (error) {
        console.error('Error during chatAI request:', error);
        throw error;
    }
}