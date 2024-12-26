/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import cheerio from 'cheerio'
import axios from 'axios'

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw `Nyari Apa?`
    let res = await mangatoons(text)
    res = res.map((v) => `*Judul:* ${v.judul}\n*Genre:* ${v.genre}\n*Link:* ${v.link}\n*Thumbnail:* ${v.thumbnail}`).join`\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`
    conn.reply(m.chat, res, m)
}
handler.help = ['mangatoons']
handler.tags = ['anime']
handler.command = /^(mangatoons)$/i
handler.limit = true
handler.register = true

export default handler

function mangatoons(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://mangatoon.mobi/en/search?word=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#page-content > div.search-page > div > div.comics-result > div.recommended-wrap > div > div ').each(function(a, b) {
                    let result = {
                        status: 200,
                        author: author,
                        judul: $(b).find('> div.recommend-comics-title > span').text(),
                        genre: $(b).find('> div.comics-type > span').text().trim(),
                        link: 'https://mangatoon.mobi' + $(b).find('> a').attr('href'),
                        thumbnail: $(b).find('> a > div > img').attr('src')
                    }
                    hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}