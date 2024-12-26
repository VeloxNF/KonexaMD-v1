import fs from 'fs'

let handler = async (m, { conn }) => {
	let rules = `Peraturan Penggunaan Bot :
- Spam is prohibited
- No Calling Bots
- Don't Send Viruses To Bots

Catatan :
Bot memiliki sistem operasi yang otomatis bekerja
Owner tidak ikut campur tangan saat Bot melakukan pekerjaannya
Gunakan Bot dengan *baik* dan *bijak*
`;
	await conn.sendMessage(m.chat, { image: { url: rulesBot }, caption: rules }, m)
}
handler.help = ['rules']
handler.tags = ['main']
handler.command = /^(rules|rule)$/i;

export default handler;
