import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn,
 usedPrefix,
 args, 
 command, 
 text 
 }) => {
 const scdl = new SoundCloud
 
 switch (command) {
 case 'soundcloud':
if (!text) throw `Linknya?\nExample: *.soundcloud https://soundcloud.com/ndaa-212683099/dj-coba-kau-ingat-ingat-kembali-seharusnya-aku-jungle-dutch-terbaru-2021-full-bass-viral-tik?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing*`
  m.reply(wait)
  
  try {
  let { url, thumb, title, duration, quality } = await scdl.download(text);
  
  let img = await conn.sendFile(m.chat, thumb || emror, 'error.jpg', `*Title: ${title}*\n> Durasi  ${duration}\n> Quality: ${quality}`, m)
await conn.sendMessage(m.chat, {audio: {url: url}, mimetype: 'audio/mpeg', ptt: false}, {quoted: img})

 } catch (e) {
 throw eror
 }
 break 
 case 'soundclouds':
 if (!text) throw `> Use: ${usedPrefix+command} fadded`
 const result = await scdl.search(text);
 let cap = `> Sound cloud search\n\n`
 let no = 1
 for (let a of result ) {
 cap += `${no++}.${a.permalink}\n> ${a.permalink_url}\n`
 }
 await conn.sendFile(m.chat, result[0].artwork_url, '', cap, m)
 break 
 }
}
handler.help = ['soundcloud2']
handler.tags = ['downloader']
handler.command = /^(soundcloud(s)?2)$/i
handler.limit = true
handler.register = true

export default handler

export class SoundCloud {
    toTimeString(num) {
        return new Date(num * 1000).toTimeString().split(' ')[0]
    }

    cLoad(html) {
        return cheerio.load(html.data)
    }

    async req(url, opt = {}) {
        return await axios({
            url,
            ...opt
        })
    }

    async getSession() {
        let res = await this.req('https://soundcloudmp3.org/id')
        let token = this.cLoad(res)('form#conversionForm > input[type=hidden]').attr('value')
        return {
            cookie: res['headers']['set-cookie'],
            token
        }
    }

    async search(query) {
        let res = await this.req(`https://api-mobi.soundcloud.com/search?q=${query}&client_id=iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX&stage=`)
        return res?.data?.collection?.filter(v => /track/.test(v?.kind))
    }

    async download(url) {
        let session = await this.getSession()
        let res = await this.req('https://soundcloudmp3.org/converter', {
            method: 'post',
            data: new URLSearchParams(Object.entries({
                _token: session.token,
                url
            })),
            headers: {
                cookie: session.cookie
            },
        })
        let $ = this.cLoad(res)
        let data = {}
        data.thumb = $('div.info.clearfix > img').attr('src')
        data.title = $('div.info.clearfix > p:nth-child(2)').text().replace('Title:', '')
        data.duration = $('div.info.clearfix > p:nth-child(3)').text().replace(/Length\:|Minutes/gi, '').trim()
        data.quality = $('div.info.clearfix > p:nth-child(4)').text().replace('Quality:', '')
        data.url = $('a#download-btn').attr('href')
        return data
    }

    async download2(url) {
        let res = await this.req(`https://getvideo.p.rapidapi.com/?url=${url}`, {
            headers: {
                'x-rapidapi-key': '5be05bd400msh1fe8c757005c169p10ea3bjsnf6b6811bc600'
            }
        })
        return res.data
    }
}