import { createHash } from 'crypto';
import fetch from 'node-fetch';

let handler = async function (m, { text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender];
    
    if (user.registered !== false) throw 'Kamu Sudah mendaftar!!\nIngin daftar ulang? ketik unreg';
    
    let nama = conn.getName(m.sender);
    const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://i.ibb.co/3Fh9V6p/avatar-contact.png");
    
    let ran = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let age = ran.getRandom() * 2;
    user.age = age;
    
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender;
    user.registered = true;
    
    let sn = `${nama}-` + createHash('md5').update(m.sender).digest('hex');
    user.sn = sn;  // Store the serial number in the user object

    // Send "Sedang Memverifikasi" message
    await conn.sendMessage(m.chat, { 
        text: '_Sedang Memverifikasi..._', 
    }, { quoted: m });

    // Delay for 5 seconds (5000 milliseconds)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Reward the user after verification
    user.money = (user.money || 0) + 500000;
    user.limit = (user.limit || 0) + 30;
    user.exp = (user.exp || 0) + 10000;

    // Construct the message to include name, SN, and age
    let p = `*I N F O R M A T I O N*\n\n` +
            `• Nama: ${nama}\n` +
            `• SN: ${sn}\n` +
            `• Umur: ${age} tahun\n\n` +
            `*R E W A R D*\n\n` +
            `Kamu telah menerima:\n` +
            `• Uang: 500000\n` +
            `• Limit: 30\n` +
            `• Exp: 10000\n\n` +
            `_Selamat dan terima kasih telah mendaftar!_`;

    // Send the final message with registration success, rewards, and contextInfo
    await conn.sendMessage(m.chat, {
        text: p,
        contextInfo: {
            externalAdReply: {
                title: "R E G I S T E R",
                body: "Selamat! Anda telah berhasil mendaftar !.",
                thumbnailUrl: pp,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['verify'];
handler.tags = ['main'];
handler.customPrefix = /^(@verify)$/i;
handler.command = new RegExp;

export default handler;