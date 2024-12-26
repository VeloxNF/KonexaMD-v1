const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@adiwajshing/baileys')).default;

const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { react: { text: '🍺', key: m.key }});

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363144038483540@newsletter',
              newsletterName: 'Powered By : axelldragneel',
              serverMessageId: -1
            },
            businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
            forwardingScore: 256,
            externalAdReply: {  
              title: 'AXELLDRAGNEEL',
              thumbnailUrl: 'https://telegra.ph/file/a6f3ef42e42efcf542950.jpg',
              sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
              mediaType: 2,
              renderLargerThumbnail: false
            }
          },
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: `*Hello, @${m.sender.replace(/@.+/g, '')}!*\nSilahkan Lihat Produk Di Bawah!`
          }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({
            text: 'Powered By _WhatsApp_'
          }),
          header: proto.Message.InteractiveMessage.Header.fromObject({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [
              {
                body: proto.Message.InteractiveMessage.Body.fromObject({
                  text: '> *7 Days : 10.000*\n> *30 Days : 45.000*\n> *Permanen : 55.000*\n\n`</> Benefit Prem </>`\n\n> Get Unlimited Limit\n> Get Acces All Fitur\n> Get Profile Good'
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({}),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                  title: '`</> Premium Bot </>`\n',
                  hasMediaAttachment: true,
                  ...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/76348f605e3ff7b6b9617.jpg' } }, { upload: conn.waUploadToServer }))
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"Order Here!","url":"https://wa.me/6288289338073","merchant_url":"https://wa.me/628816609112"}`
                    }
                  ]
                })
              },
              {
                body: proto.Message.InteractiveMessage.Body.fromObject({
                  text: '> *7 Days : 7.000*\n> *30 Days : 30.000*\n> *Permanen : 50.000*\n\n`</> Benefit Sewa </>`\n\n> Auto Welcome\n> Auto Kick\n> Auto Open/Close'
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({}),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                  title: '`</> Sewa Bot </>`\n',
                  hasMediaAttachment: true,
                  ...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/864ddce7b05514d297c95.jpg' } }, { upload: conn.waUploadToServer }))
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"Order Here!","url":"https://wa.me/6288289338073","merchant_url":"https://wa.me/628816609112"}`
                    }
                  ]
                })
              },
              {
                body: proto.Message.InteractiveMessage.Body.fromObject({
                  text: '> *7 Days : 20.000*\n> *30 Days : 40.000*\n> *Permanen : 60.000*\n\n`</> Benefit Sewa </>`\n\n> Set PP Panjang\n> Unlimited Limit\n> Free Join Group'
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({}),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                  title: '`</> Jadi Bot </>`\n',
                  hasMediaAttachment: true,
                  ...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/2bb218bd6bfbbea145298.jpg' } }, { upload: conn.waUploadToServer }))
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                  buttons: [
                    {
                      name: "cta_url",
                      buttonParamsJson: `{"display_text":"Order Here!","url":"https://wa.me/6288289338073","merchant_url":"https://wa.me/628816609112"}`
                    }
                  ]
                })
              }
            ]
          })
        })
      }
    }
  }, { userJid: m.chat, quoted: m });
  
  await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
};

handler.help = ['sewabot', 'premium'];
handler.tags = ['main'];
handler.command = /^(sewa|sewabot|premium|sew)$/i;
handler.private = false;

export default handler;