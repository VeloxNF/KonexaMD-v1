const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@adiwajshing/baileys')).default;

const boldText = (text) => `*${text}*`; // Function to bold text
const formatJSON = (data) => JSON.stringify(data, null, 2); // Function to format JSON

let lastProcessedCommand = {}; // Object to store the last processed command timestamps

const handler = async (m, { conn, command, usedPrefix, args }) => {
    try {
        if (!args || !args[0]) return;

        // Check for repeated command within a short timeframe (2 seconds)
        const currentTime = Date.now();
        const timeSinceLast = currentTime - (lastProcessedCommand[command] || 0);
        if (timeSinceLast < 2000) return; // Skip processing if it's within 2 seconds

        // Update last processed command time
        lastProcessedCommand[command] = currentTime;

        if (command === 'gc') {
            const jid = args[0];
            const rows = [
                { title: 'STAY 1 DAY', id: `${usedPrefix}modify ${jid} 1D`, description: `` },
                { title: 'STAY 1 WEEK', id: `${usedPrefix}modify ${jid} 7D`, description: `` },
                { title: 'STAY 1 MONTH', id: `${usedPrefix}modify ${jid} 30D`, description: `` },
                { title: 'STAY FOREVER', id: `${usedPrefix}modify ${jid} 1`, description: `` },
                { title: 'GET LINK', id: `${usedPrefix}modify ${jid} 2`, description: `` },
                { title: 'LEAVE', id: `${usedPrefix}modify ${jid} 3`, description: `` },
                { title: 'MUTE', id: `${usedPrefix}modify ${jid} 4`, description: `` },
                { title: 'UNMUTE', id: `${usedPrefix}modify ${jid} 5`, description: `` },
                { title: 'CLOSE', id: `${usedPrefix}modify ${jid} 6`, description: `` },
                { title: 'OPEN', id: `${usedPrefix}modify ${jid} 7`, description: `` },
                { title: 'RESET TIME', id: `${usedPrefix}modify ${jid} 8`, description: `` }
            ];

            let pp = './src/avatar_contact.png';
            try {
                pp = await conn.profilePictureUrl(jid, 'image');
            } catch (e) { }

            const sections = [{ rows }];
            const listMessage = {
                title: 'Click here!',
                sections
            };

            const msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: `Option to set *${await (await conn.groupMetadata(jid)).subject}* group.`
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "_Settings_",
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: 'Powered By Axell',
                                hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: pp } }, { upload: conn.waUploadToServer }))
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: [
                                    {
                                        name: "single_select",
                                        buttonParamsJson: JSON.stringify(listMessage)
                                    }
                                ],
                            })
                        })
                    }
                }
            }, { userJid: m.chat, quoted: m });
            await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

        } else if (command === 'modify') {
            if (!args[1]) return;

            const jid = args[0];
            const dial = args[1];
            const groupMetadata = await conn.groupMetadata(jid);
            const groupName = groupMetadata.subject;
            const groupAdmins = groupMetadata.participants.filter((v) => v.admin !== null).map((i) => i.id);
            const admin = groupAdmins.includes(conn.user.jid);
            const now = Date.now();

            if (/1D|7D|30D/.test(dial)) {
                const day = 86400000 * parseInt(dial.replace('D', ''), 10);
                global.db.data.chats[jid].expired = now + day;
                global.db.data.chats[jid].stay = false;
                return conn.reply(m.chat, boldText(`🚩 Bot duration is successfully set to stay for ${dial.replace('D', ' day')} in ${groupName} group.`), m);
            } else if (dial === '1') {
                global.db.data.chats[jid].expired = 0;
                global.db.data.chats[jid].stay = true;
                return conn.reply(m.chat, boldText(`🚩 Successfully set bot to stay forever in ${groupName} group.`), m);
            } else if (dial === '2') {
                if (!admin) return conn.reply(m.chat, boldText(`🚩 Can't get ${groupName} group link because the bot is not an admin.`), m);
                const groupLink = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode(jid));
                return conn.reply(m.chat, groupLink, m);
            } else if (dial === '3') {
                await conn.reply(jid, `🚩 Good Bye!`, null);
                await conn.groupLeave(jid);
                return conn.reply(m.chat, boldText(`🚩 Successfully left from ${groupName} group.`), m);
            } else if (dial === '4') {
                global.db.data.chats[jid].isBanned = true;
                return conn.reply(m.chat, boldText(`🚩 Bot successfully muted in ${groupName} group.`), m);
            } else if (dial === '5') {
                global.db.data.chats[jid].isBanned = false;
                return conn.reply(m.chat, boldText(`🚩 Bot successfully unmuted in ${groupName} group.`), m);
            } else if (dial === '6') {
                if (!admin) return conn.reply(m.chat, boldText(`🚩 Can't close ${groupName} group link because the bot is not an admin.`), m);
                await conn.groupSettingUpdate(jid, 'announcement');
                await conn.reply(jid, boldText(`🚩 Group has been closed.`));
                return conn.reply(m.chat, boldText(`🚩 Successfully closed ${groupName} group.`), m);
            } else if (dial === '7') {
                if (!admin) return conn.reply(m.chat, boldText(`🚩 Can't open ${groupName} group link because the bot is not an admin.`), m);
                await conn.groupSettingUpdate(jid, 'not_announcement');
                await conn.reply(jid, boldText(`🚩 Group has been opened.`));
                return conn.reply(m.chat, boldText(`🚩 Successfully opened ${groupName} group.`), m);
            } else if (dial === '8') {
                global.db.data.chats[jid].expired = 0;
                global.db.data.chats[jid].stay = false;
                return conn.reply(m.chat, boldText(`🚩 Duration of bot in the ${groupName} group has been successfully reset.`), m);
            }
        }
    } catch (e) {
        conn.reply(m.chat, formatJSON(e), m);
    }
};

handler.command = ["gc", "modify"];
handler.owner = true;

export default handler;