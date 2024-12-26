import axios from "axios";
import cheerio from "cheerio";
import FormData from "form-data";

let handler = async (m, {conn, text}) => {
if (!text) throw "[example] : .soundcloud https://on.soundcloud.com/gVG8z"

try {
await m.reply(wait)
let { title, link } = await soundcloud(text);
await conn.sendFile(m.chat, link, '', null, m, false)
} catch (e) {
throw e
}
}
handler.help = handler.command = ["soundcloud"]
handler.tags = ["downloader"]

export default handler

async function soundcloud(url) {

    const csrf = await axios.get("https://soundcloudtool.com/").then(data => {
    const $ = cheerio.load(data.data);
    const csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
    return csrfToken
    })
    
    const formData = new URLSearchParams();
    formData.append('csrfmiddlewaretoken', csrf);
    formData.append('soundcloud', url); 

    try {
        
        const response = await axios.post('https://soundcloudtool.com/soundcloud-downloader-tool', formData, {
            headers: {
                'Referer': 'https://soundcloudtool.com/', 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        
        const $ = cheerio.load(response.data); 
        const trackLink = $('#trackLink');
        const title = trackLink.attr('data-filename');
        const link = trackLink.attr('href');
        
        return { title, link};
    } catch (error) {
        throw error;
    }
}