/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from "axios"
import cheerio from "cheerio"

let handler = async (m, {
    conn,
    command,
    args,
    text,
    usedPrefix
}) => {

    let input = `[!] *wrong input*
	• hd
	• audio
${usedPrefix + command} https://www.facebook.com/100010929794713/posts/1885825845125057/`
    if (!text) return m.reply(input)
    const {
        code,
        title,
        link,
        hd,
        audio
    } = await facebook(args[1] || args[0] || text);
    if (code !== 200) throw 'ups.. server down'
    await conn.sendMessage(m.chat, {
        react: {
            text: '🕑',
            key: m.key
        }
    })

    if (args[0] == 'hd') {
        await conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key
            }
        })
        await conn.sendMessage(m.chat, {
            video: {
                url: hd
            },
            caption: `乂 *F A C E B O O K*

${title}

*quality*: HD
*url*: ${args[1]}`
        }, {
            quoted: m
        })

    } else if (args[0] == 'audio') {
        await conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key
            }
        })

        await conn.sendMessage(m.chat, {
            audio: {
                url: audio
            },
            mimetype: 'audio/mpeg',
            ptt: false
        }, {
            quoted: m
        })

    } else await conn.sendMessage(m.chat, {
        video: {
            url: link
        },
        caption: `乂 *F A C E B O O K*

${title}

*url*: ${args[0]}`
    }, {
        quoted: m
    })


}
handler.help = ['audio', 'hd'].map(v => `faceebook2 ${v}`)
handler.tags = ['downloader']
handler.command = /^(facebook2|fbdl2|fb2|facebookdl2)$/i
handler.limit = true
handler.register = true

export default handler

async function facebook(url) {
    return new Promise((resolve, reject) => {
        axios.post('https://www.getfvid.com/downloader', new URLSearchParams(Object.entries({
            url: url
        })), {
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36"
            }
        }).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const res = {
                code: 200
            }
            res.title = $('div.download-links > div.card > div.row > div:nth-child(2) > div > h5 > a').text()
            res.hd = $('div.download-links > div.card > div.row > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href')
            res.link = $('div.download-links > div.card > div.row > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href')
            res.audio = $('div.download-links > div.card > div.row > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href')
            resolve(res)
        }).catch(err => reject({
            code: 503,
            status: false,
            result: err
        }))
    })
}