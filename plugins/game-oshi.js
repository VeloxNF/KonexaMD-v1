import axios from "axios"

let handler = async (m, {text, conn}) => {
if (!text) throw "masukan nama"
try {
let result = await cek(text);
m.reply(result)
} catch (e) {
throw eror
}
}
handler.help = handler.command = ["oshi"]
handler.tags = ["game"]

export default handler 

async function cek(nama) {
  try {
    const response = await axios.post('https://cekoshi.vercel.app/api/chat', {
      messages: [{ role: 'user', content: nama }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    return data.messages;
  } catch (error) {
    console.error(error);
    return null;
  }
}