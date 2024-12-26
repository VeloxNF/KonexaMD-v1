/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/
import cheerio from 'cheerio'
import axios from 'axios'

let handler = async (m, {
    conn,
    text,
    args,
    command,
    usedPrefix
}) => {
    let input = `[!] *𝙴𝚛𝚘𝚛 𝙸𝚗𝚙𝚞𝚝*
	
Ex : ${usedPrefix + command} https://vt.tiktok.com/ZSY92QE8f/`

    if (!text) return m.reply(input)

    if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
    if (!text.includes('tiktok.com')) return m.reply(`Invalid Tiktok URL.`)
try {
    const {
        download,
        stats,
        uniqueId,
        username
    } = await slide(text);

    let hasil = Object.values(download).filter(v => v.type == "slide")

    m.reply(wait)
    let no = 1
    for (let i of hasil) {
        await conn.sendFile(m.sender, i.link, '', `username: \`${username}\`\n👀: \`${stats.views}\`\n♥️: \`${stats.likes}\`\n💬: \`${stats.comments}\`\n↪️:  \`${stats.shares}\`\n📥: \`${stats.downloads}\``, m)
        await conn.delay(1000)
    }
} catch (e) {
throw eror
}
}

handler.help = ['tiktokslide2 <url>']
handler.tags = ['downloader']
handler.command = /^(ttimg2|tiktokimg2|ttslide2|tiktokslide2)$/i

handler.register = false
handler.limit = true

export default handler

async function slide(url) {
    try {
      const response = await axios.post(
        'https://ttsave.app/download',
        {
          query: url, language_id: '2'
        },
        {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }
      )

      const html = response.data
      const $ = cheerio.load(html)

      const uniqueId = $('#unique-id').val()
      const username = $('h2.font-extrabold.text-xl.text-center').text()
      const thumbnail = $('a[target="_blank"]').attr('href')
      const profile = $('img.h-24.w-34.rounded-full').attr('src')
      const description = $('p.text-gray-600.px-2.text-center.break-all.w-3/4.oneliner').text()

      const stats = {
        views: $('svg.h-5.w-5.text-gray-500 + span').text(),
        likes: $('svg.h-5.w-5.text-red-500 + span').text(),
        comments: $('svg.h-5.w-5.text-green-500 + span').text(),
        shares: $('svg.h-5.w-5.text-yellow-500 + span').text(),
        downloads: $('svg.h-5.w-5.text-blue-500 + span').text()
      }

      const download = []
      $('a[onclick="bdl(this, event)"]').each((i, elem) => {
        const link = $(elem).attr('href')
        const type = $(elem).attr('type')
        const title = $(elem).text().trim()
        download.push({
          link, type, title
        })
      })

      return {
        uniqueId,
        username,
        thumbnail,
        profile,
        description,
        stats,
        download
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }