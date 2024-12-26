import axios from "axios";

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {

    if (!text) throw 'masukan prompt';

    try {
        await m.reply(wait);
        let result = await logo(text);
        await conn.sendFile(m.chat, result, '', `*\`${text}\`*`, m);
    } catch (e) {
        throw eror
    }

}
handler.help = handler.command = ['ailogo']
handler.tags = ['ai']

export default handler

async function logo(prompt) {
    try {
        const {
            data
        } = await axios.post('https://boredhumans.com/apis/boredagi_api.php',
            `prompt=${prompt.replace(/\s+/g, "%2520")}&uid=lwle4nyomx5t0w6quo8&sesh_id=6a55e5df-19f2-4043-b295-a8955f9d528c&get_tool=false&tool_num=44`, {
                headers: {
                    'User-Agent': 'Googlebot-News',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        const url = data.output.match(/src="([^"]+)"/)[1]
        return url
    } catch (e) {
        return e
    }
}