let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `*Example:* ${usedPrefix + command} *[ Replay Image ]*`
    m.reply(wait)
    var response = await scrape.Generate_Image.imgToPrompt(await m.quoted.download())
    m.reply(response)
}
handler.help = ['prompter']
handler.command = ['prompter', 'prompt', 'img2text']
handler.tags = ['ai']

export default handler