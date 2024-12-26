/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let roseSet = db.data.txt2img || {};
    if(args[0] === 'background') {
            await conn.sendMessage(m.chat, {
                react: {
                    text: '🍵',
                    key: m.key,
                }
            });
            if (!args[1]) return m.reply(`Isikan background color yang sesuai`);
            roseSet.coloranime = args[1];
            m.reply(`[ ✓ ] Berhasil mengatur background color anime *${roseSet.coloranime}*`);
    } else if (args[0]) {
  if (!text) return
  let hasil = `https://api.onesytex.my.id/api/create_animeAvatar?id=${Math.floor(Math.random() * 200)}&signature=create+by+SutrisnoMD&background_text=${text}&color=${roseSet.coloranime}`;
  await conn.sendFile(m.chat, hasil, "imags.png", `*ꜱᴜᴋꜱᴇꜱ ɢᴇɴᴇʀᴀᴛɪɴɢ ɪᴍᴀɢᴇ*`, m)
  } else { 
  m.reply(`*• Example :* ${usedPrefix + command} Sutrisno\n*• Background :* .logoanime background black`)
  }
};

handler.help = ["logoanime <teks>"]
handler.tags = ["maker"];
handler.command = ["logoanime"];
export default handler;