import fetch from 'node-fetch';
import crypto from "crypto";
import {
    FormData,
    Blob
} from 'formdata-node';
import {
    fileTypeFromBuffer
} from 'file-type';
import base64 from 'base64-js';

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
  let media = await m.quoted.download()
  let Id = m.sender.split('@')[0]
  let bs64 = await base64.fromByteArray(media)
  let img = await buffimg(media, userId, teks)
  let result = await chat(Id, img, bs64, userId)
  await conn.sendFile(m.chat, 'https://telegra.ph/file/ae2a44b5f0545c7ed4b65.jpg', '', result, m)
  await m.react('✨')
  } catch (e) {
  throw eror
  }
}
handler.help = ['blackbox']
handler.tags = ['ai']
handler.register = handler.limit = true 
handler.command = /^(b(lack)?b(ox)?img|image)$/i
export default handler 

async function chat(Id, teks, base64, userId) {
try {
let id = Id, text = teks
let json = {
    "messages": [{
        "id": id,
        "content": text,
        "role": "user",
        "data": {
            "imageBase64": "data:image/jpeg;base64,"+base64,
            "fileText": text
        }
    }],
    "id": id,
    "previewToken": null,
    "userId": userId,
    "codeModelMode": true,
    "agentMode": {
        "mode": true,
        "id": "tioYvlHC5x",
        "name": "tio"
    },
    "trendingAgentMode": {},
    "isMicMode": false,
    "isChromeExt": false,
    "githubToken": null
}
let { data } = await axios.post('https://www.blackbox.ai/api/chat', json)
return data 
} catch (e) {
return e
}
}

async function buffimg(imageBuffer, userId, input) {
        try {
            const {
                ext,
                mime
            } = (await fileTypeFromBuffer(imageBuffer)) || {};
            if (!ext || !mime) return null;
            const form = new FormData();
            const blob = new Blob([imageBuffer], {
                type: mime
            });
            form.append('image', blob, 'image.' + ext);
            form.append('fileName', 'image.' + ext);
            form.append('userId', userId);
            const response = await fetch("https://www.blackbox.ai/api/upload", {
                method: 'POST',
                body: form,
            });
            const datas = await response.json();
            const result = datas.response + "\n#\n" + input
            return result
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }