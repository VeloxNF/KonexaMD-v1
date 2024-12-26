/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { Ytdl } from '../scraper/yt.js'

let handler = m => m
handler.before = async function (m, {conn}) {
  this.data = this.data ? this.data : {}
  let id = m.sender
  if (!m.text) return !0
  
  let mp_3 = Object.values(this.data).find(v => v.user === m.sender)
  if (!mp_3) return !0

  let yt = new Ytdl()
  let { audio, video } = await yt.play(mp_3.url)

  if (m.text.toLowerCase() == 'mp3') {
    m.reply(wait).then(_ => {
      conn.sendMessage(m.chat, {react: {text: '🚀', key: m.key}})
    })
   
    let doc = {
      audio: {
        url: audio["128"].url
      },
      mimetype: 'audio/mp4',
      fileName: mp_3.title,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: mp_3.url,
          title: mp_3.title,
          body: wm,
          sourceUrl: mp_3.url,
          thumbnail: await (await this.getFile(mp_3.thumbnail)).data
        }
      }
    };

    await conn.sendMessage(m.chat, doc, { quoted: m }).then(_ => {
      conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
    })

    // Delete the audio file
    delete this.data[id]
  } else if (m.text.toLowerCase() == 'mp4') {
    m.reply(wait).then(_ => {
      conn.sendMessage(m.chat, {react: {text: '🚀', key: m.key}})
    })
      const videoUrl = video["480"].url || video["360"].url || video["144"].url
      const resolution = video["480"] ? '480p' : video["360"] ? '360p' : '144p'

      await conn.sendMessage(m.chat, {
        video: { url: videoUrl },
        caption: `乂 *Y T  M P 4*
        
⚘ *Title* : ${mp_3.title}
⚘ *Publish* : ${mp_3.ago}
⚘ *Views* : ${mp_3.views}
⚘ *Duration* : ${mp_3.times}
⚘ *Resolusi* : ${resolution}
⚘ *URL* : ${mp_3.url}`
      }, {quoted: m}).then(() => conn.sendMessage(m.chat, {react: {text: '✅', key: m.key}}))

    delete this.data[id]
  } else if (m.text.toLowerCase() == 'cancel') {
    let stel = await style('*Lagu/Video yang kamu pilih akan di hapus*..', 1)
    m.reply(stel).then(_ => {
      delete this.data[id]
    })
  }
  return !0
}

export default handler