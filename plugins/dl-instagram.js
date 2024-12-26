import { igdl } from 'btch-downloader';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text.includes('instagram.com')) {
    return m.reply('Mau yang mana?\n.igdl <link> video\n.igdl <link> foto');
  }

  try {
    const result = await igdl(text);

    if (args[1] === 'video') {
      // Send the video without watermark
      await conn.sendMessage(m.chat, { video: { url: result[0].url }, caption: 'Done video download' }, { quoted: m });
      // Send the audio (if needed)
      await conn.sendMessage(m.chat, { audio: { url: result[0].url }, mimetype: 'audio/mpeg' }, { quoted: m });
    } else if (args[1] === 'foto') {
      const slide = result;
      const slide2 = slide.map(z => z.url);

      // Send the first image
      await conn.sendMessage(m.chat, { image: { url: slide[0].url }, caption: 'Done photo download' }, { quoted: m });

      // Send the remaining images
      for (let i of slide2) {
        await conn.sendMessage(m.chat, { image: { url: i }, caption: '' }, { quoted: m });
      }
    }
  } catch (err) {
    m.reply('Maaf, error kak');
  }
};

// Add handler metadata
handler.help = ["instagram"];
handler.tags = ["downloader"];
handler.command = /^(insta(gram)?|ig(dl)?)$/i;
handler.limit = true;

export default handler;