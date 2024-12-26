/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fs from 'fs';

const handler = async (m, {
    args,
    text,
    conn,
    command,
    usedPrefix
}) => {
    const data = fs.readFileSync('./function/database/grup.json');
    let json = JSON.parse(data);

    let type = (args[0] || '').toLowerCase();

    switch (type) {
        case 'on':
            if (json.includes(m.chat)) throw '*Schedule Grup sudah aktif*';

            try {
                // Menambahkan data baru ke dalam array
                json.push(m.chat);
                // Menyimpan perubahan kembali ke file grup.json
                fs.writeFileSync('./function/database/grup.json', JSON.stringify(json));
                // Mengembalikan array yang telah diperbarui
                await conn.reply(m.chat, `Sukses mengaktifkan schedule di grup *${await conn.getName(m.chat)}*`, m);
                return json;
            } catch (e) {
                throw e;
            }
            break;
        case 'off':
            if (!json.includes(m.chat)) throw '*Schedule Grup sudah nonaktif*';
            try {
                json.splice(json.indexOf(m.chat), 1);
                // Menyimpan perubahan kembali ke file grup.json
                fs.writeFileSync('./function/database/grup.json', JSON.stringify(json));
                await conn.reply(m.chat, `Sukses menonaktifkan schedule di grup *${await conn.getName(m.chat)}*`, m);
                return json;
            } catch (e) {
                throw e;
            }
            break;
        default:
            return conn.sendFile(m.chat, 'https://telegra.ph/file/ca2d6b4357559104829ae.jpg', '', `[ *INVALID* ]
Option:
- On
- Off`, m);
    }
};

handler.help = handler.command = ['schedule'];
handler.tags = ['group'];
handler.admin = handler.group = true;

export default handler;