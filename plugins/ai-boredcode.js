import axios from "axios";

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {

    if (!text) throw 'masukan text';

    try {
        await m.reply(wait);
        let {
            output
        } = await html(text);
        await m.reply(output)
    } catch (e) {
        throw eror
    }

}
handler.help = handler.command = ['boredcode']
handler.tags = ['ai']

export default handler

async function html(prompt) {
    try {
        const {
            data
        } = await axios.post('https://boredhumans.com/apis/boredagi_api.php',
            `prompt=${prompt.replace(/\s+/g, "%2520")}&uid=lwle4nyomx5t0w6quo8&sesh_id=15f316ba-df35-4248-9a0c-38a25067fb64&get_tool=false&tool_num=27`, {
                headers: {
                    'User-Agent': 'Googlebot-News',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });

        return data
    } catch (e) {
        return e
    }
}