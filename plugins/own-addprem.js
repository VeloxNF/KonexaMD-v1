const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, text, usedPrefix }) => {
  if (conn.user.jid !== global.conn.user.jid) return;

  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '');
  }

  var hl = [];
  hl[0] = text.split('|')[0];
  hl[0] = no(hl[0]) + "@s.whatsapp.net";
  hl[1] = text.split('|')[1];

  if (!text) return conn.reply(m.chat, `• *Example :* .addprem 628816609112|100`, m);
  if (typeof db.data.users[hl[0]] == 'undefined') return conn.reply(m.chat, '🚨 Pengguna tidak ada didalam data base', m);

  var jumlahHari = 86400000 * hl[1];
  var now = new Date() * 1;

  if (isNaN(jumlahHari)) {
    global.db.data.users[hl[0]].premium = true;
    global.db.data.users[hl[0]].premiumDate = Infinity;
  } else {
    global.db.data.users[hl[0]].premium = true;
    if (now < global.db.data.users[hl[0]].premiumDate) {
      global.db.data.users[hl[0]].premiumDate += jumlahHari;
    } else {
      global.db.data.users[hl[0]].premiumDate = now + jumlahHari;
    }
  }

  let premiumDate =
    global.db.data.users[hl[0]].premiumDate === Infinity
      ? "Unlimited"
      : msToDate(global.db.data.users[hl[0]].premiumDate - now);

  conn.reply(
    m.chat,
    `• *UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.\n\n*Premium : ${premiumDate}*`,
    m,
    { contextInfo: { mentionedJid: [hl[0]] } }
  );

  conn.reply(
    hl[0],
    `• *UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.\n\n*Premium : ${premiumDate}*`,
    m,
    { contextInfo: { mentionedJid: [hl[0]] } }
  );
};

function msToDate(ms) {
  let temp = ms;
  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let daysms = ms % (24 * 60 * 60 * 1000);
  let hours = Math.floor((daysms) / (60 * 60 * 1000));
  let hoursms = ms % (60 * 60 * 1000);
  let minutes = Math.floor((hoursms) / (60 * 1000));
  let minutesms = ms % (60 * 1000);
  let sec = Math.floor((minutesms) / (1000));
  return `${days}:${hours}:${minutes}`;
}

// Handler metadata
handler.command = /^(addprem)$/i;
handler.tags = ['owner'];
handler.help = ['addprem <@tag|days>'];
handler.owner = true;

export default handler;