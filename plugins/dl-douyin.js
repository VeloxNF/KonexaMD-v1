import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {text, conn}) => {
if (!text) return m.reply('masukan url dari douyin');
try {
m.reply(wait)
let { media, status, slide } = await douyin(text);
if (status !== 200) throw 'ada kesalahan sistem';
let no = 1
if (slide) {
for (let res of media) {
conn.sendFile(m.chat, res, '', `Image - ${no++}`, m)
await conn.delay(500)
}
} else {
conn.sendFile(m.chat, media.mp4_hd, '', `\`Result from douyin: ${text}\``, m)
}

} catch (e) {
throw e
}
}
handler.help = handler.command = ['douyin']
handler.tags = ['downloader']
export default handler

async function douyin(url) {
  const config = {
    method: 'post',
    url: 'https://savetik.co/api/ajaxSearch',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest'
    },
    data: `q=${url}&lang=en`
  };

  try {
    const { data } = await axios(config);
    const $ = cheerio.load(data.data);
    let urls = [];
    let media;
    let result = {
     slide: false,
      status: 200,
      creator: 'tio',
      media: media
    };

    $('a:contains("Download Photo")').each((index, element) => {
      const url = $(element).attr('href');
      urls.push(url);
    });

    if (urls.length === 0) {
      media = {};
      media = {
        mp4_1: $('a:contains("Download MP4 [1]")').attr('href'),
        mp4_2: $('a:contains("Download MP4 [2]")').attr('href'),
        mp4_hd: $('a:contains("Download MP4 HD")').attr('href'),
        mp3: $('a:contains("Download MP3")').attr('href')
      };
     result.slide = false
      result.media = media;
    } else {
      result.slide = true
      result.media = urls;
    }

    return result;
  } catch (error) {
    console.error(error);
    return { status: 500, creator: 'tio', error: error.message };
  }
}