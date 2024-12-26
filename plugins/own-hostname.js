/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)

let handler = async (m, {conn, text}) => {
if (!text) throw 'masukan nama hostname'
try {
if (global.conn.user.jid == conn.user.jid) {
let teks = 'hostnamectl set-hostname '

await exec(teks+text)
await m.reply('*Sukses mengganti nama hostname* ke- '+text)
}
} catch (e) {
throw eror
} }

handler.help = handler.command = ['hostname']
handler.tags = ['owner']
handler.owner = true

export default handler