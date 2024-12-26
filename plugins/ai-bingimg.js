import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { text }) => {
  if (!text) return m.reply('Silakan masukkan kata kunci pencarian gambar!');
  try {
    const images = await bingimg(text, 10); // Misalnya mengambil 10 gambar
    if (images.length === 0) return m.reply('Tidak ditemukan gambar untuk kata kunci tersebut.');

    let message = `Hasil pencarian gambar untuk: *${text}*\n\n`;
    images.forEach((imgUrl, index) => {
      message += `${index + 1}. ${imgUrl}\n`;
    });

    await m.reply(message);
  } catch (error) {
    console.error("Error:", error);
    m.reply('Terjadi kesalahan saat mencari gambar.');
  }
};

handler.help = ['bing-img']
handler.tags = ['ai']
handler.command = /^(bing-img)$/i;

export default handler;

// Fungsi scraper Bing Image
async function bingimg(keyword, numImages) {
  const images = [];
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(keyword)}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Pastikan selector CSS sesuai
    $('img.mimg').each((index, img) => {
      if (index >= numImages) return false; // Hentikan jika sudah mencapai jumlah yang diinginkan
      const imageUrl = $(img).attr('data-src') || $(img).attr('src');
      if (imageUrl) {
        images.push(imageUrl);
      }
    });

  } catch (error) {
    console.error("Error scraping images:", error);
  }

  return images;
}