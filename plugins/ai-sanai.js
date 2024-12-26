import axios from 'axios';

const sanai = {
  create: async (
    prompt = "Daffa",
    weight = 1024,
    height = 1792, // Ubah ukuran ke portrait
    guiscale = 5,
    paguiscale = 2,
    nis = 18,
    step = 20,
    sid = -1
  ) => {
    const url = 'https://api.freesana.ai/v1/images/generate';

    const headers = {
      'authority': 'api.freesana.ai',
      'origin': 'https://freesana.ai',
      'referer': 'https://freesana.ai/',
      'user-agent': 'Postify/1.0.0',
    };

    const data = {
      prompt: prompt,
      model: "sana_1_6b",
      width: weight,
      height: height,
      guidance_scale: guiscale,
      pag_guidance_scale: paguiscale,
      num_inference_steps: nis,
      steps: step,
      seed: sid,
    };

    try {
      const response = await axios.post(url, data, { headers });
      const { id, status, result, processingTime, width, height, nsfw, seed } = response.data;
      return {
        id,
        status,
        result,
        processingTime,
        width,
        height,
        nsfw,
        seed,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  text = m.quoted && m.quoted.text ? m.quoted.text : text;
  if (!text) {
    return m.reply(`Contoh penggunaan:\n${usedPrefix + command} <deskripsi gambar>\n\nMisal:\n${usedPrefix + command} "gunung di pagi hari"`);
  }

  m.reply('⏳ Sedang membuat gambar, mohon tunggu sebentar...');

  try {
    const response = await sanai.create(text);

    if (response && response.result) {
      const imageUrl = response.result;
      await conn.sendFile(m.chat, imageUrl, 'generated-image.jpg', `✅ Gambar berhasil dibuat!\n\n• Prompt: *${text}*\n• Resolusi: ${response.width}x${response.height}\n• Waktu proses: ${response.processingTime} detik`, m);
    } else {
      m.reply('❌ Gagal membuat gambar. Silakan coba lagi.');
    }
  } catch (error) {
    console.error(error);
    m.reply('❌ Terjadi kesalahan saat membuat gambar. Silakan coba lagi nanti.');
  }
};

handler.help = ['sanai <deskripsi>'];
handler.tags = ['tools'];
handler.command = /^(sanai)$/i;

export default handler;