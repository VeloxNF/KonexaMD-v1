import fetch from "node-fetch";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    text
}) => {
    if (m.quoted) {
        text = m.quoted.text
    } else if (text) {
        text = text
    }  else throw 'reply/ketik pertanyaan';

    try {
        m.react('✨')
        let res = await bardaifree(text);
        await m.reply(res)
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['bardaifree']
handler.tags = ['ai']
export default handler

async function bardaifree(message) {
    const url = 'https://bardaifree.com';
    const formData = new FormData();

    try {
        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);

        const chatData = $('.wpaicg-chat-shortcode').map((index, element) => {
            return Object.fromEntries(Object.entries(element.attribs));
        }).get();

        formData.append('_wpnonce', chatData[0]['data-nonce']);
        formData.append('post_id', chatData[0]['data-post-id']);
        formData.append('action', 'wpaicg_chatbox_message');
        formData.append('message', message);

        const response = await fetch('https://bardaifree.com/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Network response was not ok');

        let resultan = await response.json();
        return resultan.data
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}