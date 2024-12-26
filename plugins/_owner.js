/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/


let handler = m => m

export async function all(m) {
    let user = global.db.data.users[m.sender]
    if (m.chat.endsWith('broadcast')) return
    if (user.ownerTime != 0 && user.owner) {
        if (new Date() * 1 >= user.ownerTime) {
            await m.reply(`waktu owner kamu sudah habis!`)
            user.ownerTime = 0
            user.owner = false
        }
    }
}