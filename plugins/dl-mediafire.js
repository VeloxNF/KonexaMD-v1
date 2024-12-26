import fetch from 'node-fetch';

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) throw `*Example:* ${usedPrefix}${command} https://www.mediafire.com/file/thddr8pltg4cn0a/Sc_Bot_Md_Pairing_Code.zip/file`;
 
    try {
        const response = await fetch(`https://restapii.rioooxdzz.web.id/api/mediafire?url=${args[0]}`);
        const json = await response.json();
 
        if (!json.data.response) throw 'Failed to fetch!';
 
        let { download, filename, size, ext, uploaded, mimetype } = json.data.response;
 
        let caption = `
*Name:* ${filename}
*Size:* ${size}
*Extension:* ${ext}
*Uploaded:* ${uploaded}
`.trim();
 
        m.reply(caption);
        await m.conn.sendMessage(m.chat, { 
            document: { url: download }, 
            mimetype, 
            fileName: filename 
        }, { quoted: m });
 
    } catch (error) {
        throw error;
    }
};
 
handler.help = ['mediafire'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(mediafire|mf)$/i;
 
export default handler;