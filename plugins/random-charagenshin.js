/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch';

async function pinterest(query) {
    let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}%20Genshin%20Impact&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%20Genshin%20Impact%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    let json = await res.json();
    let data = json.resource_response.data.results;
    if (!data.length) throw `Query "${query}" not found :/`;
    return data[~~(Math.random() * data.length)].images.orig.url;
}

let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Nama Character!\n\nContoh :\n${usedPrefix + command} Hu Tao`)
    let { result, matchtype } = await (await fetch(`https://genshin-db-api.vercel.app/api/characters?query=${text}&matchCategories=true&dumpResult=true&queryLanguages=English&resultLanguage=Indonesian`)).json()
    if (matchtype == 'none') return m.reply(`Character "${text}" Tidak Ditemukan...`)
    let txt = `
❃ Name: ${result.fullname}
❃ Title: ${result.title}

❃ Desc: ${result.description}

❃ Element: ${result.element}
❃ Weapon Type: ${result.weapontype}
❃ Substat: ${result.substat}
❃ Gender: ${result.gender}
❃ Affiliation: ${result.affiliation}
❃ Birthday: ${result.birthday}
❃ Constellation: ${result.constellation}

❃ Cv:
• English ~ ${result.cv.english}
• Chinese ~ ${result.cv.chinese}
• Japanese ~ ${result.cv.japanese}
• Korean ~ ${result.cv.korean}
`.trim()

    try {
        // Fetching image from Pinterest
        let imageUrl = await pinterest(text);
        conn.sendFile(m.chat, imageUrl, null, txt, m);
    } catch (error) {
        console.error(error);
        m.reply('Error fetching image :/');
    }
}

handler.help = ['charagenshin']
handler.tags = ['random']
handler.limit = true
handler.command = /^(chara(gi|genshin)|genshin(chara|character))$/i

export default handler