import axios from 'axios';
import FormData from 'form-data';
import * as cheerio from 'cheerio';

const meki = ['Hyper-Surreal Escape', 'Neon Fauvism', 'Post-Analog Glitchscape', 'AI Dystopia', 'Vivid Pop Explosion'];

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Harap masukan prompt dan style!';

    const [prompt, style] = text.split('|').map(item => item.trim());
    if (!prompt || !style) throw 'Format salah! Contoh: `korean girl pink hair | Neon Fauvism`';

    if (!meki.includes(style)) {
        throw new Error(`Buta huruf kah? Style nya udah dicantumin, masih aja salah input... Pilih dari: ${meki.join(', ')} 🤣`);
    }

    const FluxImage = async (prompt, style) => {
        const url = 'https://devrel.app.n8n.cloud/form/flux';

        const formData = new FormData();
        formData.append('field-0', prompt);
        formData.append('field-1', style);

        const headers = {
            'Accept': '*/*',
            'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
            'User-Agent': 'Postify/1.0.0',
            ...formData.getHeaders()
        };

        try {
            const { data } = await axios.post(url, formData, { headers });
            
            const $ = cheerio.load(data);
            return {
                image: $('.image-container img').attr('src'),
                style: $('.style-text').text().replace('Style: ', ''),
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    await m.react('⌛'); // Loading reaction

    try {
        const result = await FluxImage(prompt, style);
        const messageOptions = {
            image: { url: result.image },
            caption: `🖼️ *Generated Image*\nStyle: ${result.style}`,
        };

        await conn.sendMessage(m.chat, messageOptions);
        m.reply('Pesan berhasil dikirim! ✅');
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
};

handler.help = ['flux <prompt> | <style>'];
handler.tags = ['ai'];
handler.command = /^(flux)$/i;

handler.premium = false

export default handler;