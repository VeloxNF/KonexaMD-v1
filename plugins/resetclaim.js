import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, args }) => {
const directory = './plugins/database/userclaim';

fs.readdir(directory, (err, files) => {
    if (err) {
        return console.error(`Unable to scan directory: ${err}`);
    }

    files.forEach(file => {
        const filePath = path.join(directory, file);
        fs.unlink(filePath, err => {
            if (err) {
                console.error(`Unable to delete file: ${err}`);
            } else {
                console.log(`Deleted file: ${filePath}`);
            }
        });
    });
    m.reply('Berhasil Menghapus batas pada semua user claim code')
});
}

handler.help = ['resetclaim']
handler.tags = ['rpg']
handler.command = /^(resetclaim)$/i

export default handler

function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}