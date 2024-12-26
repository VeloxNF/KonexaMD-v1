const msToDate = (ms) => {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor((daysms) / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor((hoursms) / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor((minutesms) / (1000));
  return `${days} Hari ${hours} Jam ${minutes} Menit`;
};

const handler = async (m, { conn, usedPrefix }) => {
  const users = global.db.data.users;
  const { registered, name } = users[m.sender];

  let text = "";
  let i = 1;

  for (const jid in users) {
    if (users[jid].premium) {
      text += `\n\n${i}. ${conn.getName(jid)} (@${jid.replace(/@.+/, '')})\n    wa.me/${jid.split('@')[0]}\n    ${msToDate(users[jid].premiumDate - Date.now())}`;
      i++;
    }
  }

  return conn.reply(m.chat, `❏ Total Premium : ${i - 1} user\n❏ Upgrade Premium ?\nKetik *${usedPrefix}owner*\n${text}`, false, { contextInfo: { mentionedJid: conn.parseMention(text) } });
};

handler.help = ['listpremium'];
handler.tags = ['info'];
handler.command = /^(listpremium|premiumlist|listprem|premlist)$/i;
handler.limit = true;

export default handler;