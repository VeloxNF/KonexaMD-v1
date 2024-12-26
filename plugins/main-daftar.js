import { createHash } from 'crypto'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { text, usedPrefix, command }) {
    let namae = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")

    if (user.registered === true) throw `You Have Already Registered In The Database, Do You Want To Re-Register? *${usedPrefix}unreg*`
    if (!Reg.test(text)) return m.reply(`Masukan Nama.Umur kamu\nContoh: .daftar Tio.17`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) throw 'Nama Tidak Boleh Kosong'
    if (!age) throw 'Umur Tidak Boleh Kosong'
    age = parseInt(age)
    if (age > 30) throw 'Tua Banget amjir -_-'
    if (age < 5) throw 'Terlalu bocil ;!'

    user.name = name.trim()
    user.age = age
    user.regTime = + new Date
    user.registered = true
    user.money = (user.money || 0) + 500000
    user.limit = (user.limit || 0) + 30
    user.exp = (user.exp || 0) + 1000

    let sn = createHash('md5').update(m.sender).digest('hex')
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender

    // Get current date and time in WIB (GMT+7)
    let now = new Date()
    let optionsDate = { day: '2-digit', month: 'long', year: 'numeric' }
    let optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta' }

    let date = now.toLocaleDateString('id-ID', optionsDate) // Format: dd MMMM yyyy
    let time = now.toLocaleTimeString('id-ID', optionsTime) // Format: HH:mm:ss

    let cap = `
*I N F O R M A T I O N*
• *Name* : ${name}
• *Age* : ${age} Years
• *Sn* : ${sn}
• *Date* : ${date}
• *Time* : ${time}

*R E W A R D S*
• *Money* : 500,000
• *Limit* : 30
• *Experience* : 1,000
`

    await conn.sendMessage(m.chat, { 
        text: cap,
        contextInfo: {
            "externalAdReply": {
                "title": "Registration Successful",
                "body": "Welcome aboard! Your registration is now complete.",
                "mediaType": 1,
                "thumbnailUrl": pp,
                "sourceUrl": '',
                "showAdAttribution": true,
                "renderLargerThumbnail": true
            }
        }
    }, m)
}

handler.help = ['daftar', 'register']
handler.tags = ['main']
handler.command = /^(daftar|verify|reg(ister)?)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}