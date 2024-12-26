/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch';
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if(!text) throw "masukan teksnya"
    try {
    let hasilResponse = await fetch(`https://api.neoxr.eu/api/naruto?text=${text}&apikey=wslBro`);
    const hasil = await hasilResponse.json();
    await conn.sendFile(m.chat, hasil.data.url, 'image.jpg', '', m)
    } catch (e) {
        throw "gagal membuat image"
        }
}
handler.help = ['logonaruto']
handler.tags = ['maker']
handler.command = /^(logonaruto|lgnaruto)$/i
handler.limit = true;

export default handler