/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'

let handler = async (m, {conn, command, usedPrefix}) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'media not found'
let media = await q.download()
let isTele = /image\/(png|jpe?g)/.test(mime)
let link = await (isTele ? uploadImage : uploadFile)(media)

  try {
    m.reply(wait)
    const result = await runReplication(link);
    await conn.sendFile(m.chat, result, '', `*Result from*: ${usedPrefix+command}`, m)
  } catch (e) {
    throw e
  }

}
handler.help = handler.command = ['esrgan']
handler.tags = ['ai']
handler.premium = true

export default handler

const Replicate = await (await import("replicate")).default;

const replicate = new Replicate({
  auth: 'r8_XEtruRTwmKLHhC8tH9d7K1wt8s69HSM3DJiwj',
});

const runReplication = async (url) => {
  const output = await replicate.run(
  "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
  {
    input: {
      image: url,
      scale: 3.9,
      face_enhance: true
    }
  }
);
  return output;
};