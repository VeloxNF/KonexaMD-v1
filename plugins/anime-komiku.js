import axios from "axios";
import cheerio from "cheerio";
import PDFDocument from "pdfkit";
import fs from "fs";

const handler = async (m, { conn, text, usedPrefix: pref, command }) => {
    const komik = new Komiku();
    const input = text.split("#");
    
    switch (input[0]) {
        case "search":
            if (!input[1]) return m.reply("Masukkan judul komik");
            
            try {
                await m.reply("Tunggu sebentar...");
                const searchResults = await komik.search(input[1]);
                let caption = `Komiku Search\n\nGunakan \n- .komiku chapter#url\n- .komiku detail#url\n\n`;

                searchResults.forEach((result, index) => {
                    caption += `${index + 1}. ${result.title}\n${result.url}\n\n`;
                });

                await m.reply(caption);
            } catch (error) {
                console.error("Error during search:", error);
                throw error;
            }
            break;

        case "chapter":
            if (!input[1]) return m.reply("Masukkan URL komiku.id");
            
            try {
                await m.reply("Tunggu sebentar...");
                const chapters = await komik.getChapter(input[1]);
                let caption = `Komiku Chapter\n\nGunakan .komiku pdf/url\n\n`;

                chapters.forEach((chapter, index) => {
                    caption += `${index + 1}. ${chapter}\n`;
                });

                await m.reply(caption);
            } catch (error) {
                console.error("Error fetching chapter:", error);
                throw error;
            }
            break;

        case "detail":
            if (!input[1]) return m.reply("Masukkan URL komiku.id");
            
            try {
                await m.reply("Tunggu sebentar...");
                const detailData = await komik.detail(input[1]);
                const detailCaption = generateCaption(detailData);

                await conn.sendMessage(
                    m.chat, 
                    {
                        image: { url: detailData.thumbnail },
                        caption: detailCaption
                    }, 
                    { quoted: m }
                );
            } catch (error) {
                console.error("Error fetching detail:", error);
                throw error;
            }
            break;

        case "pdf":
            if (!input[1]) return m.reply("Masukkan URL dari komiku.id");
            
            try {
                await m.reply("Tunggu sebentar...");
                const pdfId = `${random(11)}.pdf`;
                const outputPath = `tmp/${pdfId}`;
                const pdfOutput = await komik.createPdf(input[1], outputPath);

                const splitUrl = input[1].replace("https://komiku.id", "https://komiku.id/manga").split("-chapter")[0];
                const { thumbnail: image, details } = await komik.detail(splitUrl);

                await conn.sendMessage(
                    m.chat, 
                    {
                        document: fs.readFileSync(outputPath),
                        fileName: details["Judul Komik"],
                        caption: details["Judul Komik"],
                        mimetype: 'application/pdf',
                        jpegThumbnail: await conn.resize((await conn.getFile(image)).data, 180, 72)
                    }, 
                    { quoted: m }
                );
            } catch (error) {
                console.error("Error generating PDF:", error);
                throw error;
            }
            break;

        default:
            return m.reply(`Pilih Opsi:\n- search\n- chapter\n- detail\n- pdf`);
    }
};
handler.help = handler.command = ["komiku"]
handler.tags = ["internet"]
handler.limit = true

export default handler;

