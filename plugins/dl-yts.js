import yts from 'yt-search';

const handler = async (m, { text }) => {
  if (!text) throw '• *Example :* .yts tentang perasaanku';
  
  let results = await yts(text);
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': 
        return `
*${v.title}* (${v.url})
Duration: ${v.timestamp}
Uploaded ${v.ago}
${v.views} views
        `.trim();
      case 'channel': 
        return `
*${v.name}* (${v.url})
_${v.subCountLabel} (${v.subCount}) Subscriber_
${v.videoCount} video
        `.trim();
    }
  }).filter(v => v).join('\n========================\n');
  
  m.reply(teks);
};

handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>');
handler.tags = ['tools'];
handler.command = /^yts(earch)?$/i;
handler.limit = true;

export default handler;