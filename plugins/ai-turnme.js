/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'

let handler = async (m, {
    conn,
    args,
    command,
    usedPrefix
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'media not found'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g)/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
					
try {
m.reply(wait)
const result = await runReplication(link)
conn.sendFile(m.chat, result || emror, '', `*Result from*: ${usedPrefix+command}`, m)
} catch (e) {
throw e
}
}
handler.help = ['turnme']
handler.command = /^(turnme)$/i
handler.tags = ['ai']
handler.premium = true 

export default handler

const Replicate = await (await import("replicate")).default;

const replicate = new Replicate({
    auth: 'r8_XEtruRTwmKLHhC8tH9d7K1wt8s69HSM3DJiwj',
});

const runReplication = async (url) => {
    const output = await replicate.run(
  "alaradirik/t2i-adapter-sdxl-lineart:a3d3e0bdeea4925a873179e55701e1091e4b4d7ddeee9a205b932d9de1d9f181",
  {
    input: {
      image: url,
      prompt: "image to anime, 4k photo, reality, high quality",
      scheduler: "KarrasDPM",
      num_samples: 3,
      guidance_scale: 7.5,
      negative_prompt: "anime, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured",
      num_inference_steps: 93,
      adapter_conditioning_scale: 0.8,
      adapter_conditioning_factor: 0.83
    }
  }
);
    return output;
};