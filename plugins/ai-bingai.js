import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  text = m.quoted && m.quoted.text ? m.quoted.text : text;
  if (!text) throw `Gunakan format:\n${usedPrefix + command} <pertanyaan>\n\nContoh:\n${usedPrefix + command} siapa presiden Indonesia?\n\natau kalian reply teks!`;

  try {
    let url = `https://loco.web.id/wp-content/uploads/api/v1/bingai.php?q=${encodeURIComponent(text)}`;
    let response = await fetch(url);
    if (!response.ok) throw 'gagal menghubungi API. Silakan coba lagi nanti.';

    let json = await response.json();
    if (!json.status || !json.result || !json.result.ai_response) {
      throw 'Maaf, tidak ada hasil yang relevan untuk pertanyaan Anda.';
    }

    let aiResponse = json.result.ai_response.trim();
    let searchResults = json.result.search_results || [];
    let firstResult = searchResults[0]; 

    let searchSummary = '';
    if (firstResult) {
      searchSummary = `**Hasil Pencarian:**\n[Link](${firstResult.url})`;
    } else {
      searchSummary = '';
    }

    let resultMessage = `*${aiResponse}\n\n${searchSummary}`;
    m.reply(resultMessage);
  } catch (err) {
    console.error(err);
    m.reply('Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.');
  }
};

handler.help = ['bingai <pertanyaan>'];
handler.tags = ['internet'];
handler.command = /^bingai$/i;

export default handler;