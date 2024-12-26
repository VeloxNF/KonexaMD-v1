import axios from "axios"
const {
    proto,
    generateWAMessageFromContent,
    generateWAMessageContent
} = (await import("@adiwajshing/baileys")).default

let handler = async (m, {
    text,
    command
}) => {
    if (!text) throw "masukan pencarian!";

    try {
        m.reply(wait)
        let {
            data
        } = await axios.get("https://vectorart.ai/api/list?from=0&q=" + text);

        async function createImage(url) {
            const {
                imageMessage
            } = await generateWAMessageContent({
                image: {
                    url
                }
            }, {
                upload: conn.waUploadToServer
            })
            return imageMessage
        }

        let {
            results
        } = data;
        let hasil = results.slice(0, 10),
            push = [];
        for (let pus of hasil) {
            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `\`${pus.description}\``
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: namebot
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '*' + command.toUpperCase() + '*',
                    hasMediaAttachment: true,
                    imageMessage: await createImage(pus.url)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [{}]
                })
            })
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: command.toUpperCase()
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: namebot
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: [
                                ...push
                            ]
                        })
                    })
                }
            }
        }, {
            quoted: m,
            userJid: m
        })

        await conn.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id
        })
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ["vectorart"]
handler.tags = ["internet"]

export default handler