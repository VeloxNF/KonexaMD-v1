import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply('Masukkan link CapCut');

  try {
    let info = await capcutdl(text);
    let HS = `*Judul :* ${info.data.title}
*Deskripsi :* ${info.data.desc}
*ID :* ${info.data.templateId}
*URL:* ${info.data.structuredData.url}`;
    
    await conn.sendMessage(m.chat, { video: { url: info.data.videoUrl }, caption: HS }, { quoted: m });
  } catch (error) {
    console.error(error);
  }
};

handler.command = /^(capcutdl)$/i;
handler.tags = ['downloader'];
handler.help = ['capcutdl <url>'];

export default handler;

async function capcutdl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let cc = await axios.get(url, { headers: { 'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36" }}).then(x => x.data);
      
      let dataMatch = /<script nonce="argus-csp-token">window\._ROUTER_DATA = (.*?)<\/script>/;
      if (cc.match(dataMatch)) {
        let getJson = JSON.parse(cc.match(dataMatch)[1]).loaderData['template-detail_$'].templateDetail;
        if (getJson.templateId) {
          resolve({ status: true, mess: `Informasi tidak tersedia`, data: getJson });
        } else {
          resolve({ status: false, mess: `Informasi tidak tersedia` });
        }
      }
    } catch (e) {
      reject({ status: false, mess: `Terjadi kesalahan` });
    }
  });
}