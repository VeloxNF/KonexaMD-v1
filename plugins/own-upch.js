import uploadImage from '../lib/uploadImage.js';

let handler = async (m, { conn, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!text) throw 'Harap masukan text!';

    let messageOptions = { text };

    if (/image/.test(mime)) {
        m.reply('Sedang memproses, mohon tunggu...');
        let media = await q.download();
        let url = await uploadImage(media);

        messageOptions = {
            image: { url },
            caption: text,
        };
    }

    // Isi newsletter channel kalian
    await conn.sendMessage('120363272189553503@newsletter', messageOptions);

    m.reply('Pesan berhasil dikirim!');
}

handler.help = ['upch <teks>'];
handler.tags = ['owner'];
handler.command = /^(sendmedia|upch)$/i;
handler.rowner = true

export default handler;