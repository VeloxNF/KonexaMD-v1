import fs from 'fs';

const handler = async (m, { text, usedPrefix, command }) => {
    if (conn.user.jid !== global.conn.user.jid) return;
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} menu`, m);
    try {
        if (!m.quoted.text) return conn.reply(m.chat, `🚩 Reply Code Message!`, m);
        const path = `plugins/${text}.js`;
        await fs.promises.writeFile(path, m.quoted.text);
        conn.reply(m.chat, `🚩 Saved in ${path}`, m);
    } catch (error) {
        console.log(error);
        conn.reply(m.chat, "🚩 Reply Code Message!", m);
    }
};

handler.help = ['sp'].map(v => v + ' *<text>*');
handler.tags = ['owner'];
handler.command = /^sp$/i;

handler.rowner = true;
export default handler;