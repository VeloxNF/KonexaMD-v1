/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} semarang`
    try {
    const res = await jadwalsholat(text)
    m.reply(`
Jadwal Sholat *${text}*

 Fajar: ${res.fajar}
 Matahar Terbit: ${res.matahari_terbit}
 Dhuhur: ${res.dhuhur}
 Ashar: ${res.ashar}
 Matahari Terbenam: ${res.matahari_terbenam}
 Magrib: ${res.maghrib}
 Isya: ${res.isya}
 Imsak: ${res.imsak}
 Tengah Malam: ${res.tengah_malam}
  `)
  } catch (e) {
  throw eror
  }
}
handler.help = ['salat <daerah>']
handler.tags = ['islamic']
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i

export default handler

async function jadwalsholat(kota) {
try {
const { data } = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Indonesia&method=8`)

const result = {
  fajar: data.data.timings.Fajr,
  matahari_terbit: data.data.timings.Sunrise,
  dhuhur: data.data.timings.Dhuhr,
  ashar: data.data.timings.Asr,
  matahari_terbenam: data.data.timings.Sunset,
  maghrib: data.data.timings.Maghrib,
  isya: data.data.timings.Isha,
  imsak: data.data.timings.Imsak,
  tengah_malam: data.data.timings.Midnight
}
return result
} catch (e) {
return 'eror 404'
}
}