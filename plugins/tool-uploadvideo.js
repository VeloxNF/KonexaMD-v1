import uploadVideo from '../lib/uploadVideo.js'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
   
  let link = await uploadVideo(media);
    
  m.reply(link)
  
}
handler.help = ['uploadvideo']
handler.tags = ['tools']
handler.command = /^(uploadvideo)$/i
handler.limit = true
handler.register = true

export default handler