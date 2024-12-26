/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
let response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Parameter'
  m.reply('proses..')
  let res = `https://api.caliph.biz.id/api/sadboy?nama=${response[0]}&nama2=${response[1]}&apikey=caliphkey`
  conn.sendFile(m.chat, res, 'gfx3.jpg', `Nih kak`, m, false)
}
handler.help = ['logosadboy'].map(v => v + ' <text|text>')
handler.tags = ['maker']
handler.command = /^(logosadboy)$/i

export default handler