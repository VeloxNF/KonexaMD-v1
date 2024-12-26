import fs from 'fs'

let handler = async (m, { conn, args }) => {
	let who = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : m.isGroup ? m.sender : m.chat
	let user = db.data.users[m.sender]
	let target = db.data.users[who]
    let bybu = await generateRandomCode(8);
    const chanzx = JSON.parse(fs.readFileSync("plugins/database/codereedem.json"))
    chanzx.push(bybu)
    fs.writeFileSync("./plugins/database/codereedem.json", JSON.stringify(chanzx))
     m.reply(`Success!!\nCodenya Adalah: ${bybu}`)
}

handler.help = ['buatkode']
handler.tags = ['rpg']
handler.command = /^(buatkode|createreedem)$/i

export default handler

function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}