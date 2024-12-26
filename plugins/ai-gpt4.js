import axios from "axios";

const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text)
        throw `Apa yang pengen kamu tanyain?\n\nContoh: ${usedPrefix + command} halo bot`;

    try {
        await m.react('💬');
        let d = new Date(new Date() + 3600000);
        let locale = 'id';
        const jam = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
        let hari = d.toLocaleDateString(locale, { weekday: 'long' });
        let tgl = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        let logic = `Nama kamu adalah Akane, kamu dibuat dan dikembangkan oleh Alfixd. Pakailah bahasa gaul, seperti kata gue dan lu dalam menjawab semua pertanyaan. Kamu cerdas dalam menangani masalah apapun. Selalu gunakan emoji yang sesuai dalam setiap kalimat. Gunakan tanggal ${tgl}. Gunakan jam ${jam}. Gunakan hari ${hari}.`;

        let json = await openai(text, logic);

        await conn.sendMessage(m.chat, {
            text: json,
            contextInfo: {
                externalAdReply: {
                    title: 'GPT-4',
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgq45nsxxSRPEUMhX3Bgzctxv7VT-ieYmdw&usqp=CAU',
                    sourceUrl: 'https://chatgpt.com',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        await m.react('🔥');
    } catch (e) {
        await m.react('❎');
    }
};

const openai = async (text, logic) => {
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,
            "tokenLimit": 8000,
            "completionTokenLimit": 5000,
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text,
                "role": "user"
            }
        ],
        "prompt": logic,
        "temperature": 0.5
    }, {
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });

    return response.data;
};

handler.help = ["gpt4 <teks>", "gpt4"];
handler.tags = ["ai"];
handler.command = /^(openai4|gpt4)$/i;

export default handler;