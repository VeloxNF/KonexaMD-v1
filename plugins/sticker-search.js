import cheerio from 'cheerio'
import axios from 'axios' 

async function stickersearch(query){
return new Promise((resolve) => {
axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({ data }) => {
const $ = cheerio.load(data)
const link = [];
$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
link.push($(b).attr('href'))
})
let rand = link[Math.floor(Math.random() * link.length)]
axios.get(rand).then(({data}) => {
const $$ = cheerio.load(data)
const url = [];
$$('#stickerPack > div > div.row > div > img').each(function(a, b) {
url.push($$(b).attr('src').split('&d=')[0])
})
resolve({
creator: 'Tioo',
title: $$('#intro > div > div > h1').text(),
author: $$('#intro > div > div > h5 > a').text(),
author_link: $$('#intro > div > div > h5 > a').attr('href'),
sticker: url
})
})
})
})
}


let handler = async(m, { conn, text, args, command, usedPrefix}) => {

await stickersearch(text).then(async res => {

  let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} Spongebob`
	if (!text) return m.reply(input)
	
await m.reply(`Creator : ${res.creator}
*Title* : ${res.title}
*Author sticker* : ${res.author}
*From Link* : ${res.author_link}

_Sending_ ${res.sticker.length} sticker..
_To private chat_

${global.namebot}`)

for (let i of res.sticker) {
await conn.sendStickerFromUrl(m.sender, i, m, {packname: packname, author: global.author})
await conn.delay(2000)
}
})
}

handler.help = ['stickersearch']
handler.tags = ['sticker']
handler.command = /^(searchsticker|stickersearch|caristiker)$/i

handler.register = true 
handler.limit = true

export default handler