import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = ` 📚 _وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_\n_wa\'alaikumussalam wa\'rahmatullahi wa\'barakatuh_\n
*The person who greets with this salutation will receive 30 rewards. Then, the person in front of them or who hears the greeting responds with the same phrase, 'and peace be upon you and the mercy and blessings of Allah' or can add other words (wariidhwaana). This means that in addition to the prayer for safety, one also asks for Allah's blessings."\n\n Terjemahan:\n "Orang yang mengucapkan salam seperti ini maka ia mendapatkan 30 pahala, kemudian, orang yang dihadapan atau mendengarnya membalas dengan kalimat yang sama yaitu “Wa'alaikum salam warahmatullahi wabarakatuh” atau ditambah dengan yang lain (waridhwaana). Artinya selain daripada do'a selamat juga meminta pada Allah SWT"* `
await conn.reply(m.chat, info, m)
return conn.sendMessage(m.chat, {
          react: {
            text: '🤝🏼',
            key: m.key,
          }})
}
handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i
handler.command = new RegExp

export default handler