/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fetch from "node-fetch"
let handler = async (m, { 
conn, 
text 
}) => {
  if (!text) throw 'Masukkan Text\nContoh : .raining ELAINA'
  var tio = `https://api.lolhuman.xyz/api/ephoto1/wetglass?apikey=Akiraa&text=${text}`
  conn.sendFile(m.chat, tio, 'loliiiii.jpg', wm, m, false)
};
handler.command = handler.help = ['raining'];
handler.tags = ['maker'];
export default handler