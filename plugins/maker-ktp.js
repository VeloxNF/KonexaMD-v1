/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

const handler = async (m, { conn, usedPrefix, command, args }) => {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const name = await conn.getName(who);

  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (!mime) throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command}`;

  const media = await q.download();
  const url = await uploadImage(media);

  if (!args[0]) throw 'Masukkan Text\nContoh: 08987537657|Bot What\'sapp|Elaina jalan 16|Bang FD|Jawa Tengah|03/07|Kutowinangun|Kebumen|Islam|Belum Kawin|Nonton Anime|Jepang|Seumur Hidup|Jawa Tengah|Kebumen';

  m.reply('Tunggu sebentar...');
  
  const response = args.join(' ').split('|');
  const res = `https://api.lolhuman.xyz/api/ktpmaker?apikey=Akiraa&nik=${response[0]}&prov=${response[1]}&kabu=${response[2]}&name=${response[3]}&ttl=a&jk=${response[4]}&jl=${response[5]}&rtrw=${response[6]}&camat=${response[7]}&agama=${response[8]}&nikah=${response[9]}&kerja=${response[10]}&warga=${response[11]}&until=${response[12]}&img=${url}`;

  conn.sendFile(m.chat, res, 'ktp.jpg', `Nih kak\n${global.wm}`, m, false);
};

handler.help = ['ktp <text>'];
handler.tags = ['maker'];
handler.command = /^(ktp)$/i;
handler.limit = false;
handler.premium = true;

export default handler;