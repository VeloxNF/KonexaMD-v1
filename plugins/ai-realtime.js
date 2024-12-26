/*
Created by Amakawa Zykuan
Thank you to QanyPaw for making the scraper
*/

import axios from "axios";

let handler = async (m, { conn }) => {
  try {
    const result = await isou(m.text); // Menggunakan m.text sebagai query
    if (result) {
      conn.reply(m.chat, result, m);
    } else {
      conn.reply(m.chat, 'Tidak dapat menemukan jawaban.', m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan.', m);
  }
}

handler.help = ['realtimeai']
handler.command = ['realtimeai']
handler.tags = ['ai']

export default handler

const api = axios.create({
  baseURL: "https://isou.chat/api",
  headers: {
    Accept: "text/event-stream",
    "Content-Type": "application/json",
  },
});

const requestData = {
  stream: true,
  model: "gpt-3.5-turbo",
  mode: "simple",
  language: "all",
  categories: ["general"],
  engine: "SEARXNG",
  locally: false,
  reload: false,
};

async function isou(q) {
  try {
    const { data } = await api.post("/search?q=" + q, requestData);
    return extractAnswers(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function extractAnswers(data) {
  let answers = "";
  const regex = /data:\{"data":"\{\\?"answer\\?":\\"(.*?)\\"/g;
  let match;
  while ((match = regex.exec(data)) !== null) {
    if (match[1]) {
      answers += match[1];
    }
  }
  return answers;
}