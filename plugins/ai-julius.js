import { v4 as uuidv4 } from 'uuid';

const DEFAULT_UUID = uuidv4();

let handler = async (m, { conn, usedPrefix, command, text }) => {
  conn.julius = conn.julius ? conn.julius : {}; // Sessions Chat

  switch (command) {
    case "julius": {
      if (!text) throw `*• Contoh :* ${usedPrefix + command} *[query]*`;

      const { key } = await conn.sendMessage(m.chat, {
        text: "Processing..."
      }, { 
        quoted: m
      });

      let result;
      let sessionId = conn.julius[m.sender] || DEFAULT_UUID;

      // Mock response based on the input text
      result = `You asked: "${text}". This is a mock response for session: ${sessionId}.`;

      await conn.sendMessage(m.chat, {
        text: `*[ 🔵 Julius - AI ]*
*- Sessions Chat :* ${sessionId}
------------------------------------------------
${result}
------------------------------------------------
> Powered by Mock Response`,
        edit: key
      });

      // Save session ID if it's the first time
      if (!conn.julius[m.sender]) {
        conn.julius[m.sender] = DEFAULT_UUID;
      }
      break;
    }
  }
};

handler.help = ['julius'].map(a => a + " *[query]*");
handler.tags = ["ai"];
handler.command = ["julius"];

export default handler;