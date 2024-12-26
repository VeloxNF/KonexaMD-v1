let handler = async (m, { conn, args }) => {
    let bot = conn.user.jid // Bot
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
      let img = await q.download()
      if (!img) return m.reply(`Fotonya mana -_`)
     conn.updateProfilePicture (bot, img)
    conn.reply(m.chat, 'Selesai Mengganti Profil !', m)
	}
    }
handler.help = ['setppbot']
handler.tags = ['owner']
handler.command = /^(setppbot|setpp)$/i
handler.owner = true

export default handler