import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, usedPrefix: text, command }) => {
  if (!m.body) {
    return m.reply("Tidak ada input.");
  }

  const query = m.body.slice(10).trim();
  if (!query) {
    return m.reply("Judulnya???");
  }

  const results = await avz(query);
  if (results.length === 0) {
    return m.reply("Tidak ditemukan Result-nya: " + query);
  }

  let message = `Hasil pencarian untuk: *${query}*\n\n`;
  results.forEach((result) => {
    message += `• Title: ${result.title}\n`;
    message += `• Rating: ${result.rating || 'Tidak tersedia'}\n`;
    message += `• Category: ${result.categories.join(', ') || 'Tidak tersedia'}\n`;
    message += `• Url: ${result.movieUrl}\n`;
    message += `• Image Url: ${result.imageUrl}\n\n`;
  });

  m.reply(message);
};

handler.command = /^movie$/i;
handler.tags = ['internet'];
handler.help = ['movie'];

export default handler;

async function avz(query) {
  try {
    const url = `https://meta.dutamovie21.cloud/?s=${encodeURIComponent(query)}&post_type%5B%5D=post&post_type%5B%5D=tv`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const results = [];

    $('.gmr-box-content.gmr-box-archive').each((index, element) => {
      const title = $(element).find('.entry-title a').text().trim();
      const movieUrl = $(element).find('.entry-title a').attr('href');
      const imageUrl = $(element).find('.content-thumbnail img').attr('src');
      const rating = $(element).find('.gmr-rating-item').text().trim();

      const categories = [];
      $(element).find('.gmr-movie-on a').each((i, el) => {
        categories.push($(el).text().trim());
      });

      results.push({
        title,
        movieUrl,
        imageUrl,
        rating,
        categories
      });
    });

    return results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}