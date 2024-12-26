import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {conn}) => {
let { thumbnail, berita, title, keyword, desc, sumber } = await kabar_terkini();
await conn.reply(m.chat, `*${title}*\n\n*${desc}*\n# *${keyword}*\n\n${berita}`, m, {contextInfo: {
externalAdReply: {
title: title,
body: sumber,
showAdAttribution: true,
mediaType: 1,
sourceUrl: sumber,
thumbnailUrl: thumbnail,
renderLargerThumbnail: true
}}})
}
handler.help = handler.command = ['berita']
handler.tags = ['main']
export default handler

async function kabar_terkini() {
try {

let {
    data
} = await axios.get('https://m.tribunnews.com/news')
let $ = cheerio.load(data)
let url = $('h2 > a').attr('href')

let {
    data: datas
} = await axios.get(url)
let $$ = cheerio.load(datas)
const script = $$('script[type="application/ld+json"]');
const json = JSON.parse(script.text());
let thumbnail = json.image.url;
let title = $$('h1').text()
let keys = $$('meta[name=description]').attr('content');
let desc = $$('meta[name=news_keywords]').attr('content');
let berita = $$('script').text().split('var keywordBrandSafety = "')[1].split('";')[0]
let result = {
    status: 200,
    thumbnail: thumbnail,
    sumber: url,
    title: title,
    desc: desc,
    keyword: keys,
    berita: berita
}
return result
} catch (e) {
let er = {
   status: 404,
   message: e
}
return er
}
}