let handler = async (m, { conn, usedPrefix, command }) => {
    // Pastikan bahwa db.data.chats[m.chat] ada
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {}
    }

    // Pastikan bahwa list ada
    if (!global.db.data.chats[m.chat].list) {
        global.db.data.chats[m.chat].list = {}
    }

    let msgs = global.db.data.chats[m.chat].list
    let msgNames = Object.keys(msgs);
    
    if (msgNames.length > 0) {
        let list = msgNames.map(name => `├ ${name}`).join('\n');
        return conn.reply(m.chat, `┌「 *Daftar Store* 」\n${list}\n└──────────`, m);
    } else {
        throw `Belum Ada List Store.\nKetik *${usedPrefix + command} <teks>* Untuk Menambahkan Daftar Store.\n`;
    }
}

handler.help = ['liststore']
handler.tags = ['main']
handler.command = /^list(store|shop)?$/i
handler.group = true

export default handler