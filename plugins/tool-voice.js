import { readFileSync } from 'fs'
import axios from 'axios'
import all from "../scraper/voiceall.js"
import inst from "../scraper/instvoice.js"

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/audio/.test(mime)) throw `*Reply audionya*`
    conn.reply(m.chat, `*_Sedang mencover lagu, tunggu 1 sampai 5 menit_*`, m);
    let media = await q.download?.()
    if (!media) throw 'Can\'t download media'
    const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		return err
	}
}
    let yan = await inst(media)
    let buffer = await getBuffer(yan.vocal)
    let zet = await all(command, buffer)
    conn.sendMessage(m.chat, { audio: { url: zet.base64 }, viewOnce: false, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [100,0,100,0,100,0,100] }, { quoted: m })
}

handler.help = ['kobo', 'zeta', 'gura', 'kaela', 'pekora', 'miko', 'subaru', 'korone', 'luna', 'anya', 'reine', 'calli', 'kroni'].map(v => v + ' <reply>')
handler.tags = ['tools']

handler.command = ['kobo', 'zeta', 'gura', 'kaela', 'pekora', 'miko', 'subaru', 'korone', 'luna', 'anya', 'reine', 'calli', 'kroni']
handler.premium = true

export default handler