import { wiki } from "vtuber-wiki.js"; // Adjust the import based on your project structure
import uploadImage from '../lib/uploadImage.js';

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Harap masukan text!';

    async function getVTuber(vtuber) {
        try {
            const result = await wiki(vtuber);
            if (!result.image_url) return { error: "No such vTuber" };
            return result;
        } catch (err) {
            return { error: "No such vTuber" };
        }
    }

    await m.react('⌛'); // Loading reaction

    let tuber = await getVTuber(text);
    if (tuber.error) throw tuber.error;

    let pituber = `[ *VTUBER WIKI* 🌟]

🌐 Judul: ${tuber.title}
🔗 Link: ${tuber.url}
✍️ Author: ${tuber.author}
🆔 Account: ${tuber.account}
📅 Date: ${tuber.date}
🏷️ Type: ${tuber.type}
📺 Channel: ${tuber.channel}
🌐 Social Media: ${tuber.social_media}
🌍 Official Website: ${tuber.official_website}
🚻 Gender: ${tuber.gender}
🎂 Age: ${tuber.age}
📝 Description: ${tuber.description}
➕ More: ${tuber.more}
`;

    let messageOptions = { text: pituber };

    if (tuber.image_url) {
        let imageResponse = await uploadImage(tuber.image_url); // Assuming uploadImage can handle URLs
        messageOptions = {
            image: { url: imageResponse },
            caption: pituber,
        };
    }

    await conn.sendMessage(m.chat, messageOptions);
    m.reply('Pesan berhasil dikirim! ✅');
};

handler.help = ['vtuber <nama>'];
handler.tags = ['internet'];
handler.command = /^(vtuber)$/i;

export default handler;