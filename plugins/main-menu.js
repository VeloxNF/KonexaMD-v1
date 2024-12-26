import { promises } from 'fs';
import { join } from 'path';
import { xpRange } from '../lib/levelling.js';
import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fs from 'fs';
import fetch from 'node-fetch';
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@adiwajshing/baileys')).default;

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command }) => {
  let usedPrefix = _p;  // Ensure usedPrefix is defined

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender;
  const cmd = args[0] || 'list';
  let type = (args[0] || '').toLowerCase();
  let _menu = global.db.data.settings[conn.user.jid];
  let d = new Date(new Date() + 3600000);
  let locale = 'id';
  let week = d.toLocaleDateString(locale, { weekday: 'long' });
  let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
  let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d);
  let time = d.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  let _uptime = process.uptime() * 1000;
  let _muptime;
  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    }) * 1000;
  }
  let muptime = clockString(_muptime);
  let uptime = clockString(_uptime);
  let _mpt;
  if (process.send) {
    process.send('uptime');
    _mpt = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    }) * 1000;
  }
  let mpt = clockString(_mpt);
  let usrs = db.data.users[m.sender];

  let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss');
  let wibh = moment.tz('Asia/Jakarta').format('HH');
  let wibm = moment.tz('Asia/Jakarta').format('mm');
  let wibs = moment.tz('Asia/Jakarta').format('ss');
  let wit = moment.tz('Asia/Jayapura').format('HH:mm:ss');
  let wita = moment.tz('Asia/Makassar').format('HH:mm:ss');
  let wktuwib = `${wibh} H ${wibm} M ${wibs} S`;
  const tagCount = {};
  const tagHelpMapping = {};
  Object.keys(global.plugins)
    .filter(plugin => !plugin.disabled)
    .forEach(plugin => {
      const tagsArray = Array.isArray(global.plugins[plugin].tags)
        ? global.plugins[plugin].tags
        : [];

      if (tagsArray.length > 0) {
        const helpArray = Array.isArray(global.plugins[plugin].help)
          ? global.plugins[plugin].help
          : [global.plugins[plugin].help];

        tagsArray.forEach(tag => {
          if (tag) {
            if (tagCount[tag]) {
              tagCount[tag]++;
              tagHelpMapping[tag].push(...helpArray);
            } else {
              tagCount[tag] = 1;
              tagHelpMapping[tag] = [...helpArray];
            }
          }
        });
      }
    });
  let isiMenu = [];
  let objekk = Object.keys(tagCount);
  for (let pus of objekk) {
    isiMenu.push({
      header: `Menu ${pus}`,
      title: `• List menu [ ${pus} ]`,
      description: "",
      id: ".menu " + pus,
    });
  }
  const datas = {
    title: "Open here!",
    sections: [{
      title: "Menu All",
      highlight_label: "Tampilkan semua menu",
      rows: [{
        header: "Menu All",
        title: "Menampilkan semua menu",
        description: "",
        id: ".menu all",
      }],
    },
    {
      title: 'Menu List',
      highlight_label: "New",
      rows: [...isiMenu]
    },
    {
      title: 'Info Bot',
      highlight_label: "Hot",
      rows: [{
        header: "Info Script",
        title: "Informasi mengenai script Bot",
        description: "",
        id: ".sc",
      },
      {
        header: "Info Owner",
        title: "Informasi mengenai owner Bot",
        description: "",
        id: ".owner",
      },
      {
        header: "Info total fitur",
        title: "Informasi mengenai total fitur Bot",
        description: "",
        id: ".totalfitur",
      },
      {
        header: "Info kecepatan respon",
        title: "Informasi mengenai kecepatan respon Bot",
        description: "",
        id: ".os",
      }
      ]
    }
    ]
  };
  let msgs
  let objek = Object.values(db.data.stats).map(v => v.success);
  let totalHit = 0;
  for (let b of objek) {
    totalHit += b;
  }
  let docUrl = 'https://telegra.ph/file/e601537d315cbc69b856b.jpg';
  let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    };
  });

  let data = db.data.users[m.sender];
  let fitur = Object.values(plugins).filter(v => v.help).map(v => v.help).flat(1);
  let tUser = Object.keys(db.data.users).length;
  let userReg = Object.values(global.db.data.users).filter(user => user.registered == true).length;

  let headers = `
• *Platform* : Linux
• *Baileys* : @adiwajshing/baileys
• *Total Register* : ${userReg}

_Life is simple, be more grateful, reduce your pride, then your life will be much happier_
`;
  
  if (cmd === 'list') {
    const daftarTag = Object.keys(tagCount)
      .sort()
      .join('\n> • ' + usedPrefix + command + '  ');
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)
    let _mpt
    if (process.send) {
      process.send('uptime')
      _mpt = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let mpt = clockString(_mpt)
    let name = m.pushName || conn.getName(m.sender)
    let list = `${headers}${readMore}\n*──「 L I S T 」──*\n\n> • ${usedPrefix + command} all\n> • ${daftarTag}`
 const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
if (_menu.image) {
  await conn.sendMessage(m.chat, { text: headers,edit: key });
  
conn.sendMessage(m.chat, {
      text: list,
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})
      
      } else if (_menu.gif) {
    msgs = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*Hi* 🎀
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n${list}`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false,
            ...await prepareWAMessageMedia({ video: {url: 'https://telegra.ph/file/005be76c31187340277aa.mp4' }}, {upload: conn.waUploadToServer})
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(datas)
              },
           ],
          }), contextInfo: {
"externalAdReply": {
							"title": namebot,
							"body": '',
							"showAdAttribution": true,
                            "mediaType": 1,
							"sourceUrl": '',
							"thumbnailUrl": thumbnail,
							"renderLargerThumbnail": true

						}
}
        })
    }
  }
}, {quoted: m, userJid: m })

await conn.relayMessage(m.chat, msgs.message, {
  messageId: m.key.id
})
} else if (_menu.teks) {

conn.reply(m.chat, list, m)

} else if (_menu.doc) {

conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: 'Axeley',
            fileLength: new Date(),
            pageCount: "2024",
            caption: `${await style(list, 1)}`,
            mimetype: 'image/png',
            jpegThumbnail: await conn.resize('https://telegra.ph/file/b476b9fd461e83acd39e7.jpg', 400, 400),
      contextInfo: {
      externalAdReply: {
      title: `Axeley || Menu`,
      body: `Made By Aeley D Elmora `,
      thumbnailUrl: 'https://telegra.ph/file/4c3d1daeba74d1993b2a8.jpg',
      sourceUrl: null,
      mediaType: 1,
      renderLargerThumbnail: true, 
        },
        forwardingScore: 10,
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
            businessOwnerJid: `6285817597752@s.whatsapp.net`
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363272189553503@newsletter',
            serverMessageId: null,
            newsletterName: 'Axeley || By Aeley D Elmora '
        }
    }
}, { quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: 'Axeley Terverifikasi Oleh WhatsApp' }}});
          } else if (_menu.button) {
          
 conn.sendListImageButton(m.chat, `*Hi* 🎀
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n${headers}`, datas, wm, thumbnail)
          }
  } else if (tagCount[cmd]) {
    const daftarHelp = tagHelpMapping[cmd].map((helpItem, index) => {
        
      const premiumSign = help[index].premium ? '🅟' : '';
      const limitSign = help[index].limit ? 'Ⓛ' : '';
      return `.${helpItem} ${premiumSign}${limitSign}`;
    }).join('\n> •'  + ' ');
        const more = String.fromCharCode(8206)
        const readMore = more.repeat(4001)
        
    const list2 =  `${headers}${readMore}\n*──「 ${cmd.toUpperCase()} 」──*\n> • ${daftarHelp}\n*──────────•*\n\n*Total menu ${cmd}: ${tagHelpMapping[cmd].length}*`
     const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
if (_menu.image) {

conn.sendMessage(m.chat, {
      
      text: list2,
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})
      
      } else if (_menu.gif) {
      msgs = generateWAMessageFromContent(m.cht, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*Hi* 🎀
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n${list2}`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false,
            ...await prepareWAMessageMedia({ video: {url: 'https://telegra.ph/file/005be76c31187340277aa.mp4' }}, {upload: conn.waUploadToServer})
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(datas)
              },
           ],
          }), contextInfo: {
"externalAdReply": {
							"title": namebot,
							"body": '',
							"showAdAttribution": true,
                            "mediaType": 1,
							"sourceUrl": '',
							"thumbnailUrl": thumbnail,
							"renderLargerThumbnail": true

						}
}
        })
    }
  }
}, {quoted: m, userJid: m })

