let handler = async (m, {
    text
}) => {
    if (!text) return m.reply('Nama buat bot, siapa?')

    await conn.updateProfileName(text).then((res) => m.reply('*Success change name Bot* ' + text)).catch((err) => m.reply(e));

}
handler.help = handler.command = ['setnamebot']
handler.tags = ['owner']
handler.rowner = true

export default handler