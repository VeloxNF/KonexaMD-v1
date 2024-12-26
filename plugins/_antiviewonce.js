/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let { downloadContentFromMessage } = (await import('@adiwajshing/baileys'));
import fetch from 'node-fetch';

export async function before(m, { conn }) {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who).catch(_ => ppKosong);
    let name = await conn.getName(who);

    let chat = global.db.data.chats[m.chat];
    if (chat.viewonce) {
        if (m.mtype == 'viewOnceMessageV2') {
            let msg = m.message.viewOnceMessageV2.message;
            let type = Object.keys(msg)[0];
            let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video');
            let buffer = Buffer.from([]);
            for await (const chunk of media) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            if (/video/.test(type)) {
                return conn.sendFile(m.chat, buffer, '', `[View Once Video] Detected\n\n` + (msg[type].caption || ''), m);
            } else if (/image/.test(type)) {
                return conn.sendFile(m.chat, buffer, '', `[View Once Image] Detected\n\n` + (msg[type].caption || ''), m);
            }
            } else if (m.mtype == "viewOnceMessageV2Extension") {
            let mssg = m.message.viewOnceMessageV2Extension.message;
            let tipe = Object.keys(mssg)[0]
            let media2 = await downloadContentFromMessage(mssg[tipe], 'audio');
            let buff = Buffer.from([]);
            for await (const chunk of media2) {
                buff = Buffer.concat([buff, chunk]);
            }
            if (/audio/.test(tipe)) {
            await conn.reply(m.chat, `@${m.sender.split("@")[0]} telah mengirim audio sekali putar`, null, {contextInfo: {mentionedJid: [m.sender]}})
            return conn.sendFile(m.chat, buff, '', '', m, true);
                            
            }
            }
        }
    }