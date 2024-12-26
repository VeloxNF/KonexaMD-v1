let handler = async (m, { conn, usedPrefix, command, args,}) => {

  let isEnable = /true|(aktif)kan|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
    
  switch (type) {
      case 'simi':
      chat.simiC = isEnable
      break
      case 'simivoice':
      chat.simivoice = isEnable
      break
    default:
     if (!/[01]/.test(command)) return m.reply(`List Option User :
     
▱━━━❲ *User* ❳━━━▱

⟐ Simi
⟐ Simivoice

Example :
.aktif simi <To activate>
.nonaktif simi <To Deactivate>

`.trim())
      throw false
  }
 m.reply(` \`\`\`<•[ Status ]•>\`\`\`
 
 *Tipe :* ${type}
 *Status :* Sukses!
 *Opsi* : ~${isEnable ? 'Nonaktif' : 'Aktif'}~ / *${isEnable ? 'Aktif' : 'Nonaktif'}*
 *Untuk* : ${isUser ? '' : 'Chat Ini'}

`)
}
handler.help = ['aktifkan', 'matikan']
handler.tags = ['main']
handler.command = /^((aktif|mati)kan)$/i

handler.register = true
handler.private = true
handler.limit = true

export default handler