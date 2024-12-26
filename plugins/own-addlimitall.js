/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, command, text, args }) => {

if (!text) throw 'jumlah?'

    let users = Object.keys(global.db.data.users)
    let user = db.data.users
    let lim = text * 1
    for (let usr of users) {
    user[usr].limit += lim
    }
    conn.reply(m.chat, `sukses menambah limit ke semua user sebanyak ${text}`, m)
}
handler.help = ['addlimitall']
handler.tags = ['owner']
handler.command = /^(addlimitall)$/i
handler.owner = true

export default handler