await conn.relayMessage(m.chat, msgs.message
)
} else if (_menu.teks) {

conn.reply(m.chat, list2, m)

} else if (_menu.doc) {

await conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: 'Axeley',
            fileLength: new Date(),
            pageCount: "2024",
            caption: `${await style(list2, 1)}`,
            mimetype: 'image/png',
            jpegThumbnail: await conn.resize('https://telegra.ph/file/b476b9fd461e83acd39e7.jpg', 400, 400),
      contextInfo: {
      externalAdReply: {
      title: `Axeley || All Menu`,
      body: `Made By Aeley D Elmora `,
      thumbnailUrl: 'https://telegra.ph/file/4c3d1daeba74d1993b2a8.jpg',
      sourceUrl: null,
      mediaType: 1,
      renderLargerThumbnail: true, 
        },
        forwardingScore: 10,
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
            businessOwnerJid: `6285817597752@s.whatsapp.net`
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363272189553503@newsletter',
            serverMessageId: null,
            newsletterName: 'Axeley || By Aeley D Elmora '
        }
    }
}, { quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: 'Axeley Terverifikasi Oleh WhatsApp' }}});
          } else if (_menu.button) {
          conn.sendListImageButton(m.chat, `*Hi* 🎀
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n${list2}`, datas, wm, thumbnail)
          }
          } else if (cmd === 'all') {
    let name = m.pushName || conn.getName(m.sender)
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)
    const allTagsAndHelp = Object.keys(tagCount).map(tag => {
      const daftarHelp = tagHelpMapping[tag].map((helpItem, index) => {
        const premiumSign = help[index].premium ? '🅟' : '';
        const limitSign = help[index].limit ? 'Ⓛ' : '';
        return `.${helpItem} ${premiumSign}${limitSign}`;
      }).join('\n> •' + ' ');
      return`*──「 ${tag.toUpperCase()} 」──*\n> • ${daftarHelp}\n*────────── •*\n`;
    }).join('\n');
    let all =  `${headers}${readMore}\n${allTagsAndHelp}\n${wm}`
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
    if (_menu.image) {

conn.sendMessage(m.chat, {
      text: all,
      contextInfo: {
      externalAdReply: {
      title: namebot,
      body: 'M E N U',
      thumbnailUrl: thumbnail,
      souceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, {quoted: m})
      
      } else if (_menu.gif) {

    msgs = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*Hi* 🎀
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n${all}`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false,
            ...await prepareWAMessageMedia({ video: {url: 'https://telegra.ph/file/005be76c31187340277aa.mp4' }}, {upload: conn.waUploadToServer})
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(datas)
              },
           ],
          }), contextInfo: {
"externalAdReply": {
							"title": namebot,
							"body": '',
							"showAdAttribution": true,
                            "mediaType": 1,
							"sourceUrl": '',
							"thumbnailUrl": thumbnail,
							"renderLargerThumbnail": true

						}
}
        })
    }
  }
}, {quoted: m, userJid: m })

await conn.relayMessage(m.chat, msgs.message, {
  messageId: m.key.id
})

} else if (_menu.teks) {

conn.reply(m.chat, all, m)

} else if (_menu.doc) {

conn.sendMessage(m.chat, {
            document: fs.readFileSync("./package.json"),
            fileName: 'Axeley',
            fileLength: new Date(),
            pageCount: "2024",
            caption: `${await style(all, 1)}`,
            mimetype: 'image/png',
            jpegThumbnail: await conn.resize('https://telegra.ph/file/b476b9fd461e83acd39e7.jpg', 400, 400),
      contextInfo: {
      externalAdReply: {
      title: `Axeley || Menu`,
      body: `Made By Aeley D Elmora `,
      thumbnailUrl: 'https://telegra.ph/file/4c3d1daeba74d1993b2a8.jpg',
      sourceUrl: null,
      mediaType: 1,
      renderLargerThumbnail: true, 
        },
        forwardingScore: 10,
        isForwarded: true,
        mentionedJid: [m.sender],
        businessMessageForwardInfo: {
            businessOwnerJid: `6285817597752@s.whatsapp.net`
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363272189553503@newsletter',
            serverMessageId: null,
            newsletterName: 'Axeley || By Aeley D Elmora '
        }
    }
}, { quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: 'Axeley Terverifikasi Oleh WhatsApp' }}});
          } else if (_menu.button) {
          conn.sendListImageButton(m.chat, `*Hi* 🎀
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n${all}`, datas, wm, thumbnail)
          }
  } else {
  await conn.reply(m.chat, `"'${cmd}' tidak dapat ditemukan. Gunakan perintah '${command} list' atau '${command} all' untuk melihat menu yang telah tersedia.`,m);
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu']
handler.register = true
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}