/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { ttSearch } from '../scraper/ttSearch.js'
let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    
ttSearch('video sad').then(a => {
let _ = a.videos
let b = _[Math.floor(Math.random() * _.length)]

let result = 'https://tikwm.com/' + b.play
conn.sendMessage(m.chat, {video: {url: result}, caption: command}, {quoted: m})
}).catch(err => {
m.reply(eror)
})
}
handler.help = ['videosad']
handler.tags = ['random']
handler.command = /^(videosad)$/i
handler.limit = true 
handler.register = true

export default handler