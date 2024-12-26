/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'

let toM = a => '@' + a.split('@')[0]
let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    args,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)

    if (command == 'menikah') {
        let ps = groupMetadata.participants.map(v => v.id)
        let a = ps.getRandom()
        let b
        do b = ps.getRandom()
        while (b === a)
        m.reply(`*${toM(a)}, KAU HARUS MENIKAHI ${toM(b)}, KAMU PASTI AKAN MENJADI PASANGAN YANG BAIK 💓*`)
    }

    if (command == 'metercinta') {
        if (!text) throw `Contoh pemakaian: ${usedPrefix}${command} terserah`
        conn.reply(m.chat, `
*❤️❤️ METER CINTA ❤️❤️*
*Cinta dari ${text} itu untuk kamu* *${Math.floor(Math.random() * 100)}%* *dari 100%*
*kamu harus memintanya untuk menjadi pacar kamu?*
`.trim(), m)
    }

    if (command == 'bertanya') {
        if (!text) throw `Contoh pemakaian: ${usedPrefix}${command} haruskah saya makan?`
        m.reply(`
*⁉️ PERTANYAAN ⁉️*
 
*PERTANYAAN:* ${text}
*TANGGAPAN:* ${['Ya','Mungkin ya','Mungkin','Mungkin tidak','Tidak','Tidak mungkin'].getRandom()}
`.trim())
    }     
}
handler.command = handler.help = ['menikah', 'metercinta', 'bertanya']
handler.tags = ['primbon']

export default handler