function random(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

function generateCaption(data) {
    const { description, thumbnail, details, tags } = data;

    let caption = `${description}\n\n`;
    caption += `📚 *Judul Komik:* ${details['Judul Komik']}\n`;
    caption += `🇮🇩 *Judul Indonesia:* ${details['Judul Indonesia']}\n`;
    caption += `📖 *Jenis Komik:* ${details['Jenis Komik']}\n`;
    caption += `✨ *Konsep Cerita:* ${details['Konsep Cerita']}\n`;
    caption += `✍️ *Pengarang:* ${details['Pengarang']}\n`;
    caption += `📅 *Status:* ${details['Status']}\n`;
    caption += `🔞 *Umur Pembaca:* ${details['Umur Pembaca']}\n`;
    caption += `👉 *Cara Baca:* ${details['Cara Baca']}\n\n`;
    caption += `🏷️ *Tags:* ${tags.join(', ')}\n\n`;

    return caption;
}
const IP = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

class Komiku {
    constructor() {}

    async search(query) {
        try {
            const data = (await axios.get(`https://api.komiku.id/?post_type=manga&s=${encodeURIComponent(query)}`, {
                headers: {
                    'x-forwarded-for': await IP()
                }
            })).data;
            const $ = cheerio.load(data);
            const results = [];

            $('a').each((i, element) => {
                const title = $(element).attr('title');
                const href = $(element).attr('href');

                if (title && href) {
                    results.push({
                        title: title.trim(),
                        url: `https://komiku.id/manga${href.trim().split("-chapter")[0]}`
                    });
                }
            });

            return results;
        } catch (error) {
            console.error("Error during search:", error);
            return { msg: "Terjadi kesalahan", desc: error };
        }
    }

    async getChapter(url) {
        try {
            if (!/https:\/\/komiku\.id\/manga\/[a-z\-0-9]+/.test(url)) {
                return 'Link bukan dari komiku.id';
            }

            const data = (await axios.get(url, {
                headers: {
                    'x-forwarded-for': await IP()
                }
            })).data;
            const $ = cheerio.load(data);
            const urls = [];

            $('#Daftar_Chapter .judulseries a').each((index, element) => {
                urls.push(`https://komiku.id${$(element).attr('href')}`);
            });

            return urls;
        } catch (error) {
            console.error("Error fetching chapter:", error);
            return { msg: 'Error fetching data', desc: error };
        }
    }

    async generatePDF(imageUrls, thumbnailUrl, outputFilename) {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(outputFilename));

        if (thumbnailUrl) {
            try {
                const response = await axios.get(thumbnailUrl, {
                    responseType: 'arraybuffer',
                    headers: {
                        'x-forwarded-for': await IP()
                    }
                });
                doc.addPage().image(Buffer.from(response.data), {
                    fit: [500, 700],
                    align: 'center',
                    valign: 'center'
                });
            } catch (error) {
                console.error('Error adding thumbnail:', error);
            }
        }

        for (const imgUrl of imageUrls) {
            try {
                const response = await axios.get(imgUrl, {
                    responseType: 'arraybuffer',
                    headers: {
                        'x-forwarded-for': await IP()
                    }
                });
                doc.addPage().image(Buffer.from(response.data), {
                    fit: [500, 700],
                    align: 'center',
                    valign: 'center'
                });
            } catch (error) {
                console.error('Error adding image:', error);
                throw error;
            }
        }

        doc.end();
    }

    async getUrl(url) {
        try {
            const data = (await axios.get(url, {
                headers: {
                    'x-forwarded-for': await IP()
                }
            })).data;
            const $ = cheerio.load(data);
            const splitUrl = url.replace("https://komiku.id", "https://komiku.id/manga").split("-chapter")[0];
            const data2 = (await axios.get(splitUrl, {
                headers: {
                    'x-forwarded-for': await IP()
                }
            })).data;
            const $$ = cheerio.load(data2);
            const thumbnail = $$('.ims img').attr('src');
            const imageUrls = [];

            $('#Baca_Komik img').each((index, element) => {
                imageUrls.push($(element).attr('src'));
            });

            return {
                imageUrls,
                thumbnail
            };
        } catch (error) {
            console.error('Error fetching image URLs:', error);
            return [];
        }
    }

    async createPdf(url, outputFilename = "komiku.pdf") {
        try {
            if (!/https:\/\/komiku\.id\/[a-z\-0-9]+/.test(url)) {
                return 'Link bukan dari komiku.id';
            }

            const { imageUrls, thumbnail } = await this.getUrl(url);

            if (imageUrls.length > 0) {
                await this.generatePDF(imageUrls, thumbnail, outputFilename);
                return outputFilename;
            } else {
                console.log('Tidak ada URL gambar yang ditemukan.');
                return { msg: 'Tidak ada URL gambar yang ditemukan.' };
            }
        } catch (error) {
            console.error('Error creating PDF:', error);
            throw error;
        }
    }

    async detail(url) {
        try {
            const data = (await axios.get(url, {
                headers: {
                    'x-forwarded-for': await IP()
                }
            })).data;
            const $ = cheerio.load(data);
            const description = $('p[itemprop="description"]').text().trim();
            const thumbnail = $('section#Informasi img[itemprop="image"]').attr('src');
            const details = {};

            $('table.inftable tbody tr').each((index, element) => {
                const key = $(element).find('td').first().text().trim();
                const value = $(element).find('td').last().text().trim();
                details[key] = value;
            });

            const tags = [];
            $('ul.genre li.genre span[itemprop="genre"]').each((index, element) => {
                tags.push($(element).text().trim());
            });

            return {
                description,
                thumbnail,
                details,
                tags
            };
        } catch (e) {
            console.error('Error creating detail:', e);
            throw e;
        }
    }
}