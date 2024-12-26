let handler = async (m, {
    conn
}) => {
    let text;
    if (m.quoted) {
        text = m.quoted.text
    } else if (m.text.length > 6) {
        text = m.text.split("@admin ")[1]
    } else return m.reply("kamu mau lapor apa?")


await conn.sendMessage(m.chat, {text: `@${m.chat}`, contextInfo: {
mentionedJid: [m.sender],
groupMentions: [
{
groupSubject: `*${await conn.getName(m.sender) ? await conn.getName(m.sender) : m.sender.split("@")[0]} telah dilaporkan*`,
groupJid: m.chat
}]
}
}, {quoted: fVerif})

    let {
        participants
    } = await conn.groupMetadata(m.chat);
    let admin = Object.values(participants).filter(v => v.admin !== null).map(v => v.id)

    admin.forEach(async (v) => {
        await conn.reply(v, `[ \`LAPORAN\` ]\n\n💬: *${text}*\n👤: *@${m.sender.split("@")[0]}*`, fkon, {
            contextInfo: {
                mentionedJid: [m.sender]
            }
        })
        await conn.delay(500)
    })
}
handler.help = ["@admin"]
handler.customPrefix = /^(@admin)/i;
handler.command = new RegExp()
handler.tags = ["group"]
handler.group = true

export default handler