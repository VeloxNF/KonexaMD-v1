import fs from 'fs';
import archiver from 'archiver';

export async function all(m) {
let pengaturan = global.db.data.settings[this.user.jid]

if (pengaturan.backup) {
     if (new Date() * 1 - pengaturan.backupDB > 86400000) { // 24 jam sekali 
const fake = {
  key: {
    participant: '6282220066467@s.whatsapp.net',
    remoteJid: '6282220066467@s.whatsapp.net'
  },
  message: { conversation: await style('Backup Script', 5) }
}
let backupZip = 'nightmare.zip'
const output = fs.createWriteStream(backupZip);
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', function() {
    let cap = 'Proses pengarsipan selesai. ' + archive.pointer() + ' total bytes'
    console.log(cap)
     conn.sendFile(nomerown+'@s.whatsapp.net', backupZip, backupZip, cap, fake)
});

archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

archive.on('error', function(err) {
    throw err;
});
archive.pipe(output);
archive.glob('**/*', {
    ignore: ['node_modules/**', 'nightmare.zip'] // Mengecualikan folder node_modules
});

archive.finalize();
await fs.unlinkSync(backupZip);
pengaturan.backupDB = new Date() * 1
            }
}
}