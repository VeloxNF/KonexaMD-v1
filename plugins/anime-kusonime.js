import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
  try {
    if (!text) {
      return m.reply('Masukan anime yang ingin dicari!!\nContoh: .kusonime naruto');
    }
    
    await m.react('⏳'); // Loading reaction
    m.reply('Mengambil data, harap tunggu...');

    const data = await scrapKusonime(text);
    const caption = `KUSONIME 🦊
📺 *Title* : ${data.title}
👀 *Views* : ${data.view}
📚 *Type* : ${data.type}
📅 *Season* : ${data.season}
✅ *Status* : ${data.status_anime}
🎭 *Genre* : ${data.genre}
🎬 *Eps* : ${data.total_episode}
🏭 *Produser* : ${data.producers}
⏰ *Durasi* : ${data.duration}
⭐ *Score* : ${data.score}
📆 *Rilis* : ${data.released}
📝 *Sinopsis* : ${data.description}`;

    await conn.sendMessage(m.chat, { image: { url: data.thumb }, caption }, { quoted: m });
  } catch (e) {
    m.reply("Pencarian gagal.");
  }
};

handler.command = handler.help = ['kusonime'];
handler.tags = ['anime'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
handler.register = true;

async function scrapKusonime(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://kusonime.com/?s=${query}&post_type=post`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const links = [];

        $('div.content > h2 > a').each((_, element) => {
          links.push($(element).attr("href"));
        });

        axios.get(links[0]).then(({ data }) => {
          const $$ = cheerio.load(data);
          const title = $$('.post-thumb > h1').text();
          const thumb = $$('.post-thumb > img').attr("src");
          const views = $$('.info > p:nth-child(1)').text().split(":")[1].trim();
          const type = $$('.info > p:nth-child(2)').text().split(":")[1].trim();
          const season = $$('.info > p:nth-child(3)').text().split(":")[1].trim();
          const statusAnime = $$('.info > p:nth-child(4)').text().split(":")[1].trim();
          const genre = $$('.info > p:nth-child(5)').text().split(":")[1].trim();
          const totalEpisode = $$('.info > p:nth-child(6)').text().split(":")[1].trim();
          const producers = $$('.info > p:nth-child(7)').text().split(":")[1].trim();
          const duration = $$('.info > p:nth-child(8)').text().split(":")[1].trim();
          const score = $$('.info > p:nth-child(9)').text().split(":")[1].trim();
          const released = $$('.info > p:nth-child(10)').text().split(":")[1].trim();
          const description = $$('.lexot > p:nth-child(3)').text();

          resolve({
            status: true,
            title,
            view: views,
            thumb,
            genre,
            season,
            producers,
            type,
            status_anime: statusAnime,
            total_episode: totalEpisode,
            score,
            duration,
            released,
            description
          });
        });
      })
      .catch(reject);
  });
}

export default handler;