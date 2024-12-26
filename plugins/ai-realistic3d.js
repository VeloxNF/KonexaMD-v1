import fetch from 'node-fetch';
const mess = {
  wait: '⌛ Please wait, processing your request...',
  done: '✅ Here is your generated 3D model image:',
};
let lastUsed;
const handler = async (m, { conn, args, command }) => {
  const text = args.join(' ');
  if (typeof lastUsed === 'undefined') {
    lastUsed = 0;
  }
  if (!text) {
    return conn.sendMessage(m.chat, { text: `• Contoh: .3dmodel night` }, { quoted: m });
  }
  
  const cooldownTime = 10000;
  if (Date.now() - lastUsed < cooldownTime) {
    return conn.sendMessage(m.chat, { text: "Cooldown 10 detik bang,Coba Nanti" }, { quoted: m });
  }
  lastUsed = Date.now();

  try {
    await conn.sendMessage(m.chat, { text: mess.wait }, { quoted: m });
    const response = await fetch(`https://itzpire.com/ai/${command}?prompt=${encodeURIComponent(text)}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const gpt = await response.json();
    await conn.sendMessage(m.chat, {
      image: { url: gpt.result },
      caption: mess.done,
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: '*Sedang Tidak Merespon*' }, { quoted: m });
  }
};
handler.help = ['3dmodel', 'render3d', 'realistic'];
handler.tags = ['ai'];
handler.command = /^3dmodel|render3d|realistic$/i;
export default handler;