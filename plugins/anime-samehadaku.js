import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {
    text,
    conn,
    command,
    usedPrefix
}) => {

text = text.split("|");

switch (text[0]) {
case "video":
if (!text[1]) return m.reply('masukan url')
try {
const video = await getVideo(text[1]);
let vid = `video samehadaku\n\n`.toUpperCase();
for (let res of video) {
    vid += `Name: ${res.name}\n`
    vid += `Url: ${res.url}\n\n`
}
await m.reply(vid)
} catch (e) {
throw eror
}
break 
case 'detail':
try {
if (!text[1]) return m.reply('masukan url')
const { title, rating, description, image, genres, details } = await getDetail(text[1]);
let det = `*${title}*\n\n`;
det += `Japanese: ${details.japanese}\n`;
det += `English: ${details.english}\n`;
det += `Status: ${details.status}\n`;
det += `Type: ${details.type}\n`;
det += `Source: ${details.source}\n`;
det += `Duration: ${details.duration}\n`;
det += `Season: ${details.season}\n`;
det += `Total: ${details.total}\n`;
det += `Studio: ${details.studio}\n`;
det += `Producers: ${details.producers}\n`;
det += `Released: ${details.released}\n`;
det += `Rating: ${rating}\n`;
det += `Genres:\n- ${genres.join('\n- ')}\n\n`;
det += `${description}`;
      
await conn.sendFile(m.chat, image, '', det, m)
} catch (e) {
throw eror
}
break 
case 'episode':
if (!text[1]) return m.reply("masukan url")
try {
const episode = await getEpisode(text[1]);
let eps = `Episode\n\n`.toUpperCase();
for (let res of episode) {
    eps += `Title: ${res.title}\n`
    eps += `Url: ${res.url}\n\n`
}
await m.reply(eps)
} catch (e) {
throw eror
}
break 
default:
    if (!text[0]) return m.reply(usedPrefix + command + " naruto")

    try {
        await m.reply(wait);
        let result = await animeSearch(text[0]);

        let cap = `*samehadaku*\n\n`.toUpperCase()
         cap += `- episode (dapatkan semua episode)\n- video (dapatkan link video)\n- detail (mendapatkan detail)\n\n`
            let no = 1;
        for (let anim of result) {
            cap += `${no++}. ${anim.title}\n`
            cap += `Genre: ${anim.data.genre}\n`
            cap += `Type: ${anim.data.type}\n`
            cap += `Score: ${anim.data.score}\n`
            cap += `${anim.url}\n\n`
        }
        await m.reply(cap)

    } catch (e) {
        throw eror
    }
    
  }
}
handler.help = handler.command = ["samehadaku"]
handler.tags = ["anime", "internet"]

export default handler

async function getUrl(post, num) {
  try {
    const response = await axios.post('https://samehadaku.email/wp-admin/admin-ajax.php', 
      `action=player_ajax&post=${post}&nume=${num}&type=schtml`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://samehadaku.email/naruto-kecil-episode-220/'
      }
    });

    const $ = cheerio.load(response.data);
    const videoUrl = $('iframe').attr('src');

    return videoUrl;
  } catch (error) {
    console.error('Error fetching video URL:', error);
    return null;
  }
}

async function getVideo(url) {
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    let results = [];

    const elements = $('div.east_player_option');
    let num = 1;

    for (let element of elements) {
      const name = $(element).find('span').text().trim();
      const dataPost = $(element).attr('data-post');
      
      const videoUrl = await getUrl(parseInt(dataPost, 10), `${num++}`);

      results.push({
        name,
        url: videoUrl
      });
    }

    return results;
  } catch (e) {
    return { msg: e.message };
  }
}

async function getEpisode(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const episodes = [];

    $('.lstepsiode.listeps ul li').each((index, element) => {
      const episodeUrl = $(element).find('a').attr('href');
      const episodeTitle = $(element).find('a').text().trim();

      if (episodeUrl && episodeTitle) {
        episodes.push({
          title: episodeTitle,
          url: episodeUrl,
        });
      }
    });

    return episodes;
  } catch (error) {
    console.error('Error fetching the page:', error);
  }
}


async function animeSearch(text) {
    const {
        data
    } = await axios.get('https://samehadaku.email');
    const $ = cheerio.load(data);
    const scriptContent = $('#live_search-js-extra').html();
    const nonceMatch = scriptContent.match(/"nonce":"([^"]+)"/);
    const nonce = nonceMatch ? nonceMatch[1] : null;

    try {
        let {
            data: result
        } = await axios.get(`https://samehadaku.email/wp-json/eastheme/search/?keyword=${text}&nonce=${nonce}`)
        let objek = Object.values(result).map(v => v)
        return objek
    } catch (e) {
        return {
            msg: e
        }
    }
}

async function getDetail(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const animeDetails = {};

        animeDetails.title = $('h1.entry-title[itemprop="name"]').text().trim();

        animeDetails.image = $('.thumb img.anmsa').attr('src');

        animeDetails.rating = $('.rating-area .rtg span[itemprop="ratingValue"]').text().trim();

        animeDetails.description = $('.desc .entry-content[itemprop="description"]').text().trim();

        animeDetails.genres = [];
        $('.genre-info a[itemprop="genre"]').each((i, el) => {
            animeDetails.genres.push($(el).text().trim());
        });

        animeDetails.details = {};
        $('.anim-senct .anime.infoanime .spe span').each((i, el) => {
            const detail = $(el).text().trim().split(' ');
            const key = detail.shift().replace(':', '').toLowerCase();
            animeDetails.details[key] = detail.join(' ').trim();
        });

        return animeDetails;
    } catch (error) {
        console.error('Error fetching anime details:', error);
        throw error;
    }
}