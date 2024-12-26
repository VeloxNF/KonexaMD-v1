/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .avachat hello")
await m.reply(wait)
try {
// Contoh penggunaan
let result = await avaChat(text)
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["avachat"]
handler.tags = ["ai"]
handler.command = /^(avachat)$/i
handler.limit = true
export default handler

/* New Line */
async function avaChat(message) {
  const apiUrl = 'https://ava-alpha-api.codelink.io/api/chat';
  const headers = {
    'Content-Type': 'application/json',
  };

  const payload = {
    messages: [{ content: message, role: 'user' }]
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const inputString = await response.text();
  const regex = /"content":"([^"]*)"/g;
  let match;
  let result = "";

  while ((match = regex.exec(inputString))) {
    result += match[1];
  }

  return result.replace(/\\n/g, '\n');
}