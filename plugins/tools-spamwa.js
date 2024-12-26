let handler = async (m, { conn, text }) => {
  let [nomor, pesan, jumlah] = text.split('|');

  if (!nomor) throw '*[ ⚠️ ] Harap masukkan nomor tujuan untuk melakukan spam pesan!*';
  if (!pesan) throw '*[ ⚠️ ] Harap masukkan pesan yang ingin di-spam!*';
  if (!jumlah || isNaN(jumlah)) throw '*[ ⚠️ ] Harap masukkan jumlah pesan yang ingin dikirim!*';

  let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net';
  let fixedJumlah = jumlah * 1;

  if (fixedJumlah > 1000) throw '*[ ⚠️ ] Terlalu banyak pesan! Jumlah harus kurang dari atau sama dengan 1000*';

  await m.reply(`*[❗] Spam pesan ke nomor ${nomor} berhasil dilakukan*\n*Jumlah terkirim: ${fixedJumlah} kali!*`);

  for (let i = 0; i < fixedJumlah; i++) {
    conn.reply(fixedNumber, pesan.trim(), m);
  }
}

handler.help = ['spamwa <number>|<message>|<no of messages>'];
handler.tags = ['tools'];
handler.command = /^spam(wa)?$/i;
handler.group = false;
handler.premium = true;
handler.private = true;
handler.limit = true;
export default handler;