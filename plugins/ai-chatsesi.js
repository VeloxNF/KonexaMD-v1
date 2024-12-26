import axios from "axios";
import { fetch } from "undici"

let handler = async (m, { conn, text }) => {
  conn.akira = conn.akira ? conn.akira : {};

  if (!text) throw `*• Example:* .chatsesi *[on/off]*`;

  if (text == "on") {
    conn.akira[m.sender] = {
      pesan: [],
    };
    m.reply("[ ✓ ] Success create session chat");
  } else if (text == "off") {
    delete conn.akira[m.sender];
    m.reply("[ ✓ ] Success delete session chat");
  }
};

handler.before = async (m, { conn }) => {
  conn.akira = conn.akira ? conn.akira : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;
  if (!conn.akira[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  )
    return;

  if (conn.akira[m.sender] && m.text) {
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
    try {
let aiName = "merry";
let userName = m.text ? await conn.getName(m.sender) : 'user';
let messages = [
      ...conn.akira[m.sender].pesan,
      {"role": "system", "content": `Anda adalah asisten yang cerdas. selalu memberikan solusi terbaik kepada semua orang. menggunakan bahasa gaul dan keren. Nama Anda ${aiName}, asisten yang cerdas.`},
      {"role": "assistant", "content": `Kamu adalah ${aiName}. asisten ai yang keren dan kece. gunakan bahasa gaul seperti gw untuk pengganti kata aku dan lu untuk pengganti kata kamu. kamu harus berbicara layaknya orang dewasa dengan pengetahuan yang luas. bersikaplah cuek terhadap semua orang. selalu gunakan emoji disetiap kalimat yang tepat.`
                },
      {"role": "user", "content": m.text}
    ]
    let res = await deepenglish(messages, m.text, userName, aiName, userName)
      await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });
      m.reply(res.answer);
      conn.akira[m.sender].pesan = messages;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
};

handler.command = ["chatsesi"];
handler.tags = ["ai"];
handler.help = ["chatsesi"].map((a) => a + " *[on/off]*");

export default handler
    
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