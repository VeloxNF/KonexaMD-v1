import similarity from 'similarity'
import { createHash } from 'crypto'

const threshold = 0.72
function getRandomInt(min, max) {
	let minn = Math.ceil(min);
	let maxx = Math.floor(max);
	return Math.floor(Math.random() * (maxx - minn + 1)) + minn;
}

let handler = async (m, {text, conn}) => {
    let id = m.chat
    let user = global.db.data.users[m.sender]
    let name = conn.getName(m.sender)
    let age = getRandomInt(1, 80)
      let sn = createHash('md5').update(m.sender).digest('hex')
      const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")
      
        
    conn.regmail = conn.regmail ? conn.regmail : {}
 /*   if (!(id in conn.regmail))
        return conn.reply(m.chat, '*❗ Kode verifikasi telah kedaluwarsa.*', m)*/
        if (!text) throw '*Masukan code verifikasi untuk melanjutkan Registrasi*'
        if (text === conn.regmail[m.chat][1].jawaban) {
            global.db.data.users[m.sender].exp += conn.regmail[id][2]
            user.name = name
              user.age = age
              user.regTime = + new Date
              user.registered = true
              let cap = `
╭━━「 *Information*
│• *Name:* ${name}
│• *Age:* ${age} Years
│• *Status:* _Success_
│• *Serial Number:* ${sn}
│• *Exp:* ${conn.regmail[id][2]} Exp
╰╾•••
`
await conn.sendMessage(m.chat, { text: cap,
contextInfo:
					{
						"externalAdReply": {
							"title": " ✔️ S U C C E S S  R E G I S T R A S I",
							"body": "",
							"showAdAttribution": true,
							"mediaType": 1,
							"sourceUrl": '',
							"thumbnailUrl": pp,
							"renderLargerThumbnail": true

						}
					}}, m)
            
            clearTimeout(conn.regmail[id][3])
            delete conn.regmail[id]
        } else if (similarity(m.text.toLowerCase(), conn.regmail[m.chat][1].jawaban) >= threshold)
            m.reply(`*❗*Invalid* try again!*`)
        else
            conn.reply(m.chat, `*❌ Kode verifikasi Invalid.*`, m)
    return !0
}
handler.command = ['vercode']
export default handler