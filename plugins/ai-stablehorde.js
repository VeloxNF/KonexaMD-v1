import { getStatusModels, generateImage } from '../scraper/stablehorde.js';

const handler = async (m, { conn, args }) => {
  const input = args.join(' ');
  if (!input) {
    return conn.reply(m.chat, `
❌ Mohon berikan efek yang diinginkan dan pesanan.
Contoh: *stablehorde efek|objek1|objek2*`, m);
  }

  conn.reply(m.chat, '⌛ Sedang memproses permintaan...', m);

  const [order, ...objects] = input.split('|');
  if (!order) {
    const searchResults = await getStatusModels();
    const itemsList = searchResults.map((result, i) => `${i + 1}. ${result.name} (${((result.performance / Math.max(...searchResults.map(item => item.performance))) * 100).toFixed(2)}%)`).join('\n');
    return conn.reply(m.chat, `
❌ Mohon berikan nomor urutan yang valid.
Pilihan yang tersedia:
${itemsList}
Contoh: *stablehorde 1|objek1|objek2*`, m);
  }

  const searchResults = await getStatusModels();
  if (isNaN(order) || order <= 0 || order > searchResults.length) {
    const itemsList = searchResults.map((result, i) => `${i + 1}. ${result.name} (${((result.performance / Math.max(...searchResults.map(item => item.performance))) * 100).toFixed(2)}%)`).join('\n');
    return conn.reply(m.chat, `
❌ Format urutan tidak valid atau urutan di luar jangkauan. Mohon berikan urutan yang valid.
Pilihan yang tersedia:
${itemsList}
Contoh: *stablehorde 1|objek1|objek2*`, m);
  }

  const selectedResult = searchResults[order - 1];
  const stablehordeResult = await generateImage(selectedResult.name, objects);
  const tag = `@${m.sender.split('@')[0]}`;

  if (stablehordeResult) {
    conn.reply(m.chat, '✅ Sukses! Mengirimkan hasil...', m);
    await conn.sendMessage(m.chat, {
      image: { url: stablehordeResult },
      caption: `Inilah efek *${selectedResult.name}*\nDipesan oleh: ${tag}`,
      mentions: [m.sender]
    }, { quoted: m });
  } else {
    conn.reply(m.chat, '❌ Maaf, terjadi kesalahan saat menghasilkan gambar. Silakan coba lagi nanti.', m);
  }
};

handler.help = ['stablehorde <efek> <teks>'];
handler.tags = ["diffusions"];
handler.command = /^(stablehorde)$/i;
handler.register = true
handler.limit = true
export default handler;