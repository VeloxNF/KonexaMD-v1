import axios from 'axios';

const handler = async (m, { conn }) => {
  try {
    conn.sendMessage(m.chat, { text: 'Mengambil video, harap tunggu...' }, { quoted: m });
    
    const apiResponse = await axios.get('https://widipe.com/asupandouyin/');
    const videoUrl = apiResponse.data.url;

    if (!videoUrl) {
      return conn.sendMessage(m.chat, { text: 'Gagal mendapatkan video!' }, { quoted: m });
    }

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      gifPlayback: false,
      caption: 'Donee Desuu~'
    }, { quoted: m });

  } catch (error) {
    conn.sendMessage(m.chat, { text: `⚠️ Error: ${error.message || 'Terjadi kesalahan saat mengambil video.'}` }, { quoted: m });
  }
};

handler.help = ['asupandouyin'];
handler.tags = ['intetnet'];
handler.command = /^asupandouyin$/i;

export default handler;