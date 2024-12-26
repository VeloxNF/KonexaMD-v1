import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`• *Example:* ${usedPrefix + command} sunset`);

  await m.reply('_Please Wait..._');

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url }
    }, {
      upload: conn.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let push = [];
  let res = [];

  // Mengambil gambar dari API txt2img
  for (let i = 0; i < 5; i++) {
    const url = `https://widipe.com/ai/text2img?text=${text}`;
    res.push(url); // Menyimpan URL gambar
  }

  shuffleArray(res); // Acak hasilnya
  let i = 1;

  for (let imgUrl of res) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Txt2Img Ke ${i++}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '© 2024 Aeley D Elmora ' // Sesuaikan dengan watermark Anda
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: '',
        hasMediaAttachment: true,
        imageMessage: await createImage(imgUrl)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_url",
            "buttonParamsJson": `{"display_text":"Source UrlðŸ”","url":"https://widipe.com/ai/text2img?text=${text}"}`
          }
        ]
      })
    });
  }

  const bot = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: ""
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `Hasil Dari Txt2Img : ${text}` // Sesuaikan dengan watermark Anda
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [...push]
          })
        })
      }
    }
  }, {});

  await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
}

handler.help = ["txt2img"]
handler.tags = ["ai"]
handler.command = /^(txt2img|text2image)$/i

export default handler;