import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {conn}) => {
try {
await m.reply(wait)
let result = await cinema();
let txt = `*Film terbaru*\n\n`
let no = 1
for (let film of result) {
txt += `${no++}. *Title: ${film.title}\n`
txt += `> *Link:* ${film.link}\n\n`
}
await conn.sendMessage(m.chat, {text: txt, contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: result[0].title,
body: result[0].link,
sourceUrl: result[0].link,
thumbnailUrl: result[0].poster,
renderLargerThumbnail: true,
}}}, {quoted: m})
} catch (e) {
throw eror
}
}
handler.help = handler.command = ['cinema']
handler.tags = ['internet']
export default handler

async function cinema() {
    try {
        const response = await axios.get('https://21cineplex.com/')
        const html = response.data;
        const $ = cheerio.load(html)

        const results = []

        $('.col-3 .movie').each((index, element) => {
            const movieTitle = $(element).find('.movie-desc h4').text().trim();
            const movieLabel = $(element).find('.movie-desc span.movie-label img').attr('src')
            const moviePoster = $(element).find('.movie-poster img').attr('src')
            const movieLink = $(element).find('a').attr('href')

            const data = {
                title: movieTitle,
                label: movieLabel,
                poster: moviePoster,
                link: movieLink
            };

            results.push(data)
        })

        return results 
    } catch (error) {
        console.error(error)
    }
}