const handler = async (m, { conn, usedPrefix }) => {
  // React with an emoji
  m.react('⏳');

  const message = `*SELL SCRIPT AXELEY V1.0.0*
🏷️ Price : *Rp. 100.000 / $5.67*

*Special Features :*
🎉 • Giveaway Group
🎋 • Antilink & Welcome
🎐 • Open / Close Group Time
🍰 • Pinterest Slide
🎣 • Full Button 
🌼 • Sambutan Owner / Premium
🔞 • Xxndl & Full Nsfw 
🤖 • AI & AI Image
📛 • Anti Bot
🕹️ • 40 Mini Games
⚔️ • 100 Rpg Games
💡 • 60 Ai Features 
📊 • Leveling & Roles
👹 • Demon Slayer
🏦 • Bank Gopay / Dana / Ovo
📠 • Registrasi Captcha

*Benefits :*
• Free Apikey 1 Month, Skizo, Lolhuman, Alya
• Free Update 
• No Enc 100%

*Additional Features :*
• Non Additional Features

*Requirement :*
• NodeJS v18
• FFMPEG
• IMAGEMAGICK
• Ram Min. 5GB

Minat? *ketik .owner*`;

  const footer = 'ʟɪɢʜᴛᴡᴇɪɢʜᴛ ᴡᴀʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴀxᴇʟʟ ッ';
  const imageUrl = 'https://telegra.ph/file/d4702f9588cf88efb52c8.jpg';

  // Send message with image and footer
  await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: `${message}\n\n${footer}` });
  
  // Send additional link message
  await conn.sendMessage(m.chat, { text: 'Customer Support: https://wa.me/6288289338073' });
}

handler.help = ['sc', 'sourcecode'];
handler.tags = ['info', 'main'];
handler.command = /^(sc|sourcecode)$/i;
handler.register = false;

export default handler;