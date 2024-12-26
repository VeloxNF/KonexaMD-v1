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

        let {
            output
        } = await dytopia(text);
        await m.reply(output);
    } catch (e) {
        throw eror
    }

}
handler.help = handler.command = ['dytopia']
handler.tags = ['ai']

export default handler

async function dytopia(query) {
    try {
    let text = query.replace(/\s+/g, "%2520");
        const response = await axios.post('https://boredhumans.com/apis/boredagi_api.php',
            `prompt=${text}&uid=lwle4nyomx5t0w6quo8&sesh_id=multistep-82cb1e26-d257-4dd0-b34b-1d35af1c712d&get_tool=false&tool_num=23`, {
                headers: {
                    'User-Agent': 'Googlebot-News',
                }
            });
        return response.data
    } catch (e) {
        return e
    }
}