/**
@credit Tio 
@facebook downloader 
**/

import axios from "axios";
import cheerio from "cheerio";
import qs from "qs";

let handler = async (m, { conn, command, args, text, usedPrefix }) => {

let type = (args[0] || '').toLowerCase()
let { duration, result } = await Facebook(args[1])

switch (type) {
case 'hd':
if (!args[1]) return m.reply(input)

try {
await m.reply(wait)
let cap = `
乂 *F A C E B O O K
◃───────────▹
*quality*: ${result[0].quality}
*duration*: ${duration}
*url*: ${args[1]}
◃───────────▹
`
await conn.sendMessage(m.chat, { video: {url: result[0].url }, caption: cap }, {quoted: m})
} catch (e) {
throw eror
}
break 
case 'sd':
if (!args[1]) return m.reply(input)
try {
await m.reply(wait)

let cap = `乂 *F A C E B O O K

◃───────────▹
*quality*: ${result[1].quality}
*duration*: ${duration}
*url*: ${args[1]}
◃───────────▹
`
await conn.sendMessage(m.chat, { video: {url: result[1].url }, caption: cap }, {quoted: m})

} catch (e) {
throw eror
}
break
default:
return await conn.reply(m.chat, `Type Facebook :
 ⛒ sd
 ⛒ hd
    
contoh: /facebook4 sd https://www.facebook.com/100010929794713/posts/1885825845125057/`, m)
}
}
handler.help = ['sd','hd'].map(v => `faceebook4 ${v}`)
handler.tags = ['downloader']
handler.command = /^(facebook4|fb4)$/i
handler.limit = true
handler.register = true

export default handler

async function Facebook(url) {
  const data = {
    k_exp: '',
    k_token: '',
    q: url,
    lang: 'id',
    web: 'fdownloader.net',
    v: 'v2',
    w: ''
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    }
  };

  let { data: res } = await axios.post('https://v3.fdownloader.net/api/ajaxSearch?lang=id', qs.stringify(data), config);

  let $ = cheerio.load(res.data);
  let result = [];
  let duration = $("div.clearfix > p").text().trim();

  $("div.tab__content").find("tbody > tr").each((index, element) => {
    const quality = $(element).find("td.video-quality").text();
    const videoUrl = $(element).find("td > a").attr("href");
    if (quality && videoUrl) {
      result.push({
        quality: quality,
        url: videoUrl
      });
    }
  });

  return {
    creator: "Tio",
    duration: duration,
    result: result
  };
}