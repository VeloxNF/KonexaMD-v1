import axios from 'axios'
import cheerio from 'cheerio'
import qs from 'qs'

async function twitter(link) {
	return new Promise((resolve, reject) => {
		let config = {
			'url': link
		}
		axios.post('https://www.expertsphp.com/instagram-reels-downloader.php',qs.stringify(config),{
			headers: {
				"content-type": 'application/x-www-form-urlencoded',
				'cookie':'_gid=GA1.2.1209552833.1682995186; _gat_gtag_UA_120752274_1=1; __gads=ID=e2d27851a97b70ac-222d68fe87e000b0:T=1682995185:RT=1682995185:S=ALNI_MYaXoBa8KWleDZ97JpSaXGyI7nu3g; __gpi=UID=00000be71a67625d:T=1682995185:RT=1682995185:S=ALNI_MYyedH9xuRqL2hx4rg7YyeBDzK36w; _ga_D1XX1R246W=GS1.1.1682995185.1.1.1682995205.0.0.0; _ga=GA1.1.363250370.1682995185',
				'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
			  },
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
	resolve({
				video: $('div.col-md-4.col-md-offset-4 > table > tbody > tr > td > video').attr('src')			})
		}).catch(reject)
	})
}

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `masukan url!!!!\nContoh : \n*${usedPrefix + command}* https://twitter.com/gofoodindonesia/status/1229369819511709697`
          m.reply(wait)    
          try {
          let { video } = await twitter(text)
          let te = ` 
┌─⊷ *TWITTER DL*
▢ Url: ${text}
└───────────`
conn.sendFile(m.chat, video, 'twitter.mp4', te, m)
} catch (e) {
  	m.reply(` memverifikasi bahwa tautan berasal dari Twitter`)
	} 
	
}
handler.help = ['twitter'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(twitter|tw)$/i
handler.limit = true
handler.register = true

export default handler