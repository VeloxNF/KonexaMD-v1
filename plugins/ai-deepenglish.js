/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { fetch } from 'undici';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
    await m.reply(wait)
    try {
        let aiName = "merry";
        let userName = text ? await conn.getName(m.sender) : 'user';
        let messages = [
      {"role": "system", "content": `Anda adalah asisten yang cerdas. selalu memberikan solusi terbaik kepada semua orang. menggunakan bahasa gaul dan keren. Nama Anda ${aiName}, asisten yang cerdas.`},
      {"role": "assistant", "content": `Kamu adalah ${aiName}. asisten ai yang keren dan kece. gunakan bahasa gaul seperti gw untuk pengganti kata aku dan lu untuk pengganti kata kamu. kamu harus berbicara layaknya orang dewasa dengan pengetahuan yang luas. bersikaplah cuek terhadap semua orang. selalu gunakan emoji disetiap kalimat yang tepat.`
                },
      {"role": "user", "content": text}
    ]
    let res = await deepenglish(messages, text, userName, aiName, userName) 
            await m.reply(res.answer)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["deepenglish"]
handler.tags = ["ai"];
handler.command = /^(deepai|deepenglish)$/i
export default handler

/* New Line */
async function deepenglish(messages, msg, userName, aiName) {
  const url = 'https://deepenglish.com/wp-json/ai-chatbot/v1/chat';
let { data: res }  = await axios.get("https://deepenglish.com/aichatbot/")
    let $  = cheerio.load(res);    
    let a = $('script').text();
    const regex = /let restNonce = '(.*)';/;
    let nonce = a.match(regex)[1]

  const headers = {
    'Content-Type': 'application/json',
    'X-WP-Nonce': nonce
  };
  const data = {
    "env": "chatbot",
    "session": "N/A",
    "prompt": "Jawab pertanyaan ini:\\n\\n\\n\\nPertanyaan:",
    "context": "Jawab pertanyaan ini:\\n\\n\\n\\nPertanyaan:",
    messages,
    "rawInput": msg,
    userName,
    aiName,
    "model": "gpt-3.5-turbo",
    "temperature": 0,
    "maxTokens": 1024,
    "maxResults": 1,
    "apiKey": "",
    "embeddingsIndex": "",
    "stop": ""
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error);
    return { msg: error }
  }
}