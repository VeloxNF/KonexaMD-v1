import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data'; 
import { v4 as rf } from 'uuid';

const headers = {
  'authority': 'sara.study',
  'accept': '*/*',
  'origin': 'https://sara.study',
  'referer': 'https://sara.study/',
  'user-agent': 'Postify/1.0.0',
  'x-forwarded-for': Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.'),
};

const meki = (error) => {
  const ros = error.response ? error.response.data : error.message;
  console.error(ros);
  throw new Error(ros);
};

const cform = (key, value, filename = null, contentType = null) => {
  const formData = new FormData();
  formData.append(key, value, filename ? { filename, contentType } : {});
  return formData;
};

const SaraStudyAI = {
  async question(question) {
    const formData = cform('question', question);
    try {
      const response = await axios.post("https://sara.study/api/questions", formData, {
        headers: { ...headers, ...formData.getHeaders() },
      });
      return response.data; 
    } catch (error) {
      meki(error);
    }
  },

  async upload(img) {
    let imgb;
    const urn = `${rf()}.jpg`;

    try {
      if (Buffer.isBuffer(img)) {
        imgb = img;
      } else if (typeof img === 'string') {
        imgb = img.startsWith('http://') || img.startsWith('https://')
          ? Buffer.from((await axios.get(img, { responseType: 'arraybuffer' })).data)
          : fs.readFileSync(img);
      } else {
        throw new TypeError('Hadeh, upload image nya cuman bisa pake Path File, Link Gambar atau Buffer aja bree 🫵');
      }

      const formData = cform('image', imgb, urn, 'image/jpeg');
      const response = await axios.post("https://sara.study/api/questions", formData, {
        headers: { ...headers, ...formData.getHeaders() },
      });
      return response.data; 
    } catch (error) {
      meki(error);
    }
  },
};

let handler = async (m, { conn, text }) => {
    const args = text.split('|').map(arg => arg.trim());

    if (args.length < 1 || args.length > 2) {
        throw 'Harap masukkan format yang benar: \n\n *sara <query> | <image>*\n\nContoh penggunaan: \n *sara Apa itu AI?* atau *sara | <link_gambar>*';
    }

    const [query, image] = args;

    await m.react('⌛'); 

    try {
        let result;

        if (query) {
            result = await SaraStudyAI.question(query);
            if (result.solution && result.solution.answer) {
                m.reply(`🌟 *Response:* ${result.solution.answer}\n\n*Explanation:* ${result.solution.explanation || "Tidak ada penjelasan."}`);
            } else {
                m.reply('Tidak ada jawaban yang ditemukan.');
            }
        }

        if (image) {
            result = await SaraStudyAI.upload(image);
            if (result.solution && result.solution.answer) {
                m.reply(`🖼️ *Image Response:* ${result.solution.answer}`);
            } else {
                m.reply('Gagal mengupload gambar atau tidak ada jawaban yang ditemukan.');
            }
        }
    } catch (error) {
        m.reply(`Error: ${error.message || JSON.stringify(error)}`); // Handle error response
    }
};

handler.help = ['sara <query> | <image>'];
handler.tags = ['ai'];
handler.command = /^(sara)$/i;

export default handler;