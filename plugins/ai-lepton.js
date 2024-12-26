import axios from "axios";

let handler = async (m, {
    conn,
    text,
    command
}) => {
    if (m.quoted) {
        text = m.quoted.text
    } else if (text) {
        text = text
    } else return m.reply('masukan pertanyaan')

    try {
        await m.reply(wait)
        let result = await leptonAi(text);
        await m.reply(result);

    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['leptonai']
handler.tags = ['ai']
handler.limit = true

export default handler

function generateRandomID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomID = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomID += characters.charAt(randomIndex);
    }
    return randomID;
}

const apii = await axios.create({
    baseURL: 'https://search.lepton.run/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

async function leptonAi(query) {
    try {
        const rid = generateRandomID(10);
        const postData = {
            query,
            rid
        };
        const response = await apii.post('query', postData);

        const llmResponseRegex = /__LLM_RESPONSE__([\s\S]*?)__RELATED_QUESTIONS__/;
        const llmResponseMatch = response.data.match(llmResponseRegex);

        if (llmResponseMatch && llmResponseMatch[1]) {
            let llmResponse = llmResponseMatch[1].trim();
            llmResponse = llmResponse.replace(/__LLM_RESPONSE__|__RELATED_QUESTIONS__/g, '').trim();
            return llmResponse;
        } else {
            throw new Error("No LLM response found.");
        }
    } catch (error) {
        throw new Error('Error fetching LLM response: ' + error.message);
    }
}