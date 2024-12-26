/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

const xpperlimit = 1
let handler = async (m, { conn, command, args }) => {
	let user = global.db.data.users[m.sender]
  let count = command.replace(/^nabung/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (user.bank > user.fullatm) return m.reply('Uang Dibank Kamu Sudah Penuh!')
  if (count > user.fullatm - user.bank) return m.reply('Uangnmu Udah Terlalu Banyak Di Bank')
  if (global.db.data.users[m.sender].money >= xpperlimit * count) {
    global.db.data.users[m.sender].money -= xpperlimit * count
    global.db.data.users[m.sender].bank += count
    conn.reply(m.chat, `Sukses Menabung Uang Sebesar ${count}`, m)
  } else conn.reply(m.chat, `Uang Kamu Tidak Mencukupi Untuk Menabung Uang Sebesar ${count}`, m)
}
handler.help = ['nabung']
handler.tags = ['rpg']
handler.command = /^nabung([0-9]+)|nabung|nabungall$/i
handler.register = true

export default handler