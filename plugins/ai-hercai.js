/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

const Hercai = await (await import("../scraper/hercai.js")).default;
const client = new Hercai();

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    const input_data = ["chatv3", "gemini", "chatv3-32k", "chat-turbo", "chat-turbo16k", "chatbeta", "imagev3", "imagelexica","imageraava", "imageshonin", "imageanimefy"]

    let [urutan, tema] = text.split("|")
    

    await m.reply(wait)
    try {
        let data = input_data.map((item, index) => ({
            title: item.replace(/[_-]/g, ' ').replace(/\..*/, ''),
            id: item
        }));
        if (!urutan) return m.reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
if (!tema) return m.reply("Input query!\n*Example:*\n.hercai [nomor]|[query]")
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.hercai [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        
        let out = data[urutan - 1].id
        if (out == "chatv3") {
            const questionResult = await client.question({
                model: "v3",
                content: tema
            });
            await conn.sendMessage(m.chat, {
                text: questionResult.reply
            }, {
                quoted: m
            });
        } else if (out == "chatbeta") {
            const questionResult = await client.question({
                model: "beta",
                content: tema
            });
            await conn.sendMessage(m.chat, {
                text: questionResult.reply
            }, {
                quoted: m
            });
        } else if (out == "chatv3-32k") {
            const questionResult = await client.question({
                model: "v3-32k",
                content: tema
            });
            await conn.sendMessage(m.chat, {
                text: questionResult.reply
            }, {
                quoted: m
            });
        } else if (out == "chat-turbo") {
            const questionResult = await client.question({
                model: "turbo",
                content: tema
            });
            await conn.sendMessage(m.chat, {
                text: questionResult.reply
            }, {
                quoted: m
            });
        } else if (out == "chat-turbo16k") {
            const questionResult = await client.question({
                model: "turbo-16k",
                content: tema
            });
            await conn.sendMessage(m.chat, {
                text: questionResult.reply
            }, {
                quoted: m
            });
        } else if (out == "chat-gemini") {
            const questionResult = await client.question({
                model: "gemini",
                content: tema
            });
            await conn.sendMessage(m.chat, {
                text: questionResult.reply
            }, {
                quoted: m
            });
        } else if (out == "imageshonin") {
            const imageResult = await client.drawImage({
                model: "imageshonin",
                prompt: tema
            });
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: imageResult.url
                },
                caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else if (out == "imagev3") {
            const imageResult = await client.drawImage({
                model: "v3",
                prompt: tema
            });
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: imageResult.url
                },
                caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else if (out == "imagelexica") {
            const imageResult = await client.drawImage({
                model: "lexica",
                prompt: tema
            });
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: imageResult.url
                },
                caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else if (out == "imageraava") {
            const imageResult = await client.drawImage({
                model: "raava",
                prompt: tema
            });
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: imageResult.url
                },
                caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        
        } else if (out == "imageanimefy") {
            const imageResult = await client.drawImage({
                model: "animefy",
                prompt: tema
            });
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: imageResult.url
                },
                caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        }
    } catch (e) {
        await m.reply(e)
    }
}
handler.help = ["hercai *[nomor]|[query]*"]
handler.tags = ["ai"]
handler.command = /^(hercai)$/i
handler.register = true
handler.premium = true
export default handler