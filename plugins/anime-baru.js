import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {
    conn
}) => {

    try {
        let anime = await animeBaru();

        let cap = `*Anime Baru*\n\n`.toUpperCase(), no = 1;
        for (let anim of anime) {
            cap += `${no++}. Title: ${anim.title}\n`
            cap += `Author: ${anim.author}\n`
            cap += `Date: ${anim.date}\n`
            cap += `${anim.link}\n\n`
        }

        await m.reply(cap);

    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ["animebaru"]
handler.tags = ["internet"]

export default handler

/**
@credit Tio 
@samehadaku
**/

async function animeBaru() {
    try {
        let {
            data
        } = await axios.get('https://samehadaku.email/anime-terbaru/');
        let $ = cheerio.load(data);
        const posts = [];

        $('.post-show li').each((index, element) => {
            const title = $(element).find('.entry-title a').attr('title');
            const link = $(element).find('.entry-title a').attr('href');
            const author = $(element).find('[itemprop="author"] author').text();
            const date = $(element).find('.dashicons-calendar').parent().text().replace('Released on:', '').trim();

            posts.push({
                title,
                author,
                date,
                link
            });
        });

        return posts;
    } catch (error) {
        console.error(error);
        return [];
    }
}