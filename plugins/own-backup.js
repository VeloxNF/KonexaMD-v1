import fs from 'fs';
import archiver from 'archiver';

let handler = async (m, { conn, isOwner, command, text }) => {
  
  if (global.conn.user.jid !== conn.user.jid) return;

  conn.sendMessage(m.chat, { react: { text: 'ðŸ’‹', key: m.key } });

  const fake = {
    key: {
      participant: '6288289338073@s.whatsapp.net',
      remoteJid: '6288289338073@s.whatsapp.net'
    },
    message: { conversation: await style('Backup Script', 5) }
  };

  let backupZip = 'axeley.zip';
  const output = fs.createWriteStream(backupZip);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', async function() {
    let cap = 'Proses pengarsipan selesai. Ukuran: ' + await func.toSize(archive.pointer());
    console.log(cap);
    await conn.sendFile(m.chat, backupZip, backupZip, cap, fake);
    await m.react('Ã¢Å“â€¦');
    // Hapus file zip setelah dikirim
    fs.unlinkSync(backupZip);
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on('error', function(err) {
    console.error(err);
    throw err;
  });

  archive.pipe(output);
  archive.glob('**/*', {
    ignore: ['node_modules/**', 'axeley.zip'] // Mengecualikan file di dalam folder plugins
  });

  await archive.finalize();
};

handler.help = ['backup'];
handler.tags = ['owner'];
handler.command = /^(backup)$/i;
handler.rowner = true;

export default handler;