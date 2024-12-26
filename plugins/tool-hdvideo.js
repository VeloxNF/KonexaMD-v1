const { videoConvert } = (await import('../lib/converter.js'));

let handler = async (m, { conn, text, usedPrefix, args, command }) => {
    conn.hdvid = conn.hdvid ? conn.hdvid : {};
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

    if (!mime) throw `Videonya Mana...?`;
    let tinggi = q.height
    let lebar = q.width
    let error;
    try {
      let additionalFFmpegOptions;
      if (text = 2) {
        additionalFFmpegOptions = [
          '-c:v', 'libx264',
          '-crf', args[2] || '10',
          '-b:v', args[1] || '8M',
          '-s', lebar * 2 + 'x' + tinggi * 2,
          '-x264opts', 'keyint=30:min-keyint=30',
        ];
      } else if (text = 3) {
        additionalFFmpegOptions = [
          '-c:v', 'libx264',
          '-crf', args[2] || '5',
          '-b:v', args[1] || '8M',
          '-s', lebar * 3 + 'x' + tinggi * 3,
          '-x264opts', 'keyint=30:min-keyint=30',
        ];
      } else throw 'list level:\n\n[1]. 2 (medium)\n[2]. 3 (HD)';
            m.reply(wait);
            
      const videoBuffer = await q.download();
      const additionalArgs = [
        ...additionalFFmpegOptions,
        '-q:v', '60',
      ];
      const buff = await videoConvert(videoBuffer, additionalArgs);
      await m.reply(buff);
    } catch (er) {
     throw eror
      }
}

handler.help = ['hdvideo']
handler.tags = ['tools']
handler.command = /^(hdvideo(s)?)$/i
handler.premium = true

export default handler;