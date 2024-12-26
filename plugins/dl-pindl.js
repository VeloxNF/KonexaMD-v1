import axios from "axios";
import FormData from "form-data";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw "contoh: .pindl https://id.pinterest.com/pin/575757133623547811/"

    try {
        m.reply(wait)
        const {
            medias,
            title, 
            duration
        } = await pindl(text);
        let mp4 = medias.filter(v => v.extension == "mp4");
        if (mp4.length !== 0) {
        await conn.sendMessage(m.chat, {video: {url: mp4[0].url}, caption: `\`${title}\`\nQuality: ${mp4[0].quality}\nSize: ${await global.func.toSize(mp4[0].size)}`}, {quoted: m})
        } else {
        await conn.sendFile(m.chat, medias[1].url, '', `\`${title}\``, m)
    }
    
    } catch (e) {
        throw e
    }
}
handler.help = ["pindownload"]
handler.command = /^(pind(own)?l(oad)?)$/i
handler.tags = ["downloader"]

export default handler

async function pindl(url) {
try {
const urls = 'https://pinterestdownloader.io/frontendService/DownloaderService';
const params = {
  url
};

let { data } = await axios.get(urls, { params })
return data
} catch (e) {
return {msg: e}
}
}