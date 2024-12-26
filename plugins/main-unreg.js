import { createHash } from 'crypto';

let handler = async function(m, { text, conn, args }) {
    // Check if the message is sent in a group
    if (!m.isGroup) return conn.sendText(m.chat, 'This command can only be used in a group.');

    if (!text) return conn.sendText(m.chat, 'Masukan *Serial Number* untuk unregister');

    let user = global.db.data.users[m.sender];
    const pp = await conn.profilePictureUrl(m.sender, "image").catch(() => "https://i.ibb.co/3Fh9V6p/avatar-contact.png");
    let sn = createHash('md5').update(m.sender).digest('hex');

    if (text !== sn) throw 'Serial Number Salah';

    user.registered = false;

    let cap = `✅ *Unreg Successfully*\n\n» *Status :* Sukses`;

    conn.sendMessage(m.chat, {
        image: { url: pp },
        caption: cap,
        contextInfo: {
            "externalAdReply": {
                "title": 'UNREGISTRATION',
                "body": 'UNREGISTRATION',
                "mediaType": 1,
                "sourceUrl": '',
                "showAdAttribution": false,
                "renderLargerThumbnail": false
            }
        }
    }, { quoted: m });
};

handler.help = ['unregister'];
handler.tags = ['main'];

handler.command = /^unreg(ister)?$/i;
handler.register = true;

export default handler;