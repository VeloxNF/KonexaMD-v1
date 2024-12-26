import uploadImage from '../lib/uploadImage.js';
import axios from "axios";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const quoted = m && (m.quoted || m);

  try {
    let link;
    if (quoted && /image/.test(quoted.mimetype || quoted.msg?.mimetype)) {
      const imageBuffer = await quoted.download();
      if (!imageBuffer) return m.reply("Gagal mendownload gambar. Coba lagi.");
      link = await uploadImage(imageBuffer); 
    } else if (args[0] && /^https?:\/\//.test(args[0])) {
      link = args[0]; 
    } else {
      return m.reply(
        `Kirim gambar dengan caption atau reply gambar, atau gunakan:\n${usedPrefix}${command} <link_gambar>`
      );
    }

    m.reply("Sedang memproses gambar, mohon tunggu...");
    let result = await imgToPrompt(link);
    if (result && result.prompt) {
      conn.reply(
        m.chat,
        `${result.prompt}`,
        m,
        {
          caption: `Hasil Prompt:\n\n${result.prompt}`, 
        }
      );
    } else {
      m.reply("Gagal mendapatkan prompt dari gambar. Coba lagi nanti.");
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan:\n\n${error}`);
  }
};

handler.help = ["prompt <link_gambar>"];
handler.tags = ["ai"];
handler.command = ["prompt"];

export default handler;

async function imgToPrompt(link) {
  try {
    let { data: image } = await axios.get(
      `https://cococlip.ai/api/v1/imagetoprompt/imageclip?image=${link}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://cococlip.ai/features/image-to-prompt",
        },
      }
    );

    let id = image.id;
    let retry = 0;
    const maxRetries = 10;

    async function queue(id) {
      let { data: response } = await axios
        .get(`https://cococlip.ai/api/v1/checkqueue?promptId=${id}`, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
            Referer: "https://cococlip.ai/features/image-to-prompt",
          },
        })
        .catch((e) => e.response);
      return response.nums;
    }

    while (retry < maxRetries) {
      let num = await queue(id);
      if (num > 1) {
        retry++;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        let { data: res } = await axios
          .get(
            `https://cococlip.ai/api/v1/imagetoprompt/imageclippoll?promptId=${id}`,
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
                Referer: "https://cococlip.ai/features/image-to-prompt",
              },
            }
          )
          .catch((e) => e.response);
        if (!res.prompt) continue;
        return res;
      }
    }
  } catch (error) {
    throw "Error fetching prompt: " + error.message;
  }
}