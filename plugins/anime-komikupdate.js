import axios from 'axios';
import cheerio from 'cheerio';
import schedule from 'node-schedule';

let komikuUpdate = null;

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (text === 'on') {
    if (komikuUpdate !== null) {
      komikuUpdate.cancel();
    }
    komikuUpdate = schedule.scheduleJob('0 * * * *', async function () {
      const { data } = await axios.get('https://api.komiku.id/manga/?orderby=date');
        const $ = cheerio.load(data);

        const comics = [];
        $('.bge').each((i, element) => {
            const comic = {};
            const $element = $(element);
            comic.url = $element.find('.bgei a').attr('href');
            comic.title = $element.find('.kan h3').text().trim();
            comic.release = $element.find('.judul2').text().trim();
            comic.description = $element.find('p').text().trim();
            comics.push(comic);
        });
      conn.reply(
        m.chat,
        `*Komiku UPDATE*\n\nJudul : ${comics[0].title}\nRilis : ${comics[0].release}\nDescription : ${comics[0].description}\nUrl: ${comics[0].url}`,
      );
    });
    conn.reply(m.chat, 'Komiku update sudah diaktifkan', m);
    global.db.data.chats[m.chat].komikuUpdate = true;
  } else if (text === 'off') {
    if (komikuUpdate !== null) {
      komikuUpdate.cancel();
      komikuUpdate = null;
    }
    conn.reply(m.chat, 'Komiku update sudah dimatikan', m);
    global.db.data.chats[m.chat].komikuUpdate = false;
  } else {
    conn.reply(m.chat, 'Pilihan tidak valid. Harap masukkan \'on\' atau \'off\'', m);
  }
};

handler.help = ['komikuupdate on/off'];
handler.tags = ['anime'];
handler.command = /^(komikuupdate)$/i;

export default handler;