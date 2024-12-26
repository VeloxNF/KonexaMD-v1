/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import Jimp from "jimp";
import uploadImage from '../lib/uploadImage.js'
import axios from 'axios'
import fs from "fs"
import { animeFilter } from '../scraper/animeFilter.js'


async function ToZombi(imageBuffer) {
    try {
        const { ext, mime } = await fileTypeFromBuffer(imageBuffer) || {};
        if (!ext || !mime) {
            return null;
        }
        let form = new FormData();
        const blob = new Blob([imageBuffer.toArrayBuffer()], { type: mime });
        form.append('image', blob, 'image.' + ext);

        const response = await fetch("https://deepgrave-image-processor-no7pxf7mmq-uc.a.run.app/transform_in_place", {
            method: 'POST',
            body: form,
        });

        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }

        const base64Data = await response.text();
        
        // Convert base64 to image buffer and return it
        return Buffer.from(base64Data, 'base64');
    } catch (error) {
        return null;
    }
}


let handler = async (m, { conn, usedPrefix, text, args,command }) => {
    let mime_ = `Kirim/Reply Gambar Dengan Caption ${usedPrefix + command}`
    
	let q = m.quoted ? m.quoted : m;
	  let mime = (q.msg || q).mimetype || ''
	  if (!mime) throw mime_
	let media = await q.download()
	
    let url = await uploadImage(media)
    
    const react = {react: {text: "⏳", key: m.key}}
    
    async function reload () {
	conn.sendMessage(m.chat, react)
		}
    const reactdone = {react: {text: "✔️", key: m.key}}
    
    async function done () {
	conn.sendMessage(m.chat, reactdone)
		}
		
	switch (command) {
case 'aifilter': case 'filteranime':

if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;

reload()
let cap = '*Result from* : ' + usedPrefix + command
animeFilter(media).then(res => {
const buff = Buffer.from(res[0].split(",")[1], "base64")
conn.sendMessage(m.chat, { image: buff , caption: cap}, {quoted: m})
}).catch(e => {
m.reply('error')
})

done()

break 
case 'jadizombie': case 'makezombie':
if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;

reload()
let cep = '*Result from* : ' + usedPrefix + command
const result = await ToZombi(media);
    
    if (!result) {
        throw 'Terjadi kesalahan saat mengonversi gambar ke zombie.';
    }
    
    
    return conn.sendMessage(m.chat, {
        image: result,
        caption: cep,
        mentions: [m.sender]
    }, {
        quoted: m
    })
done()

break 
};
}
handler.tags = ["process"];
handler.limit = true;
handler.register = true

handler.command = handler.help = ["aifilter","filteranime","makezombie","jadizombie"];

export default handler;