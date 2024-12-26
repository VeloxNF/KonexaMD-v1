/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import canvafy from "canvafy"

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  if (!who) throw "Contoh: .cpasangan @tag";
  let sender = await conn.getName(m.sender);
  let sender2 = await conn.getName(who);

  const pp = await conn
    .profilePictureUrl(m.sender, "image")
    .catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
  const pp2 = await conn
    .profilePictureUrl(who, "image")
    .catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
  const ship = await new canvafy.Ship()
    .setAvatars(pp, pp2)
    .setBorder("#f0f0f0")
    .setOverlayOpacity(0.5)
    .build();

  let fanz = `
• *COCOK PASANGAN*
Nama Anda: ${sender}
Nama Pasangan: ${sender2}

*MOGA LANGGENG YAH :V*
`;

  conn.sendFile(m.chat, ship, "", fanz, m);
};

handler.command = handler.help = ["cpasangan"];
handler.tags = ["primbon"];
handler.owner = false;
handler.limit = true;

export default handler