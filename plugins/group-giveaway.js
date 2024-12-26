let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    try {
        let acak = await conn.groupMetadata(m.chat)
        let peserta = acak.participants.getRandom()
        let data = global.db.data.users[peserta.id]

        if (data.registered === false && data.registered === 'undefined') return conn.reply(m.chat, `Yah😢 @${peserta.id.split('@')[0]} belum terdaftar di database jadi dapet deh`, null, {
            contextInfo: {
                mentionedJid: [peserta.id]
            }
        })

        let duit = args[0] ? args[0] : 5000
        let token = args[1] ? args[1] : 5000
        if (isNaN(duit)) return m.reply('Nominal harus berupa angka')
        if (isNaN(token)) return m.reply('Nominal harus berupa angka')
        let money = duit * 1
        let limit = token * 1
        data.money += money
        data.limit += limit

        let cap = `Selamat kepada @${peserta.id.split('@')[0]} telah mendapatkan price give away.\n- ${money} Money\n- ${limit} Limit`

        await conn.reply(m.chat, cap, null, {
            contextInfo: {
                mentionedJid: acak.participants.map(v => v.id)
            }
        })

    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['giveaway']
handler.tags = ['group']
handler.owner = true

export default handler