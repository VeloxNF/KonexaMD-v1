import { lyrics } from "@bochilteam/scraper";
import fetch from "node-fetch";
import Genius from "genius-lyrics";
import axios from "axios";
import cheerio from "cheerio";

async function handler(m, { conn, args, usedPrefix, command }) {
  let text;
  if (args.length >= 1) {
    text = args.join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else throw "Masukkan judul musik!\n*Example:* .lirik hello";

  let key = "h6fTn1BYNjYi5VTszhyAFTcM3WWtk2E4hqrXCcutfObE4jVFnJ3LVyewHKIYTli7";
  let Client = new Genius.Client(key);
  let song = await Client.songs.search(text);
  let nothing = "Tidak diketahui!";

  try {
    let bocil = await lyrics(text);
    let bocap = `*乂 Judul*
${bocil.title ? bocil.title : nothing}

*乂 Lirik*
${bocil.lyrics ? bocil.lyrics : nothing}

*乂 Penyanyi*
${bocil.author ? bocil.author : nothing}

*乂 Url*
${bocil.link ? bocil.link : nothing}

_By Axeey_
`;
    await conn.reply(m.chat, bocap, m, {
      contextInfo: {
        externalAdReply: {
          mediaType: 1,
          title: 'AXELLDX',
          thumbnailUrl: 'https://telegra.ph/file/45012244d1de3dee46c47.jpg',
          renderLargerThumbnail: true,
          sourceUrl: ''
        }
      }
    });
  } catch (e) {
    try {
      let jenius = await song[0];
      let albert = `*乂 Judul*
${jenius.title ? jenius.title : nothing}

*乂 Lirik*
${await getLyrics(jenius.url)}

*乂 Penyanyi*
${(await jenius.artist).name ? (await jenius.artist).name : nothing}

*乂 Url*
${jenius.url ? jenius.url : nothing}

_By Axeey_
`;
      await conn.reply(m.chat, albert, m, {
        contextInfo: {
          externalAdReply: {
            mediaType: 1,
            title: 'AXELLDX',
            thumbnailUrl: 'https://telegra.ph/file/45012244d1de3dee46c47.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
          }
        }
      });
    } catch (e) {
      try {
        const { data } = await axios.get(
          "https://www.lyricsfreak.com/search.php?a=search&q=" + text
        );
        let $ = cheerio.load(data);
        let h1 = $(".song");
        const hh = h1.attr("href");
        const huu = await axios.get("https://www.lyricsfreak.com" + hh);
        let s = cheerio.load(huu.data);
        let h2 = s(".lyrictxt").text();
        let frank = `*乂 Lirik*\n${h2}\n\n_By lyricsfreak_`;
        await m.reply(frank);
      } catch (e) {
        throw e;
      }
    }
  }
}

handler.help = ["lirik"].map(v => v + " <judul>");
handler.tags = ["internet"];
handler.command = /^l(irik(musik)?|yrics?)$/i;

export default handler;

async function getLyrics(url) {
  const response = await fetch("https://files.xianqiao.wang/" + url);
  const html = await response.text();
  const $ = cheerio.load(html);
  let lyrics = "";
  $('div[class^="Lyrics__Container"]').each((i, elem) => {
    if ($(elem).text().length !== 0) {
      const snippet = $(elem)
        .html()
        .replace(/<br>/g, "\n")
        .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");

      lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
    }
  });
  return lyrics;
}