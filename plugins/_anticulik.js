import fs from 'fs'
let handler = m => m

handler.all = async function (m, { isBlocked }) {
    if (isBlocked) return
    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('Undangan untuk bergabung') || m.text.startsWith('Invitation to join') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
    let teks = `Ngapain om -_-
    
    ⏥ *List harga sewa Bot MD* ⏥
╭━─━─━─≪✠≫─━─━─━╮
│ 2k/hari
│ 8k/Minggu
│ 17k/bulan
│ 50k/permanen
│ 65k/permanen + owner 30 hari
╰━─━─━─≪✠≫─━─━─━╯


Jika berminat hubungi: @${global.owner[0]} silahkan order :)
`
    this.reply(m.chat, teks, m)
    const data = global.owner.filter(([id, isCreator]) => id && isCreator)
    this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
    }
}

export default handler