let handler = async (m, {
    conn
}) => {
    let teks = `
\`\`\`let handler = async (m, {conn}) => {
}
handler.help = handler.command = ['tes']
handler.tags = ['main']
export default handler
\`\`\`
`
    m.reply(teks)
}
handler.help = handler.command = ['example']
handler.tags = ['main']

export default handler