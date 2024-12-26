import fs from 'fs';
import crypto from 'crypto';

let handler = async (m, { conn, command }) => {
    if (!m.quoted) return conn.reply(m.chat, `*reply pesannya kontol*`, m);

    let messageData = JSON.stringify({ [m.quoted.mtype]: m.quoted }, null, 2);
    let fileName = `MessageData_${crypto.randomBytes(8).toString('hex')}.json`;

    await fs.writeFileSync(fileName, messageData);
    await conn.reply(m.chat, messageData, m);
    await conn.sendMessage(m.chat, { document: { url: `./${fileName}` }, fileName, mimetype: '*/*' }, { quoted: m });
    await fs.unlinkSync(fileName);
};

handler.help = ['ambilq', 'getq']
handler.command = ['ambilq', 'getq']
handler.tags = ['tools']
handler.register = true
handler.owner = true

export default handler;