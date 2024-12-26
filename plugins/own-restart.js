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

try {
var load = [
"□□□□□0%",
"■□□□□20%",
"■■□□□40%",
"■■■□□60%",
"■■■■□80%",
"■■■■□90%",
"■■■■■100%",
"□□□□□0%",
"■□□□□20%",
"■■□□□40%",
"■■■□□60%",
"■■■■□80%",
"■■■■□90%",
"■■■■■100%",
"Restɑrting...."
]
if (!text) return m.reply('Masukan app pm2 nya')

let { key } = await conn.sendMessage(m.chat, {text: '⚠️'})//Pengalih isu

for (let i = 0; i < load.length; i++) {

await conn.sendMessage(m.chat, {text: load[i], edit: key })
await conn.delay(100)
}
await conn.delay(1000)
if (global.conn.user.jid == conn.user.jid) {

let cmd = '$'
let teks = 'pm2 restart '

await exec(teks+text)

}
} catch (e) {
throw eror
} }

handler.help = handler.command = ['restart']
handler.tags = ['owner']
handler.owner = true

export default handler