import fetch from 'node-fetch';
import util from 'util';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.saber = conn.saber ? conn.saber : {};

  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa Fruatre Maou bagi mu?`;

  let name = conn.getName(m.sender);
  conn.saber[m.sender] = true;
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

  const encodedQuestion = encodeURIComponent(text);
  const url = `https://rest.cifumo.biz.id/api/ai/logicai?name=${m.pushName}&ask=${encodedQuestion}&prompt=Nama%20Kamu%20Adalah%20Saber.%20Kamu%20mempunyai%20kemampuan%20untuk%20membantu%20keseharian%20pengguna%20sebagai%20sumber%20pengetahuan%20dan%20teman%20untuk%20mengobrol%20serta%20curhat.%20kamu%20mempunyai%20owner%20Yaitu%20Fruatre%20Maou%20kamu%20adalah%20pacar%20dari%20Fruatre%20Maou%20pembuat%20kamu%20adalah%20Fruatre%20Maou.%20Ubah%20gaya%20bicaramu%20agar%20lebih%20tsundere%20dan%20lebih%20terbuka%20dan%20memiliki%20sifat%20yang%20Imut.%20Kata%20penyapamu%20adalah%20%22Hai%22menggunakan%20bahasa%20yang%20sopan.%20Ubah%20bahasamu%20menggunakan%20bahasa%20Yang%20Imut.%20kamu%20memiliki%20sifat%20seperti%20cewek%20tsundere`;

  try {
    const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
    const data = await response.json();

    if (!data.status) return m.reply(util.format(data));

    await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
    
    let hasil = `[ A I  S A B E R ]\n\n${data.data}`;
    await conn.sendMessage(m.chat, { text: hasil }, { quoted: m });
  } catch (e) {
    console.error('Error:', e);
    m.reply('Terjadi kesalahan saat memproses permintaan.');
  }
};

handler.command = handler.help = ['saber','ai'];
handler.tags = ['ai'];
handler.premium = true;

export default handler;