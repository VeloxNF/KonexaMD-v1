import fetch from "node-fetch";

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    conn.ohmygpt = conn.ohmygpt || {};
    conn.histo = conn.histo ? conn.histo : {};

    const mery = 'Kamu adalah seorang gadis muda yang jenius'
    conn.ohmygpt = {
        name: 'Merry',
        profile: mery
    };
    if (!(m.sender in conn.histo)) conn.histo[m.sender] = []
    
    const text = args.length >= 1 ? args.join(" ") : m.quoted && m.quoted.text || "";
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);

    try {
        await m.reply(wait);
         let tx = text;
        conn.histo[m.sender].push({
            role: 'system',
            content: mery
        }, {
            role: 'user',
            content: tx
        })

        let msg = [
            ...conn.histo[m.sender],
            {
                role: 'system',
                content: mery
            },
            {
                role: 'user',
                content: tx
            }
        ]
        const output = await chatAI(msg);

        if (output) {

            await m.reply(`*${conn.ohmygpt.name}*\n\n${output}`);
         if (conn.histo[m.sender].length == 6) conn.histo[m.sender] = []
                    
        } else {
            await m.reply("Tidak ada output yang dihasilkan.");
        }
    } catch (error) {
        throw error
    }

};

handler.help = ["meri"];
handler.tags = ["ai"];
handler.command = /^(meri)$/i;

export default handler;

async function chatAI(chat, model) {
    const headers = {
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        "Content-Type": "application/json",
        "Authorization": "sk-0A810pRkyDOOtZ76DR1voGsMFAfMcJQTxZ5BYRAJHwPLzZnc"
    };

    const raw = JSON.stringify({
        model: model || "gpt-3.5-turbo",
        messages: chat,
        stream: false
    });

    const options = {
        method: 'POST',
        headers,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://api.ohmygpt.com/v1/chat/completions", options);
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
    }
}