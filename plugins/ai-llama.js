import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    return m.reply("Input teksnya?");
  }

  try {
    // Mengirim permintaan ke API
    const response = await fetch(`https://restapii.rioooxdzz.web.id/api/llama?message=${encodeURIComponent(text)}`);

    if (!response.ok) {
      return m.reply("Gagal mengakses API, coba lagi nanti.");
    }

    const result = await response.json();
    
    // Cek apakah respons API valid
    if (result.data && result.data.response) {
      return m.reply(result.data.response);
    } else {
      return m.reply("Tidak ada respons dari API.");
    }

  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
    return m.reply("Terjadi kesalahan. Silakan coba lagi.");
  }
};

handler.help = ['llama <pertanyaan>'];
handler.tags = ['ai'];
handler.command = /^(llama)$/i;

export default handler;