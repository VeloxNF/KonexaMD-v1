let handler = async (m, { conn, args, isOwner, isAdmin }) => {
    let user = args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : '';
    if (!user) return conn.reply(m.chat, 'Silakan masukkan nomor pengguna yang valid.', m);

    // Memeriksa apakah pengguna adalah owner atau moderator
    if (!isOwner && !global.db.data.users[m.sender]?.moderator) {
        return conn.reply(m.chat, 'Perintah ini hanya bisa digunakan oleh owner atau moderator.', m);
    }

    // Memeriksa apakah pengguna yang ditargetkan berada di whitelist
    if (global.db.data.users[user]?.whitelist) {
        return conn.reply(m.chat, 'Pengguna ini ada di whitelist dan tidak bisa dibanned atau diunban.', m);
    }

    // Perintah ban
    if (args[0] === 'ban') {
        if (global.db.data.users[user]?.banned) {
            return conn.reply(m.chat, 'Pengguna ini sudah dibanned.', m);
        }
        global.db.data.users[user] = global.db.data.users[user] || {};
        global.db.data.users[user].banned = true;
        return conn.reply(m.chat, `Pengguna ${user.split('@')[0]} telah dibanned.`, m);
    }

    // Perintah unban
    if (args[0] === 'unban') {
        if (!global.db.data.users[user]?.banned) {
            return conn.reply(m.chat, 'Pengguna ini tidak dibanned.', m);
        }
        global.db.data.users[user].banned = false;
        return conn.reply(m.chat, `Pengguna ${user.split('@')[0]} telah diunban.`, m);
    }

    // Perintah whitelist
    if (args[0] === 'whitelist') {
        if (args[2] === 'add') {
            if (global.db.data.users[user]?.whitelist) {
                return conn.reply(m.chat, 'Pengguna ini sudah ada di whitelist.', m);
            }
            global.db.data.users[user] = global.db.data.users[user] || {};
            global.db.data.users[user].whitelist = true;
            return conn.reply(m.chat, `Pengguna ${user.split('@')[0]} berhasil ditambahkan ke whitelist.`, m);
        }
        if (args[2] === 'del') {
            if (!global.db.data.users[user]?.whitelist) {
                return conn.reply(m.chat, 'Pengguna ini tidak ada di whitelist.', m);
            }
            global.db.data.users[user].whitelist = false;
            return conn.reply(m.chat, `Pengguna ${user.split('@')[0]} berhasil dihapus dari whitelist.`, m);
        }
        return conn.reply(m.chat, 'Gunakan format: !whitelist add/del <nomor>', m);
    }

    // Jika format perintah salah
    return conn.reply(m.chat, 'Format salah! Gunakan:\n!ban <nomor>\n!unban <nomor>\n!whitelist add/del <nomor>', m);
};

handler.help = ['ban <nomor>', 'unban <nomor>', 'whitelist add/del <nomor>'];
handler.tags = ['owner'];
handler.command = /^(ban|unban|whitelist)$/i;
handler.owner = true; // Hanya owner yang bisa menjalankan perintah ini
handler.moderator = true; // Moderator juga bisa menjalankan perintah ini
handler.botAdmin = true; // Bot harus menjadi admin untuk menggunakan perintah ini

export default handler;