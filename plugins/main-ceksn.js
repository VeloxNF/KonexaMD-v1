const { proto, prepareWAMessageMedia, generateWAMessageFromContent } = (await import('@adiwajshing/baileys')).default
import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
  // Fetch profile picture URL of the sender
  const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")
  
  let sn = createHash('md5').update(m.sender).digest('hex')
  let name = await conn.getName(m.sender)

  let albert = `${name}\n\n- *S E R I A L - N U M B E R :*\n${sn}`

  // Adding contextInfo with externalAdReply
  await conn.reply(m.chat, albert, m, {
    contextInfo: {
      externalAdReply: {
        mediaType: 1,
        title: nameown,
        thumbnailUrl: pp,  // Use the user's profile picture as the thumbnail
        renderLargerThumbnail: true,
        sourceUrl: ''  // Add source URL if needed
      },
      deviceListMetadata: {},
      deviceListMetadataVersion: 2
    }
  })
}

handler.help = ['ceksn']
handler.tags = ['main']
handler.command = /^(ceksn)$/i
handler.register = true
export default handler