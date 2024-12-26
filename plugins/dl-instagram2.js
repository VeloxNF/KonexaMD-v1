import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} https://www.instagram.com/reel/CsC2PQCNgM1/?igshid=NTc4MTIwNjQ2YQ==`
  if (!text) return m.reply(input)
  let no = 1
  try {
    const { status, media } = await igdl(text);
    if (status !== 200) throw eror
    await conn.sendMessage(m.chat, {react: {text: '🕐', key: m.key}})
    await media.map(v => conn.sendFile(m.sender, v , '', `乂 *I N S T A G R A M*\n\n*Result : ${usedPrefix + command}\n*Url*: ${text}`, m))
    await conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
    m.reply(`Perintah Sukses, silahkan buka chat pribadi bot`)
  } catch (e) {
    throw eror
    await conn.sendMessage(m.chat, {react: {text: '❎', key: m.key}})
  }
}

handler.help = ["instagram2"]
handler.tags = ['downloader']
handler.command = /^(ig2|instagram2|igdl2)$/i
handler.limit = true
handler.register = true

export default handler

async function igdl(url) {
  return new Promise(async (resolve, reject) => {
    const payload = new URLSearchParams(
      Object.entries({
        url: url,
        host: "instagram"
      })
    )
    await axios.request({
      method: "POST",
      baseURL: "https://saveinsta.io/core/ajax.php",
      data: payload,
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        cookie: "PHPSESSID=rmer1p00mtkqv64ai0pa429d4o",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    })
    .then(( response ) => {      
      const $ = cheerio.load(response.data)
      const mediaURL = $("div.row > div.col-md-12 > div.row.story-container.mt-4.pb-4.border-bottom").map((_, el) => {
        return "https://saveinsta.io/" + $(el).find("div.col-md-8.mx-auto > a").attr("href")
      }).get()
      const res = {
        status: 200,
        media: mediaURL
      }
      resolve(res)
    })
    .catch((e) => {
      console.log(e)
      throw {
        status: 400,
        message: "error",
      }
    })
  })
}