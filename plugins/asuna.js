import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    try {
        // Check if the message contains an image
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        let result;

        if (mime && mime.startsWith('image')) {
            // React with a clock emoji while processing
            await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

            // Download and upload the image to get a URL
            let media = await q.download();
            let url = await uploadImage(media);

            // Prepare the request body for the API
            const requestBody = {
                ask: text,
                image: url
            };

            // Make a POST request to the image-based API
            const res = await fetch('https://rest.cifumo.biz.id/api/ai/gemini-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Parse the response
            const json = await res.json();
            if (!json.status) throw json.message || 'Terjadi kesalahan saat memproses gambar.';

            // Replace double asterisks with single asterisks in the result
            result = json.content.replace(/\*\*/g, '*');
        } else if (text) {
            // React with a clock emoji while processing
            await conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

            // Make a GET request to the text-based API
            const res = await fetch(`https://itzpire.com/ai/gemini-ai?q=${encodeURIComponent(text)}`);
            const json = await res.json();
            if (!json.status) throw json.message || 'Terjadi kesalahan saat memproses teks.';

            // Replace double asterisks with single asterisks in the result
            result = json.result.replace(/\*\*/g, '*');
        } else {
            throw 'Kirim teks atau gambar dengan pertanyaan.';
        }

        // React with a check emoji and send the result
        await conn.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
        await m.reply(result);
    } catch (e) {
        console.error(e);
        // React with a cross emoji and send an error message
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        await m.reply("Gagal memproses permintaan. Pastikan Anda mengirim teks atau gambar yang benar.");
    }
};

handler.help = ['asuna *<text> / <text + image>*'];
handler.tags = ['ai'];
handler.command = /^(asuna)$/i;
handler.limit = true;
handler.premium = true;

export default handler;