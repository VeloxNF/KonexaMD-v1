const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn, groupMetadata }) => {
    try {
        const response = await conn.groupInviteCode(m.chat);
        const code = `https://chat.whatsapp.com/${response}`;
        const capt = `👥 *GROUP LINK INFO*\n📛 *Name :* ${groupMetadata.subject}\n👤 *Group Owner :* ${groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Not known'}\n🌱 *ID :* ${groupMetadata.id}\n👥 *Member :* ${groupMetadata.participants.length}`;

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: ``
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: capt
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: ``,
                            subtitle: "link group",
                            hasMediaAttachment: false
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    "name": "cta_copy",
                                    "buttonParamsJson": `{ "display_text": "Copy Link", "id": "123456789", "copy_code": "${code}" }`
                                },
                            ],
                        })
                    })
                }
            }
        }, { quoted: m });

        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        });

    } catch (error) {
        console.error(error);
    }
};

handler.help = ["linkgc"];
handler.command = ['linkgc'];
handler.tags = ['group'];
export default handler;