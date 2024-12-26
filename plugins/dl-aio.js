import axios from 'axios';
import * as cheerio from 'cheerio';

const retatube = {
  getPrefix: async () => {
    try {
      const { data } = await axios.get('https://retatube.com/api/v1/aio/index?s=retatube.com', {
        headers: { 'User-Agent': 'Postify/1.0.0' },
      });
      const prefix = cheerio.load(data)('input[name="prefix"]').val();
      if (!prefix) throw new Error('Waduh, prefix nya kagak ada nih bree.. Input manual aja yak Prefix nya');
      return prefix;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  request: async (prefix, vidLink) => {
    try {
      const params = new URLSearchParams({ prefix, vid: vidLink }).toString();
      const { data } = await axios.post('https://retatube.com/api/v1/aio/search', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Postify/1.0.0',
        },
      });

      const extract = (regex) => (data.match(regex) || [])[1] || '';
      const fans = extract(/<p><strong>Fans：<\/strong>(\d+)/);
      const views = extract(/<p><strong>Views:：<\/strong>(\d+)/);
      const shares = extract(/<p><strong>Shares：<\/strong>(\d+)/);

      const $ = cheerio.load(data);
      const result = $('div.icon-box').map((_, element) => {
        const title = $(element).find('strong:contains("Title")').text().replace('Title：', '').trim();
        const owner = $(element).find('strong:contains("Owner")').parent().text().replace('Owner：', '').trim();
        const image = $(element).find('img').attr('src');

        const downloadLinks = $('a.button.primary.expand')
          .map((_, el) => {
            const link = $(el).attr('href');
            if (link === 'javascript:void(0);') return null;
            const text = $(el).find('span').text()
              .replace('Download', '').trim()
              .toLowerCase()
              .replace(/[]/g, '').replace(/\s+/g, '_')
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            return { title: text, link };
          })
          .get()
          .filter(Boolean);

        return { title, owner, fans, views, shares, image, downloadLinks };
      }).get();

      return result;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  scrape: async (vidLink) => {
    try {
      const prefix = await retatube.getPrefix();
      return await retatube.request(prefix, vidLink);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
};

const handler = async (m, { args }) => {
  if (!args[0]) return m.reply('Masukkan link video untuk diunduh.');
  
  try {
    const results = await retatube.scrape(args[0]);
    if (!results.length) return m.reply('Tidak ada data yang ditemukan dari link tersebut.');

    let response = '*Hasil Unduhan:*\n\n';
    results.forEach((result, index) => {
      response += `*${index + 1}. ${result.title}*\n`;
      response += `• Pemilik: ${result.owner || 'Tidak diketahui'}\n`;
      response += `• Fans: ${result.fans || '0'}\n`;
      response += `• Views: ${result.views || '0'}\n`;
      response += `• Shares: ${result.shares || '0'}\n`;
      response += `• Gambar: ${result.image || 'Tidak tersedia'}\n`;
      result.downloadLinks.forEach(link => {
        response += `  - ${link.title}: ${link.link}\n`;
      });
      response += '\n';
    });

    m.reply(response.trim());
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat memproses permintaan Anda. Coba lagi nanti.');
  }
};

handler.help = ['downloader'];
handler.tags = ['downloader'];
handler.command = /^(downloader|aio)$/i;

export default handler;