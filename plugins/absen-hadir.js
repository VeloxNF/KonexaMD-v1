let handler = async (m, {
    conn,
    usedPrefix
}) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        await conn.reply(m.chat, `Tidak ada absen berlangsung!`, m)
        throw false
    }
    let absen = conn.absen[id][1]
    if (absen.includes(m.sender)) throw 'Kamu sudah absen!'
    absen.push(m.sender)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    let list = absen.map((v, i) => `${i + 1}.  @${v.split`@`[0]}`).join('\n')
    let caption = `[ *TANGGAL* ]\n${date}
${conn.absen[id][2]}

[ *DAFTAR ABSEN* ]
*Total:* ${absen.length}

${list}
`
    await conn.reply(m.chat, caption, m, {
        mentions: await conn.parseMention(caption)
    })

}
handler.help = ['absen']
handler.tags = ['absen']
handler.command = /^(absen|hadir)$/i
handler.group = true

export default handler