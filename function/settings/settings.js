import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

/*
Setting
*/
global.setting = {
 clearSesi: true, // pembersih sampah sessions 
 clearTmp: true, // pembersih sampah tmp
 addReply: true, // buat with thumbnail di pesan
 idgc: '120363297666271660@g.us' // id gc buat join only
 }

global.info = {
 nomerbot : '6287823867494',
 pairingNumber : '6287823867494',
 figlet: 'KONEXA', // buat tampilan konsole start
 nomorwa : '6282351108031',
 nameown : 'ItzFinnity',
 nomerown : '6282351108031',
 packname : 'sticker by ',
 author : 'KONEXA',
 namebot : 'KonexaMD',
 wm : 'Copyright © 2024 KonexaMDp.',
 stickpack : 'Whatsapp',
 stickauth : 'Bot - MD',
 jid: '@s.whatsapp.net'
}

// Thumbnail 
global.media = {
 ppKosong : 'https://i.ibb.co/3Fh9V6p/avatar-contact.png',
 didyou : 'https://telegra.ph/file/fdc1a8b08fe63520f4339.jpg',
 rulesBot : 'https://telegra.ph/file/21d9a1795a38347f3131c.jpg',
 thumbnail : 'https://telegra.ph/file/21d9a1795a38347f3131c.jpg',
 thumb : 'https://telegra.ph/file/89f925eaab0ab2d0f001a.jpg',
 logo : 'https://telegra.ph/file/a884cf2b8471f174e1a1a.jpg',
 unReg : 'https://telegra.ph/file/ef02d1fdd59082d05f08d.jpg',
 registrasi : 'https://telegra.ph/file/0169f000c9ddc7c3315ff.jpg',
 confess : 'https://telegra.ph/file/03cabea082a122abfa5be.jpg',
 access : 'https://telegra.ph/file/b42a0dc1f57d23ee14a03.jpg',
 tqto : 'https://telegra.ph/file/b42a0dc1f57d23ee14a03.jpg',
 spotify : 'https://telegra.ph/file/b42a0dc1f57d23ee14a03.jpg',
 weather : 'https://telegra.ph/file/5b35ba4babe5e31595516.jpg',
 gempaUrl : 'https://telegra.ph/file/03e70dd45a9dc628d84c9.jpg',
 akses : 'https://telegra.ph/file/b42a0dc1f57d23ee14a03.jpg',
 wel : 'https://telegra.ph/file/9dbc9c39084df8691ebdd.mp4',
 good : 'https://telegra.ph/file/1c05b8c019fa525567d01.mp4',
 sound: 'https://pomf2.lain.la/f/ymca9u8.opus'
}
// Sosmed
global.url = {
 sig: 'https://whatsapp.com/channel/0029VaNR2B6BadmioY6mar3N',
 sgh:  'https://whatsapp.com/channel/0029VaNR2B6BadmioY6mar3N',
 sgc: 'https://chat.whatsapp.com/Fg17qkyJ5rWAtE5hlR5F0w'
}
// Donasi
global.payment = {
 psaweria: 'https://saweria.co/-',
 pgopay: '082351108031',
 pdana: '082351108031'
}
// Info Wait
global.msg = {
 wait: '⏱️ *Tunggu Sebentar*\n> Konexa Sedang menjalankan perintah dari *Kamu*!',
 eror: '🤖 *Eror Terdeteksi*\n> Mohon maaf atas ketidaknyamanan dalam menggunakan *KonexaMD* . Sepertinya Ada kesalahan dalam sistem saat menjalankan perintah hubungi owner secepatnya.'
}
 
// api_id web suntik
global.apiId = {
 smm: '4524',
 lapak: '300672'
}


// Apikey
global.api = {
 user: '1032299491', // api_id antinsfw 
 screet: 'MUXrWxp4G345aL5SKnXoQirVASRojgir', // api_screet nsfw klo abis ganti sendiri 
 uptime: '-',
 xyro: 'vRFLiyLPWu',
 lol: 'Gata_Dios',
 smm: 'akzqjl-jtnzkq-qg7kwy-the5vi-kc28or',
 lapak: 'lsWywgF49RlaiXP7wp4EAz58llH8AhHD',
 bing: '1A0LyHK49uTiWwhkKqqPmbyRESO9-36ZID3xCA_UOnmhVmr6CY2RK4XtpZtxQIuO4jH4druR7-z6ZQrLExNY8w4l57YvGIVZWy5IuyhbcDNx-apEM8J6k2iCNB6YmaOY4w7neE1iJy0fNRyHComU77c5_zeZ7EOivLwg0o0gH-SG2FTJIyj85AeZWqQZt97guIXw_FHTvDVvlFDNYzJRijw',
 neoxr: 'Konexx',
 kiicode: 'KC-7MkFPyEdSy3A'

}
global.APIs = {
    xyro: "https://api.xyroinee.xyz",
    nightTeam: "https://api.night-team.my.id",
    lol: "https://api.lolhumaan.xyz",
    smm: "https://smmnusantara.id",
    lapak: "https://panel.lapaksosmed.com",
    neoxr: "https://api.neoxr.my.id",
    kiicode: "https://api.kiicodeit.me"
}

//Apikey
global.APIKeys = {
    "https://api.xyroinee.xyz": "vRFLiyLPWu",
    "https://api.lolhumaan.xyz": "Gata_Dios",
    "https://api.neoxr.my.id": "Konexx",
    "https://api.kiicodeit.me": "KC-7MkFPyEdSy3A"
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})