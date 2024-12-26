import fetch from 'node-fetch';
import crypto from "crypto";

let handler = async (m, {conn, text, usedPrefix, command}) => {
  let teks 
  if (m.quoted) {
  teks = m.quoted.text
  } else if (text) {
  teks = text
  } else return m.reply(usedPrefix+command+' siapa presiden Indonesia')
  const userId = crypto.randomUUID();
  
  try {
  await m.react('🔮')
  let Id = m.sender.split('@')[0]
  let result = await chat(Id, teks, userId)
  await conn.sendFile(m.chat, 'https://telegra.ph/file/ae2a44b5f0545c7ed4b65.jpg', '', "*Merry, the Assistant*:\n\n    "+result, m)
  await m.react('✨')
  } catch (e) {
  throw eror
  }
}
handler.help = ['blackbox']
handler.tags = ['ai']
handler.register = handler.limit = true 
handler.command = /^(b(lack)?b(ox)?)$/i
export default handler 
async function chat(Id, teks, userId) {
try {
let id = Id
let json = {
    "messages": [{
        "id": id,
        "content": teks,
        "role": "user"
    }],
    "id": id,
    "previewToken": null,
    "userId": userId,
    "codeModelMode": true,
    "agentMode": {
      "mode": true,
      "id": "tioYvlHC5x"
      },
    "trendingAgentMode": {},
    "isMicMode": false,
    "isChromeExt": false,
    "githubToken": null
}

let { data } = await axios.post('https://www.blackbox.ai/api/chat', json)
let result = data.replace(/\$\@\$\w+=\S+\$/g, '');
return result
} catch (e) {
return e
}
}