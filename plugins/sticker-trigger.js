/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import uploadImage from '../lib/uploadImage.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!q) return m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    
    if (!/image/g.test(mime) && !/webp/g.test(mime)) return !0
    	
			let img = await q.download?.()
			let out = await uploadImage(img)
			m.reply(wait)
			
			var some = global.API('https://some-random-api.com', '/canvas/triggered', { avatar: out })
			if (some) {
			var stikersome = await createSticker(false, some, packname, name, 60)
			m.reply(stikersome)
			} else {
			 var dham = "https://api.dhamzxploit.my.id/api/canvas/trigger?url=" + out
			 var stikerdham = await createSticker(false, dham, packname, name, 60)
			m.reply(stikerdham)
    }
    
}

handler.menu = ['trigger']
handler.tags = ['sticker']
handler.command = /^(trigger(ed)?)$/i
handler.limit = true

export default handler

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}