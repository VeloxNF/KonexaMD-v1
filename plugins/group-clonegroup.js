/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, text, participants }) => {
   
// to get name group
let gc = await conn.groupMetadata(m.chat)

let teks = await style('Tunggu sebentar sedang kloning group: ' + gc.subject)
 m.reply(teks)
 try {
 // create group & cloning name group original 
let grup = await conn.groupCreate(gc.subject, [m.sender])
// id group clone 
let id = grup.id
// pp grup
let pp = await conn.profilePictureUrl(m.chat)
// to disable welcome (biar ga spam)
db.data.chats[id].welcome = false
// delay 2 second 
await conn.delay(2000)
// clone description ORI to clone
conn.groupUpdateDescription(id, gc.desc)
// clone photo profile
conn.updateProfilePicture(id, { url: pp })
// add all member from group ORI
for (let idny of participants) {
conn.groupParticipantsUpdate(id, [`${idny.id.split('@')[0]}` +  '@s.whatsapp.net'], "add" )
await conn.delay(2000)
}
// success cloning group :v
m.reply('sukses cloning group: ' + gc.subject)
} catch (e) {
console.log(e)
m.reply(eror + ': ' + e)
} finally {
// ntah lah huft
}
    
}
handler.help = ['clonegrup']
handler.tags = ['owner']
handler.command = /^(clon|klon(ing|grup|gc)?)$/
handler.owner = true
handler.admin = true
export default handler