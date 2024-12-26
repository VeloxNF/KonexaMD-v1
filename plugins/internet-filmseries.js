import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    text,
    command
}) => {
    if (!text) throw 'masukan query';

    try {
m.reply(wait)
        let {
            result
        } = await film(text);
        let cap = `\`Search from: ${text}\`\n\n`
        for (let res of result) {
            cap += `*Title*: ${res.title}\n`
            cap += `*Link*: ${res.link}\n`
            cap += `*Genre*: ${res.relTag.map(v => v).join(', ')}\n\n`
        }
m.reply(cap)
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['filmseries']
handler.tags = ['internet']

export default handler

async function film(q) {

try {
let { data } = await axios.get('https://series.ruangmoviez.my.id/?s=' + q);
let $ = cheerio.load(data)
const movies = [];

$('article.item-infinite').each((index, element) => {
  const movie = {};
  movie.link = $(element).find('a[itemprop="url"]').attr('href');
  movie.title = $(element).find('h2.entry-title a').text();
  movie.relTag = $(element).find('a[rel="tag"]').map((i, el) => $(el).text()).get();
  movies.push(movie);
});
return {
result: movies
}
} catch (e) {
throw {msg: e}
}
}