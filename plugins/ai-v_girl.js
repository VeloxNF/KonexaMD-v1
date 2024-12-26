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
        let prompt = 'Tio is a beginner WhatsApp bot maker ', name = 'tio'
        let {
            output
        } = await v_girl(text, prompt, name);
        await m.reply(output[0]);
    } catch (e) {
        throw eror
    }

}
handler.help = handler.command = ['v_girl']
handler.tags = ['ai']

export default handler

async function v_girl(text,prompt, name) {
try {
const response = await axios.post('https://boredhumans.com/virtual_girlfriends/virtual_girlfriends_api.php',
      `prompt=${text.replace(/\s+/g, "%2520")}&chat_id=lwle4nyomx5t0w6quo8&init_prompt=${prompt.replace(/\s+/g, "%2520")}&voice_id=XrExE9yKIg1WjnnlVkGX&stability=0.5&similarity_boost=0.75&name=${name.replace(/\s+/g, "%2520")}&useAudio=false&dateLoc=Bookstore`,
      {
        headers: {
          'User-Agent': 'Googlebot-News',
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    return response.data
    } catch (e) {
    return e
    }
    }