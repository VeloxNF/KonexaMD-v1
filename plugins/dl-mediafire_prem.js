/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
import util from 'util'
import axios from 'axios'
import cheerio from 'cheerio'

async function mediafire(url){
return new Promise(async(resolve, reject) => {
try {
const { data, status } = await axios.get(url)
const $ = cheerio.load(data);
let filename = $('.dl-info > div > div.filename').text();
let filetype = $('.dl-info > div > div.filetype').text();
let filesize = $('a#downloadButton').text().split("(")[1].split(")")[0];
let uploadAt = $('ul.details > li:nth-child(2)').text().split(": ")[1];
let link = $('#downloadButton').attr('href');
let desc = $('div.description > p.description-subheading').text();
if (typeof link === undefined) return resolve({ status: false, msg: 'No result found' })
let result = {
status: true,
filename: filename,
filetype: filetype,
filesize: filesize,
uploadAt: uploadAt,
link: link,
desc: desc
}
console.log(result)
resolve(result)
} catch (err) {
console.error(err)
resolve({ status: false, msg: 'No result found' })
}
})
}

let handler = async (m, { usedPrefix, command, conn, text }) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} https://www.mediafire.com/file/pwxob70rpgma9lz/GBWhatsApp_v8.75%2528Tutorial_Yud%2529.apk/file*`
	if (!text) return m.reply(input)
	m.reply(wait)
	const baby1 = await mediafire(text)
	if (baby1.filesize.split('MB')[0] >= 200) return m.reply('*File Over Limit* ' + util.format(baby1))
				await conn.delay(500)
				const result = `*MEDIAFIRE DOWNLOADER*

📄 *Name* : ${baby1.filename}
⚖️ *Size* : ${baby1.filesize}
📨 zType* : ${baby1.filetype}
🔗 *Link* : ${baby1.link}
📋 *UploadAt*: ${baby1.uploadAt}
`
	conn.sendFile(m.chat, baby1.link, `${baby1.filename}`, '', m, null, { mimetype: `${baby1.filetype}`, asDocument: true })
}
handler.help = ['mediafireprem <link>']
handler.tags = ['downloader']
handler.command = /^(mediafireprem|mfprem)$/i
handler.register = true

handler.premium = true

export default handler