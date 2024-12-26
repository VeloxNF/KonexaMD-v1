function handler(m, { text }) {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
    m.reply(teks.replace(/[aiueo]/gi, '$&ve'))
}
handler.menufun = ['purba *<teks>*']
handler.tagsfun = ['fun']
handler.command =  /^(purba)$/i
handler.group = true 

export default handler