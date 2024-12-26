import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m) => {
    const gore = () => {
        return new Promise((resolve, reject) => {
            const page = Math.floor(Math.random() * 228);
            axios.get(`https://seegore.com/gore/page/${page}`)
                .then((res) => {
                    const $ = cheerio.load(res.data);
                    const link = [];
                    $('ul > li > article').each((a, b) => {
                        link.push({
                            title: $(b).find('div.content > header > h2').text(),
                            link: $(b).find('div.post-thumbnail > a').attr('href'),
                            thumb: $(b).find('div.post-thumbnail > a > div > img').attr('src'),
                            view: $(b).find('div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-views').text(),
                            vote: $(b).find('div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-votes').text(),
                            tag: $(b).find('div.content > header > div > div.bb-cat-links').text(),
                            comment: $(b).find('div.content > header > div > div.post-meta.bb-post-meta > a').text()
                        });
                    });
                    const random = link[Math.floor(Math.random() * link.length)];
                    axios.get(random.link)
                        .then((resu) => {
                            const $$ = cheerio.load(resu.data);
                            const hasel = {
                                title: random.title,
                                source: random.link,
                                thumb: random.thumb,
                                tag: $$('div.site-main > div > header > div > div > p').text(),
                                upload: $$('div.site-main').find('span.auth-posted-on > time:nth-child(2)').text(),
                                author: $$('div.site-main').find('span.auth-name.mf-hide > a').text(),
                                comment: random.comment,
                                vote: random.vote,
                                view: $$('div.site-main').find('span.post-meta-item.post-views.s-post-views.size-lg > span.count').text(),
                                video1: $$('div.site-main').find('video > source').attr('src'),
                                video2: $$('div.site-main').find('video > a').attr('href')
                            };
                            resolve(hasel);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    };

    try {
        const letme = await gore();
        const hiy = `[ *RANDOM GORE* ]

Title: ${letme.title}
Source: ${letme.source}
Tag: ${letme.tag}
Upload: ${letme.upload}
Author: ${letme.author}
Comment: ${letme.comment}
Vote: ${letme.vote}
Views: ${letme.view}
`;
        await conn.sendMessage(m.chat, { video: { url: letme.video1 }, caption: hiy }, { quoted: m });
    } catch (error) {
        console.error(error);
        m.reply("Something went wrong. Please try again.");
    }
};

handler.command = handler.help = ['randomgore'];
handler.tags = ['fun'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
handler.register = true;

export default handler;