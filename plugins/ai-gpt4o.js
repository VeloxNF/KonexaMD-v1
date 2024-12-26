import { createHash } from 'crypto';
import axios from 'axios'; // Ensure axios is imported
import { Uploader } from "akiraa-wb";

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let text;

    // Handle different types of quoted messages
    if (m.quoted && m.quoted.mimetype && /audio/.test(m.quoted.mimetype)) {
        let url = await Uploader.Uguu(await m.quoted.download());
        let { data } = await axios.post("https://onesytex-rest-api-ca434649bcac.herokuapp.com/api/audio_whisper", {
            audioUrl: url,
        });
        text = data.result.output.text || ""; // Ensure we have a string
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else if (args.length >= 1) {
        text = args.join(" ");
    } else {
        return m.reply(`*Example:* ${usedPrefix + command} halo`);
    }

    let nama = m.name;
    let sn = `${nama}-` + createHash('md5').update(m.sender).digest('hex');
    let d = new Date(new Date() + 3600000);
    let locale = 'id';
    let jam = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    let hari = d.toLocaleDateString(locale, { weekday: 'long' });
    let tgl = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let lg = `Kamu adalah AI. Nama lawan bicaramu adalah ${nama}. Waktu saat ini adalah tanggal ${tgl}, hari ${hari}, dan jam ${jam}`;

    const quoted = m && (m.quoted || m);
    let image;

    try {
        // React to the message to indicate loading
        await m.react('⏳'); // Use a loading emoji or any emoji you prefer

        if (m.quoted && m.quoted.text) {
            let hasil = await AI(text, sn, lg, true);
            if (hasil && hasil.messages) {
                await conn.sendMessage(m.chat, {
                    text: "*[ 💬 ] OPENAI CHATGPT*\n\n" + hasil.messages,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            title: "AI Response",
                            body: "This is your AI-generated response.",
                            thumbnail: await axios.get('https://files.catbox.moe/som05y.jpg', { responseType: 'arraybuffer' })
                                .then(res => Buffer.from(res.data)),
                        },
                    },
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    text: "*[ 💬 ] Error: No response from AI.*",
                    contextInfo: {
                        mentionedJid: [m.sender],
                    },
                }, { quoted: m });
            }
        } else if (quoted && /image/.test(quoted.mimetype || quoted.msg.mimetype)) {
            image = await quoted.download();
            let hasil = await AI(text, null, lg, true, image);
            if (hasil && hasil.messages) {
                await conn.sendMessage(m.chat, {
                    text: "*[ 💬 ] OPENAI CHATGPT*\n\n" + hasil.messages,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            title: "AI Response",
                            body: "This is your AI-generated response.",
                            thumbnail: await axios.get('https://files.catbox.moe/som05y.jpg', { responseType: 'arraybuffer' })
                                .then(res => Buffer.from(res.data)),
                        },
                    },
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    text: "*[ 💬 ] Error: No response from AI.*",
                    contextInfo: {
                        mentionedJid: [m.sender],
                    },
                }, { quoted: m });
            }
        } else {
            let hasil = await AI(text, sn, lg, true);
            if (hasil && hasil.messages) {
                await conn.sendMessage(m.chat, {
                    text: "*[ 💬 ] OPENAI CHATGPT*\n\n" + hasil.messages,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            title: "AI Response",
                            body: "This is your AI-generated response.",
                            thumbnail: await axios.get('https://files.catbox.moe/som05y.jpg', { responseType: 'arraybuffer' })
                                .then(res => Buffer.from(res.data)),
                        },
                    },
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    text: "*[ 💬 ] Error: No response from AI.*",
                    contextInfo: {
                        mentionedJid: [m.sender],
                    },
                }, { quoted: m });
            }
        }
    } catch (error) {
        console.error('Error in handler:', error);
        await conn.sendMessage(m.chat, {
            text: "*[ 💬 ] An error occurred while processing your request.*",
            contextInfo: {
                mentionedJid: [m.sender],
            },
        });
    }
};

handler.help = handler.command = ['gpt4o'];
handler.tags = ['gpt4o'];
handler.limit = true;
handler.register = true;

export default handler;

async function AI(q, username = null, logic = "Kamu adalah Sutrisno-MD. Kamu dibuat oleh 3 owner yaitu Fanzz, FlameDann, dan Nabil.", webSearchMode = false, img) {
    try {
        const payload = { content: q };
        if (username) payload.user = username;
        if (logic) payload.prompt = logic;
        payload.webSearchMode = webSearchMode;
        if (img) payload.imageBuffer = img;

        const response = await axios.post("https://luminai.my.id", payload);
        console.log('Response from AI:', response.data); // Log the response for debugging

        const message = response.data.result;
        if (!message) {
            throw new Error('No message returned from AI');
        }

        return { status: true, messages: message };
    } catch (error) {
        console.error('Error fetching:', error);
        throw error; // Rethrow to be caught in handler
    }
}

function msToTime(duration) {
    const milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
        monthly = Math.floor((duration / (1000 * 60 * 60 * 24)) % 720);

    return `${monthly.toString().padStart(2, '0')} Hari ${hours.toString().padStart(2, '0')} Jam ${minutes.toString().padStart(2, '0')} Menit`;
}