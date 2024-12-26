/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, {
    text,
    usedPrefix,
    command
}) => {
    let input = `[ x ] invalid

use: */snackvideo https://s.snackvideo.com/p/5Wog7jg1*`
    if (!text) return m.reply(input)
    try {
        m.reply(wait)
        const {
            status,
            thumbnail,
            no_wm
        } = await snack(text);
        if (status !== 200) throw 'ups.. web sedang down'
        conn.sendFile(m.chat, no_wm || emror, '', text, m)
    } catch (e) {
        throw eror
    }

}
handler.help = ['snackvideo']
handler.tags = ['downloader']
handler.command = /^(snack(video|dl|download)?)$/i
handler.register = handler.limit = true

export default handler

function snack(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.post("https://getsnackvideo.com/results", new URLSearchParams({
                id: url
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
            });
            const $ = cheerio.load(data);
            const result = {
                status: 200,
                thumbnail: $('.img_thumb img').attr('src'),
                no_wm: $('a.download_link.without_watermark').attr('href')
            };
            console.log(result);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}