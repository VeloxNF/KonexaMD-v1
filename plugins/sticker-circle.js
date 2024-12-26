/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import Jimp from 'jimp'
import {
    sticker
} from '../lib/sticker.js'
import uploadImage from '../lib/uploadImage.js'
import fs from 'fs'

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let stiker = false
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!mime) return m.reply(`Kirim/reply gambar Dengan caption
${usedPrefix + command}`)
    let img = await conn.saveMedia(q, './tmp/circle')
   let result = await createCircleImage(img, './tmp/recir.jpg')
   let baca = fs.readFileSync('./tmp/recir.jpg' || './tmp/recir.webp' || './tmp/recir.png')
    

    stiker = await sticker(baca, null, global.packname, global.author)

    conn.sendFile(m.chat, stiker, 's.webp', m)
}
handler.help = ['scircle']
handler.tags = ['sticker']
handler.command = /^(scircle|scir)$/i

export default handler


// Fungsi untuk membuat gambar lingkaran
async function createCircleImage(sourcePath, outputPath) {
    try {
        const image = await Jimp.read(sourcePath);
        const diameter = Math.min(image.getWidth(), image.getHeight());

        // Mengatur ukuran gambar menjadi lingkaran
        image.resize(diameter, diameter);

        // Mengganti semua pixel di luar lingkaran menjadi transparan
        image.scan(0, 0, image.getWidth(), image.getHeight(), (x, y, idx) => {
            const distanceFromCenter = Math.sqrt(
                Math.pow(x - diameter / 2, 2) + Math.pow(y - diameter / 2, 2)
            );
            if (distanceFromCenter > diameter / 2) {
                image.bitmap.data[idx + 3] = 0; // Set nilai alpha (opacity) pixel menjadi 0
            }
        });

        await image.writeAsync(outputPath);
        console.log('Gambar lingkaran berhasil dibuat!');
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}