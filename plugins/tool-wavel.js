import axios from "axios";
import cheerio from "cheerio";
import qs from "qs";

let handler = async (m, {text, command, conn}) => {
    text = text.split("|");
    if (!text[0]) throw "masukan teks";
    let bahasa = text[1] || "indonesian";
    let model = text[2] || 5;
    
    try {
    await m.reply(wait)
    
    let availableModels = await getModelIdVoice();
    let availableLanguages = await getLanguage();

    if (text[1] && !availableLanguages[bahasa]) {
    let cap = '', no = 1
for (let [language, code] of Object.entries(availableLanguages)) {
  cap += `${language}: "${code}"\n`;
}
        return m.reply(`Bahasa tidak tersedia. Daftar bahasa: \n\n${cap}`);
    }
    
    if (text[2] && !availableModels[model]) {
    let no = 1
        return m.reply(`Model tidak tersedia. Daftar model: \n\n${availableModels.map(v => `${no++}. ${v}`).join("\n")}\n\nGunakan: nomor untuk memilih`);
    }
    let inputBahasa = availableLanguages[bahasa];
    let inputModel = availableModels[model];
    let result = await getAudio(inputBahasa, text[0], inputModel);
    
    await conn.sendMessage(m.chat, {audio: result, mimetype: "audio/mpeg", ptt: true}, {quoted: m})
    
    } catch (e) {
    throw eror
    }
}
handler.help = handler.command = ["wavel"]
handler.tags = ["tools"]
export default handler

/**
@credit Tio
@text to speech
**/

async function getAudio(lang, text, voiceId) {
    const url = 'https://wavel.ai/wp-json/myplugin/v1/tts';
    const data = {
        lang: lang,
        text: text,
        voiceId: voiceId
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest'
    };

    try {
        let response = await axios.post(url, qs.stringify(data), { headers: headers });
        let { base64Audio } = response.data;
        let result = Buffer.from(('data:audio/mpeg;base64,' + base64Audio).split(',')[1], 'base64');

        // audio buffer langsung aja :v
        return result;
    } catch (error) {
        console.error("Error fetching audio:", error);
        throw error;
    }
}

async function getModelIdVoice() {
    try {
        let response = await axios.get('https://wavel.ai/solutions/text-to-speech/anime-text-to-speech');
        let $ = cheerio.load(response.data);
        const options = $('#dropdown option');
        let modelIds = [];

        options.each((index, element) => {
            const idValue = $(element).attr('value');
            modelIds.push(idValue);
        });
        return modelIds;
    } catch (error) {
        console.error("Error fetching model IDs:", error);
        throw error;
    }
}

async function getLanguage() {
    try {
        let response = await axios.get('https://wavel.ai/solutions/text-to-speech/anime-text-to-speech');
        let $ = cheerio.load(response.data);
        let bahasa = {};

    $('.button-languagues').each((index, element) => {
  const lang = $(element).data('lang');
  const id = $(element).attr('id');
  bahasa[id] = lang;
    });
    return bahasa
    } catch (error) {
        console.error("Error fetching Language:", error);
        throw error;
    }
}
