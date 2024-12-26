let handler = async (m, {conn}) => {
let who;
if (m.isGroup) {
who = m.mentionedJid[0] ? m.mentionedJid[0]  : m.sender
} else {
 who = m.sender
}
let user = db.data.users[who]

let days = Math.abs(Math.floor((user.premiumTime - new Date()) / (24 * 60 * 60 * 1000)));
let hours = Math.abs(Math.floor((user.premiumTime - new Date()) / (60 * 60 * 1000))) % 24;
let minutes = Math.abs(Math.floor((user.premiumTime - new Date()) / (60 * 1000))) % 60;
let prem = `${days} Hari ${hours} Jam ${minutes} Menit`

let cap = `*Check Premium*

*Name:* \`@${who.split("@")[0]}\`
*Premium*: \`${user.premium ? "Premium" : "Gratisan"}\`
*Expired*: \`${user.premium ? prem : "No expired"}\``

await m.reply(cap)
}
handler.help = handler.command = ['cekpremium']
handler.tags = ['info']
handler.register = true
export default handler