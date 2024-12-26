/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, {
    conn,
    text
}) => {

    if (!text) return m.reply('_Masukkan Nama Grup!_')
    try {
        await m.reply(wait)
        let group = await conn.groupCreate(text, [m.sender])
        let link = await conn.groupInviteCode(group.id)
        let url = 'https://chat.whatsapp.com/' + link;
        await m.reply(`_Berhasil Membuat Grup *${text}*_
 
*Nama:* ${text}
*ID:* ${group.id}
*Link:* ${url}`)
    } catch (e) {
        throw eror
    }
}
handler.help = ['creategroup']
handler.tags = ['owner']
handler.command = /^((create|buat)(gc|grup|group))$/

handler.premium = true
export default handler