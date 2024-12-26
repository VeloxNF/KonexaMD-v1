/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!/audio/.test(mime)) throw '🐱 Please reply to an audio message';
  
  let audioData = await q.download();
  let base64Data = audioData.toString('base64');
  
  try {
    let response = await axios.post('https://vocaroo.com/media/upload', {
      file: `data:${mime};base64,${base64Data}`
    });
    
    let mediaId = response.data && response.data.id;
    if (!mediaId) throw '🐱 Failed to upload to Vocaroo';
    
    let url = `https://vocaroo.com/${mediaId}`;
    conn.reply(m.chat, url, m);
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, '🐱 Failed to upload to Vocaroo', m);
  }
};

handler.command = /^vocaroo$/i;
handler.tags = ['tools'];
handler.help = ['vocaroo'];
handler.group = false;
handler.limit = true;

export default handler;