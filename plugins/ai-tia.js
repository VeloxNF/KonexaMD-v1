/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    let id = m.sender
    const idRandom = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    conn.histo = conn.histo ? conn.histo : {}

    let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} presiden Indonesia`
    const react = {
        react: {
            text: "⏳",
            key: m.key
        }
    }
    const reactdone = {
        react: {
            text: "✔️",
            key: m.key
        }
    }
    async function reload() {
        conn.sendMessage(m.chat, react)
    }
    async function done() {
        conn.sendMessage(m.chat, reactdone)
    }


            if (!text) throw input

            try {
            
            reload()
                const openAIResponse = await sendWebhookRequest(text);

                if (openAIResponse) {
                    console.log("Respons dari OpenAI:");
                    await m.reply(openAIResponse);
                    done()
                } else {
                    console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
                }
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                await m.reply(error);
            }
}
handler.tags = ["ai"];
handler.limit = handler.register = true
handler.help = handler.command = ['tia']

export default handler;

import fetch from 'node-fetch';

export const sendWebhookRequest = async (value) => {
  const randomId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  const currentTime = new Date();
  const webhookUrl = 'https://webhook.botika.online/webhook/';
  const payload = {
    app: {
      id: "bawo5knvhib1703295668218",
      time: currentTime,
      data: {
        sender: {
          id: randomId
        },
        message: [
          {
            id: randomId,
            time: currentTime,
            type: "text",
            value: value,
          }
        ]
      }
    },
  };

  const headers = {
    'Content-Type': 'application/json',
        "Authorization": "Bearer 1j133m-yhh4-k9r4eeg6o0krboe6-r3193ogp90-phf1h21r"
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const webhookResponse = await response.json();

    if (webhookResponse) {
      const messages = webhookResponse.app.data.message;

      if (Array.isArray(messages)) {
        const responseMessages = messages.map((message) => message.value);
        const combinedResponse = responseMessages.join('\n\n').replace(/<BR>|<br>/gi, '\n').replace(/```/g, '\n');
        return combinedResponse;
      }
    } else {
      console.error('Webhook error:', webhookResponse.error);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};