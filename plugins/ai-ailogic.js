import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) return m.reply('Ada yang bisa ku bantu?');
    try {
        const logic = 'ISI LOGIC KARAKTER YANG MAU KAMU BIKIN'; // Ganti dengan logika yang diinginkan
        await conn.sendMessage(m.chat, { react: { text: "💬", key: m.key } });
        
        const aii = await fetch(`https://widipe.com/ai/c-ai?prompt=${logic}&text=${text}`)
            .then(res => res.json());
        
        await conn.sendMessage(m.chat, {
            text: aii.result,
            contextInfo: {
                mentions: [m.sender],
                externalAdReply: {
                    showAdAttribution: true,
                    title: `L O G I C  -  A I`, // Ganti sesuai kebutuhan
                    body: '',
                    thumbnailUrl: "https://e.top4top.io/p_3197kprnb1.jpg", // Ganti sesuai kebutuhan
                    sourceUrl: "https://github.com/tanakasenn",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
    } catch (err) {
        console.error(err);
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        m.reply("elol kak nanti juga bener");
    }
};

handler.command = handler.help = ['ai-logic'];
handler.tags = ['ai'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
handler.register = true;

export default handler;