import { Saweria } from '../scraper/saweria.js';
import fs from 'fs';
let json = await fs.readFileSync('./lib/database/login_saweria.js')

let handler = async (m, {text, conn, isROwner}) => {
let logs = JSON.parse(json)
if (!text) return m.reply('Masukan email & password')
if (!isROwner) return m.reply('Fitur khusus owner!')
let [email, pass] = text.split(" ");
let sawer = new Saweria();
let { data, status } = await sawer.login(email, pass)
if (status === false) throw '🛑Kemungkinan email atau password salah'
logs = {
email: email,
pass: pass
}
fs.writeFileSync('./lib/database/login_saweria.js', JSON.stringify(logs))
await m.reply(`*Berhasil login ke akun: ${email}*`)

}
handler.help = ['loginsaweria']
handler.tags = ['owner']
handler.command = /^(login(s)?sawer(ia)?)$/i

export default handler