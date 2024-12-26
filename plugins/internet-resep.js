let handler = async (m, { command, usedPrefix, conn, text }) => {
  if (!text) {
    m.reply('Example: resep capcay');
    return;
  }

  m.reply(wait);

    fetchJson(`https://aemt.me/caribacaresep?query=${text}`).then(a => {
    let result = a.hasil.data
    let caption = `🧾 Judul : ${result.judul}
    
    
    
⏱️ Waktu Masak : ${result.waktu_masak}
🍽️ Hasil : ${result.hasil}
📈 Tingkat Kesulitan : ${result.tingkat_kesulitan}

🍴 Bahan : ${result.bahan}

🔖 Langkah : ${result.langkah_langkah}`
    
    conn.sendMessage(m.chat, { text: caption, 
    contextInfo: {
    "externalAdReply": {
    "title": '',
    "body": result.judul,
    "showAdAttribution": true,
    "mediaType": 1,
    "sourceUrl": '',
    "thumbnailUrl": result.thumb,
    "renderLargerThumbnail": true
    }}}, {quoted: m});
  }).catch(error => {
    m.reply('Terjadi kesalahan saat mengambil data.');
    console.error(error);
  })
};

handler.tags = ['internet']
handler.help = ['resep <query>']
handler.command = ['resep'];

export default handler;