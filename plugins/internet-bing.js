import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, command, usedPrefix, args, text}) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} rumus kimia`
	if (!text) return m.reply(input)
    axios.get('https://www.bing.com/search?q=' + text)
  .then(response => {
    const $ = cheerio.load(response.data);
    const searchResults = [];

    $('.b_algo').each((index, element) => {
      const title = $(element).find('h2').text();
      const url = $(element).find('a').attr('href');
      const description = $(element).find('.b_caption p').text();

      searchResults.push({ title, url, description });
    });
            let bing = `Bing Search From : ${text}\n\n`;
            for (let g of searchResults) { 
              bing += ` *Title* : ${g.title}\n`;
              bing += ` *Description* : ${g.description}\n`;
              bing += ` *Link* : ${g.url}\n\n`;
            }
  conn.sendMessage(m.chat, {text: bing, contextInfo:
					{
						"externalAdReply": {
							"title": 'BING SEARCHING',
							"body": '',
							"showAdAttribution": true,
							"mediaType": 1,
							"sourceUrl": '',
							"thumbnailUrl": 'https://telegra.ph/file/3a22a7e5574face2c6eca.png',
							"renderLargerThumbnail": true

						}
					}}, {quoted: m})
					}).catch(err => {
					m.reply(eror)
					})
}
handler.help = ['bingsearch']
handler.tags = ['internet']
handler.command = /^(bings(earch)?)$/i
handler.limit = true

export default handler