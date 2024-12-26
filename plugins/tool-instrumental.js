import fs from "fs";
import axios from "axios";

let handler = async (m, {
conn,
usedPrefix,
command
}) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/audio/.test(mime)) throw `Reply Video/Vn Nya`
let media = await q.download?.()
if (!media) throw 'Can\'t download media'

    m.reply('mohon bersabar, proses ini membutuhkan waktu 1 menit')
    let baseUrl = 'https://vocalremover.com';
    const token = 'BKc2dgAzANO3Qkxh13y7kn08fulalntMaIvDloPz247501de';

    try {

        let file = `tmp/${m.sender.split('@')[0]}.mp3`
        fs.writeFileSync(file, media);

        const config = {
            method: 'post',
            url: `${baseUrl}/api/file-conversion/create`,
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            data: {
                file: fs.createReadStream(file),
                task: 'spleeter:2stems',
                sample: 1
            }
        };
        const {
            data
        } = await axios(config);
        const {
            file_conversion
        } = data;

await conn.delay(60000)

        const apiEndpoint = `${baseUrl}/api/file-conversion/${file_conversion.ulid}`;

        const configs = {
  method: 'get',
  url: apiEndpoint,
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
};

    let { data: result } = await axios(configs);
        
        let {
            file_conversion: audio
        } = result;
        
        await conn.sendFile(m.chat, audio.output.vocals.url, '', null, {
            key: {
                participant: '6282220066467@s.whatsapp.net',
                remoteJid: '6282220066467@s.whatsapp.net'
            },
            message: {
                conversation: audio.output.vocals.name
            }}, true, { contextInfo: {
mentionedJid: [m.sender]
}
})
        
        await conn.sendFile(m.chat, audio.output.instrumentals.url, '', null, {
            key: {
                participant: '6282220066467@s.whatsapp.net',
                remoteJid: '6282220066467@s.whatsapp.net'
            },
            message: {
                conversation: audio.output.instrumentals.name
            }}, false, { contextInfo: {
mentionedJid: [m.sender]
}
})
            
    } catch (e) {
        throw eror
    }

}
handler.help = ['instrument']
handler.tags = ['tools']
handler.limit = true
handler.command = /^(instrument(al)?)$/i

export default handler