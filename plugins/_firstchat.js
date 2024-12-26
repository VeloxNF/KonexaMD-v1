/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import moment from 'moment-timezone'
let handler = m => m

handler.before = async function(m, {
    conn,
    isROwner,
    isPrems
}) {

    if (m.chat.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
    // data
    let bot = db.data.settings[conn.user.jid]

    let user = global.db.data.users[m.sender]

    let username = conn.getName(m.sender)

    // function must join grup
    if (bot.allakses) {

        if (user.premium && isPrems) {
            user.banned = false
        } else if (user.owner && isROwner) {
            user.banned = false
        } else user.banned = false
    }
    
    if (new Date - user.pc < 86400000) return
    
    let name = conn.getName(m.sender)
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
    let fkon = { key: { fromMe: false, participant: `${m.sender}`, ...(m.chat ? { remoteJid: m.sender } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    let pesan = `Hai ${ucapan()} *${username.replace(/@.+/, '')}* 👋
${user.banned ? `📢 Kamu tidak dapat mengakses fitur ❗\nBeli premium untuk dapat mengakses Bot di PC\nowner: wa.me/${global.nomerown}\n${global.wm}` : `Ada yang bisa ${global.namebot} bantu?`}`
let fanzFkontak = {
      key: {
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net",
        fromMe: false,
        id: "",
      },
      message: {
        conversation: "_The System Notifications First Chat Private Bot_",
      },
    };
    conn.reply(global.idk, `*❗${name} First Chats*\n> • *Nomor Link:* https://wa.me/${who.split`@`[0]}`, fanzFkontak);
    await m.reply(pesan)
    setTimeout(() => {
    user.banned = false
}, 1000)
    user.pc = new Date * 1
}

export default handler

function ucapan() {
    const hour_now = moment.tz('Asia/Jakarta').format('HH')
    var ucapanWaktu = 'Pagi kak'
    if (hour_now >= '03' && hour_now <= '10') {
        ucapanWaktu = 'Pagi kak'
    } else if (hour_now >= '10' && hour_now <= '15') {
        ucapanWaktu = 'Siang kak'
    } else if (hour_now >= '15' && hour_now <= '17') {
        ucapanWaktu = 'Sore kak'
    } else if (hour_now >= '17' && hour_now <= '18') {
        ucapanWaktu = 'Selamat Petang kak'
    } else if (hour_now >= '18' && hour_now <= '23') {
        ucapanWaktu = 'Malam kak'
    } else {
        ucapanWaktu = 'Selamat Malam!'
    }
    return ucapanWaktu
}