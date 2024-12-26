/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fetch from "node-fetch";

let handler = async (m, {
    conn,
    args
}) => {
    let response = args.join('').split('|');
    if (!args[0]) throw 'Masukkan Text\nContoh : .hacker Bang Fd';
    m.reply('_Proses..._');
    var tio = `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=Akiraa&text=${response[0]}`;
    conn.sendFile(m.chat, tio, 'loliiiii.jpg', null, m, false);
};

handler.command = handler.help = ['logohacker'];
handler.tags = ['maker'];

export default handler;