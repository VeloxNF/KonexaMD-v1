import fs from 'fs';

let handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    m.reply(`*example*: ${usedPrefix + command} https://chat.whatsapp.com/BXo0tfEsvwf2VLxk3thw3t`);
    return;
  }

  let configFile = './config.js';
  let configData = fs.readFileSync(configFile, 'utf8');

  let newValue = `global.sgc = "${text}"`;

  configData = configData.replace(/global\.sourceUrl\s*=\s*".*"/, newValue);

  fs.writeFileSync(configFile, configData, 'utf8');

  m.reply('Successfully changed the sourceUrl');
};

handler.help = ['seturlgc <url>'];
handler.tags = ['owner'];
handler.owner = true;
handler.command = /^(seturlgc)$/i;

export default handler;