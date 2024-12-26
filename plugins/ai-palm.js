/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'
import fetch from "node-fetch";

const readmore = String.fromCharCode(8206).repeat(4001)
let handler = async (m, {
    args,
    text,
    conn,
    command,
    usedPrefix
}) => {
    try {
        if (!text) return conn.reply(m.chat, `masukkan pertanyaan`, m)
        conn.sendMessage(m.chat, {
            react: {
                text: '🕑',
                key: m.key
            }
        })
        let translit = await translate(`${text}`, 'en')
        const response = await axios.post('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDR-Vh4DcRCWg2MVgPmXSh-mBZKzO-DSJw', {
            prompt: {
                text: translit[0]
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response.data)
        if (!response) return conn.reply(m.chat, `terjadi kesalahan`, m)
        const result = response.data.candidates[0];
        let transl = await translate(`${result.output}`, 'id')
        let kamu = `*HASIL:* ${result.output}\n\n` + `*TERJEMAHAN:*${readmore} ${transl[0]}` + '\n\n'
        kamu += '[ *SafetyRatings* ]\n\n'
        result.safetyRatings.map((a) => {
            kamu += `*Kategori:* ${a.category}\n`
            kamu += `*Probabilitas:* ${a.probability}\n`

        })
        conn.sendMessage(m.chat, {
            text: kamu,
            contextInfo: {
                externalAdReply: {
                    title: 'PaLm - Ai',
                    body: null,
                    thumbnailUrl: 'https://iili.io/JTB66xV.jpg',
                    sourceUrl: sgc,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: m
        })
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, 'Maaf, saya tidak mengerti bahasa Anda' + e, m)

    }
}
handler.help = handler.command = ['palm']
handler.tags = ['ai', 'internet']
handler.premium = true

export default handler

async function translate(query = "", lang) {
	if (!query.trim()) return "";
	const url = new URL("https://translate.googleapis.com/translate_a/single");
	url.searchParams.append("client", "gtx");
	url.searchParams.append("sl", "auto");
	url.searchParams.append("dt", "t");
	url.searchParams.append("tl", lang);
	url.searchParams.append("q", query);

	try {
		const response = await fetch(url.href);
		const data = await response.json();
		if (data) {
			return [data[0].map((item) => item[0].trim()).join("\n"), data[2]];
		} else {
			return "";
		}
	} catch (err) {
		throw err;
	}
}