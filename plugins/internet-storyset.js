/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from "axios"
import cheerio from "cheerio"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "input text"
    try {
        await m.react('🔁')
        let res = await fetchThumbnailUrls('https://storyset.com/search?q=' + encodeURIComponent(text));
        let rdm = res[Math.floor(Math.random() * res.length)];
        await conn.sendMessage(m.chat, {
            image: {
                url: rdm
            },
            caption: "[ RESULT ]\n" + text
        }, {
            quoted: m
        }).then(async () => {
        await m.react('✅')
        })

    } catch (e) {
        throw eror
    }
}
handler.help = ["storyset"]
handler.tags = ["internet"]
handler.command = /^(storyset)$/i

export default handler

/* New Line */
async function fetchThumbnailUrls(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const thumbnailUrls = $('script[type="application/ld+json"]').toArray()
            .map(element => {
                try {
                    const jsonData = JSON.parse($(element).html());
                    if (jsonData['@type'] === 'ImageObject' && jsonData.thumbnailUrl) {
                        return jsonData.thumbnailUrl;
                    }
                } catch (error) {
                    // Kesalahan parsing JSON, lewati
                }
            }).filter(url => url);

        return thumbnailUrls;
    } catch (error) {
        console.error('Gagal mengambil halaman web:', error);
        return [];
    }
}