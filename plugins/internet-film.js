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
handler.help = handler.command = ['film']
handler.tags = ['internet']

export default handler

async function film(query) {
    try {
        let {
            data
        } = await axios.get('https://ruangmoviez.my.id/?s=' + query);
        let $ = cheerio.load(data)
        const movies = [];

        $('article.item-infinite').each((index, element) => {
            const movie = {};
            movie.link = $(element).find('a[itemprop="url"]').attr('href');
            movie.title = $(element).find('h2.entry-title a').text();
            movie.relTag = $(element).find('a[rel="category tag"]').map((i, el) => $(el).text()).get();
            movies.push(movie);
        });
        return {
            status: 200,
            creator: 'tio',
            result: movies
        }
    } catch (e) {
        return {
            status: 404,
            msg: e
        }
    }
}