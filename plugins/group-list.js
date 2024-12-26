import { generateWAMessageFromContent, proto, prepareWAMessageMedia } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Jakarta').locale('id');

const handler = async (m, { conn, usedPrefix, command }) => {

  const groupList = async () => Object.entries(await conn.groupFetchAllParticipating()).slice(0).map(entry => entry[1]);
  const groups = await groupList();
  const rows = [];

  groups.forEach(x => {
    const v = global.db.data.chats[x.id];
    if (v) {
      rows.push({
        title: x.subject,
        id: `${usedPrefix}gc ${x.id}`,
        description: `[ ${v.stay ? 'FOREVER' : (v.expired == 0 ? 'NOT SET' : Func.timeReverse(v.expired - new Date() * 1))}  | ${x.participants.length} | ${(v.isBanned ? 'OFF' : 'ON')} | ${moment(v.activity).format('DD/MM/YY HH:mm:ss')} ]`
      });
    }
  });

  const sections = [{
    rows: rows
  }];

  const listMessage = {
    title: 'Click here!',
    sections
  };

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Bot has joined to *${groups.length}* groups.`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: '_Groups_'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: 'Powered By Axell',
            hasMediaAttachment: true,
            ...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/3917414ed86c3d02c3b8a.jpg' } }, { upload: conn.waUploadToServer }))
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage)
              }
            ]
          })
        })
      }
    }
  }, { userJid: m.chat, quoted: m });

  await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
};

handler.help = ['grouplist'];
handler.tags = ['group'];
handler.command = /^(group|listgroups|listgroup|groups|groupslist|grouplist)$/i;
handler.owner = true;

export default handler;