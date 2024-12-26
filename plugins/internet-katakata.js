import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, {conn, text}) => {
if (!text) throw 'input judul kata-kata nya'
try {
const kata = await katakata(text);
let result = `✨ *Kata-Kata*\n\> ${kata.getRandom().quotes}\n  [ *${kata.getRandom().author}* ]`
await m.reply(result)
} catch (e) {
throw eror
}
}
handler.help = handler.command = ['katakata','kata-kata']
handler.tags = ['internet']
export default handler

async function katakata(nama) {
    let zaenishi = await axios.get(`https://www.goodreads.com/quotes/search?q=${nama}`);
    let $ = cheerio.load(zaenishi.data);
    let hasil = [];

    $('.quoteText').each((index, element) => {
      let selectedQuote = $(element).clone()
        .children()
        .remove()
        .end()
        .text()
        .replace(/\s+/g, ' ')
        .replace(/―/g, '')
        .trim();

      let selectedAuthor = $(element).find('.authorOrTitle').text().trim();
      let formattedAuthor = selectedAuthor.replace(/\s+/g, ' ').trim();

      hasil.push({
        quotes: selectedQuote,
        author: formattedAuthor
      });
    });

    return hasil;
  }