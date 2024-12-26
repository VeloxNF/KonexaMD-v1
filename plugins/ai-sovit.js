import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan Prompt\n*Contoh:* ${usedPrefix + command} halo ngab`;
    m.reply('Mohon tunggu...');
    try {
    async function postData(url, data) {
      try {
        const response = await axios.post(url, {
        headers: {
        "accept": 'application/json',
        "Authorization": rose,
        "Content-Type": 'application/json'
        },
        data
        });
        console.log('Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error:', error.message);
        throw error;
      }
    }
    
    const url = 'https://api.itsrose.life/sovits/inference_text'
    const data = {
  "text": text,
  "model_id": "9197eec817f1b973c9a96d1d8762b851"
}
    
    postData(url, data)
     .then(response => {   
          conn.sendFile(m.chat, response.result.audio, '', null, m, null, true);
      })
      .catch(error => {
        return error.message;
        // Tangani kesalahan jika terjadi
      });
  } catch (e) {
    m.reply("Terjadi kesalahan");
  }
}

handler.command = handler.help = ["aisovits","sovits","svc"];
handler.tags = ["ai"];
handler.premium = true
export default handler;