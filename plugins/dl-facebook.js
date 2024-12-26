/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from "axios"
import cheerio from "cheerio"

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} hd https://www.facebook.com/100010929794713/posts/1885825845125057/`

 let type = (args[0] || '').toLowerCase()

switch (type) {
case 'hd':
if (!args[1]) return m.reply(input)
facebook(args[1]).then(res => {
let cap = `*${res.description}*

乂 *F A C E B O O K
◃───────────▹
*quality*: ${res.urls[0].quality}
*url*: ${args[1]}
◃───────────▹
`
conn.sendMessage(m.chat, { video: {url: res.urls[0].url }, caption: cap }, {quoted: m})
}).catch(e => {
m.reply('Error : ' + e)
})
break 
case 'sd':
if (!args[1]) return m.reply(input)
facebook(args[1]).then(resu => {
let cap = `*${resu.description}*

乂 *F A C E B O O K
◃───────────▹
*quality*: ${resu.urls[1].quality}
*url*: ${args[1]}
◃───────────▹
`
conn.sendMessage(m.chat, { video: {url: resu.urls[1].url }, caption: cap }, {quoted: m})
}).catch(e => {
m.reply('Error : ' + e)
})
break
default:
return await conn.reply(m.chat, `Type Facebook :
    ⛒ sd
    ⛒ hd
    
contoh: /facebook sd *Url*`, m)
}
}
handler.help = ['sd','hd'].map(v => `faceebook ${v}`)
handler.tags = ['downloader']
handler.command = /^(facebook|fbdl|fb|facebookdl)$/i
handler.limit = true
handler.register = true

export default handler


async function facebook(url) {
   try {
      let { data } = await axios.post("https://getmyfb.com/process", {
         "id": url,
         locale: "en"
      }, {
         headers: {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Cookie": `PHPSESSID=k3eqo1f3rsq8fld57fgs9ck0q9; _token=1AHD0rRsiBSwwh7ypRad; __cflb=04dToeZfC9vebXjRcJCMjjSQh5PprejvCpooJf5xhb; _ga=GA1.2.193364307.1690654540; _gid=GA1.2.326360651.1690654544; _gat_UA-3524196-5=1; _ga_96G5RB4BBD=GS1.1.1690654539.1.0.1690654555.0.0.0`,
            "Origin": "https://getmyfb.com",
            "Referer": "https://getmyfb.com/",
            "Hx-Current-Url": "https://getmyfb.com",
            "Hx-Request": true,
            "Hx-Target": "target",
            "Hx-Trigger": "form",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188"
         }
      })

      let $ = cheerio.load(data)
      let urls = []

      $("ul > li").map((a, b) => {
         urls.push({ quality: $(b).text().trim(), url: $(b).find("a").attr("href") })
      })

      let result = {
         description: $("div.results-item > div.results-item-text").text().trim(),
         urls
      }

      if (urls.length == 0) return $("h4").text()

      return result
   } catch (e) {
      throw e
   }
}