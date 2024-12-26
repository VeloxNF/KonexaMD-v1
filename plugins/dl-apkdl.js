import { apkDl } from '../function/system/downloader.js';

const handler = async (m, { conn, usedPrefix, text, command }) => {
    if (!text) throw `*• Example :* ${usedPrefix + command} *[apk name]*`;

    let [name, id] = text.split("|");
    m.reply(wait);
    
    if (name === "download") {
        let downloader = await apkDl();
        let download = await downloader.download(id);
        let cap = `Success Downloading Apk!\n*Name:* ${download.appname}\n*Developer:* ${download.developer}`;
        
        await conn.sendMessage(
            m.chat, {
                document: {
                    url: download.link,
                },
                caption: cap,
                fileName: download.appname + ".apk",
                mimetype: "application/vnd.android.package-archive",
                jpegThumbnail: await conn.resize(download.img, 100, 100),
            }, {
                quoted: m,
            },
        );
    } else {
        let downloader = await apkDl();
        let result = await downloader.search(name);

        if (!result.length) throw "No APK found for your search.";
        
        let sections = result.map((apk, index) => ({
            title: apk.name,
            rows: [{
                title: "Download APK",
                description: `Download ${apk.name}`,
                id: `${usedPrefix + command} download|${apk.id}`, // Command to download the selected APK
            }]
        }));

        const list = {
            title: "Pilih APK",
            sections: sections,
        };

        await conn.sendListButton(m.chat, '乂  *Hasil Pencarian APK*\n\nPilih dari daftar ini', list, wm, '[]', m);
    }
}

handler.help = ['apk *[name apk]*'];
handler.tags = ['downloader'];
handler.command = /^apk|apkdl$/i;
handler.limit = true;
handler.privat = false;
handler.register = true;

export default handler;