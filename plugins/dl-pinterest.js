const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("@adiwajshing/baileys")).default
import axios from 'axios';

let handler = async (m, {text, command, conn}) => {
if (!text) throw 'masukan query'
try {
await m.reply(wait)

async function createImage(url) {
  const { imageMessage } = await generateWAMessageContent({
    image: {
      url
    }
  }, {
    upload: conn.waUploadToServer
  })
  return imageMessage
}
let push = []
let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
let res = data.resource_response.data.results.map(v => v.images.orig.url);
let ult = res.splice(0, 6)
for (let pus of ult) {
push.push({
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: text
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: wm
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '*' + command.toUpperCase() + '*',
                hasMediaAttachment: true,
                imageMessage: await createImage(pus)
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
            text: wm
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
      }, {quoted: m, userJid: m})

await conn.relayMessage(m.chat, msg.message, {
  messageId: msg.key.id
})

} catch (e) {
throw eror
}
}

handler.help = ['pinterest']
handler.tags = ['internet']
handler.command = /^(pin(terest)?)$/i

export default handler