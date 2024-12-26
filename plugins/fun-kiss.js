let handler = async (m, {conn}) => {
let who;
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
else m.sender

await conn.sendMessage(m.chat, {image: {url: 'https://i.ibb.co.com/myKS8X0/IMG-20240716-WA0089.jpg'}, caption: `@${m.sender.split("@")[0]} *Kiss* @${who.split("@")[0]}`, contextInfo: {mentionedJid: [m.sender, who]}}, {quoted: m})
}
handler.help = handler.command = ['kiss']
handler.tags = ['funn']
export default handler