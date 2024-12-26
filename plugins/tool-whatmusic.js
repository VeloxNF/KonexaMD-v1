/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fs from 'fs'
import acrcloud from 'acrcloud'

let handler = async (m, {usedPrefix, command, conn, text }) => {

//access token
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})
let mimes = (m.quoted ? m.quoted : m.msg).mimetype || ''

if (/audio|video/.test(mimes)) {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''

m.reply(wait)
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
let { code, msg } = res.status
if (code !== 0) return m.reply('Music not found.')
let { title, artists, album, genres, release_date } = res.metadata.music[0]
let txt = `乂  *SEARCHING SONG*

◦ Title: ${title}
◦ Name artis: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Not known'}
◦ Album: ${album.name || 'Not known'}
◦ Genre: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'Not known'}
◦ Di Rilis: ${release_date || 'not known '}

`.trim()
fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
m.reply(txt)
} else m.reply(`Reply audio atau video dengan perintah ${command}`)

}
handler.help = ['whatmusic']
handler.tags = ['tools']
handler.command = /^(whatmusic)$/i
handler.limit = true
handler.register = true 

export default handler