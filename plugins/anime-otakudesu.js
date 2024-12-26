import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { text, conn, command, usedPrefix }) => {
    let otakudesu = new Otakudesu();

    text = text.split("|");

    switch (text[0].trim()) {
        case "video":
            if (!text[1]) return m.reply('Masukkan URL');
            try {
                const video = await otakudesu.video(text[1].trim());
                let vid = `Video Otakudesu\n\n`.toUpperCase();
                for (let res of video) {
                    vid += `Resolution: ${res.resolution}\n`;
                    vid += `Url: ${res.url}\n\n`;
                }
                await m.reply(vid);
            } catch (e) {
                console.error(e);
                await m.reply('Terjadi kesalahan saat mengambil data video.');
            }
            break;
            
        case 'detail':
            if (!text[1]) return m.reply('Masukkan URL');
            try {
                const { thumbnail, description, synopsis } = await otakudesu.detail(text[1].trim());
                let det = `*Detail Anime*\n\n`;
                for (let res of description) {
                    det += `${res}\n`;
                }
                det += `\nSypnosis: ${synopsis}`;
                await conn.sendFile(m.chat, thumbnail, '', det, m);
            } catch (e) {
                console.error(e);
                await m.reply('Terjadi kesalahan saat mengambil detail anime.');
            }
            break;
            
        case 'episode':
            if (!text[1]) return m.reply("Masukkan URL");
            try {
                const episode = await otakudesu.episode(text[1].trim());
                let eps = `Episode\n\n`.toUpperCase();
                for (let res of episode) {
                    eps += `Title: ${res.title}\n`;
                    eps += `Url: ${res.url}\n\n`;
                }
                await m.reply(eps);
            } catch (e) {
                console.error(e);
                await m.reply('Terjadi kesalahan saat mengambil episode.');
            }
            break;
            
        default:
            if (!text[0]) return m.reply(`${usedPrefix}${command} naruto`);
            try {
                await m.reply('Mohon tunggu...');
                let result = await otakudesu.search(text[0].trim());
                let cap = `*Otakudesu*\n\n`.toUpperCase();
                cap += `- episode (dapatkan semua episode)\n- video (dapatkan link video)\n- detail (mendapatkan detail)\n\n`;
                let no = 1;
                for (let anim of result) {
                    cap += `${no++}. ${anim.title}\n`;
                    cap += `Genre: ${anim.genres.join(', ')}\n`;
                    cap += `Status: ${anim.status}\n`;
                    cap += `Rating: ${anim.rating}\n`;
                    cap += `${anim.url}\n\n`;
                }
                await m.reply(cap);
            } catch (e) {
                console.error(e);
                await m.reply('Terjadi kesalahan saat mencari anime.');
            }
    }
}

handler.help = handler.command = ["otakudesu"];
handler.tags = ["anime", "internet"];

export default handler;

class Otakudesu {
    constructor() {
        this.base = 'https://otakudesu.cloud';
    }

    async search(query) {
        try {
            const { data: html } = await axios.get(`${this.base}/?s=${query}&post_type=anime`);
            const $ = cheerio.load(html);

            const animeData = [];

            $('.chivsrc li').each(function () {
                const title = $(this).find('h2 a').text().trim();
                const url = $(this).find('h2 a').attr('href').trim();
                const genres = [];

                $(this).find('.set').eq(0).find('a').each(function () {
                    genres.push($(this).text().trim());
                });

                const status = $(this).find('.set').eq(1).text().replace('Status :', '').trim();
                const rating = $(this).find('.set').eq(2).text().replace('Rating :', '').trim();

                animeData.push({
                    title,
                    url,
                    genres,
                    status,
                    rating,
                });
            });

            return animeData;
        } catch (error) {
            console.error('Error fetching anime data:', error);
            return [];
        }
    }

    async detail(url) {
        try {
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);

            const thumbnail = $('.fotoanime img').attr('src');
            const description = [];
            
            $('.infozingle p').each((i, el) => {
                description.push($(el).text().trim());
            });

            const synopsis = $('.sinopc p').text().trim();

            return {
                thumbnail,
                description,
                synopsis,
            };
        } catch (error) {
            console.error('Error fetching anime details:', error);
            return {};
        }
    }

    async episode(url) {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            let episodes = [];

            $('.episodelist ul li').each((index, element) => {
                const title = $(element).find('a').text().trim();
                const url = $(element).find('a').attr('href'); 
                episodes.push({ title, url });
            });

            return episodes;
        } catch (error) {
            console.error('Error fetching episodes:', error);
            return [];
        }
    }

    async video(url) {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            let videos = [];
            $('.download').each(function () {
                $(this).find('ul li').each(function () {
                    let resolution = $(this).find('strong').text().trim();
                    let megaLink = $(this).find('a:contains("Mega")').attr('href');

                    if (megaLink) {
                        videos.push({
                            resolution,
                            url: megaLink,
                        });
                    }
                });
            });

            return videos;
        } catch (error) {
            console.error(`Error fetching video data from ${url}:`, error);
            throw error;
        }
    }
}