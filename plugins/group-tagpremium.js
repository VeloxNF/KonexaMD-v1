let handler = async (m, {conn}) => {
let user = db.data.users
try {
let { participants } = await conn.groupMetadata(m.chat)
let prem = []
let filter = participants.map(v => v.id).forEach(v => {
if (user[v] !== undefined && user[v].premium) {
prem.push(v)
}
})
let cap = `Tags Premium\n\n`
for (let usr of prem) {
cap += `- @${usr.split("@")[0]}\n`
}
await conn.reply(m.chat, cap, m, {contextInfo: {mentionedJid: prem}})
} catch (e) {
throw eror
}
}
handler.help = ["tagpremium"]
handler.tags = ["group"]
handler.command = /^(tagprem(ium)?)$/i
export default handler