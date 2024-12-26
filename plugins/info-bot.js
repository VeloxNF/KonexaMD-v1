/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
import fs from 'fs'
import os from 'os'
import { sizeFormatter } from 'human-readable'
import osu from 'node-os-utils'
    let cpux = osu.cpu
    let cpu
    let p1 = cpux.usage().then(cpuPercentage => {
        cpu = cpuPercentage
    }).catch(() => {
        cpu = NotDetect
    })
    let cpuTotal = cpux.count()
        
let formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: '2',
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})

  let cpuModel = os.cpus()[0].model
  let cpuSpeed = os.cpus()[0].speed / 1000
  let cpuCount = os.cpus().length

let handler = async (m, { conn, generateWAMessageFromContent, }) => {

  let { self,
  autoread,
  restrict,
  autorestart,
  antiCall,
  image,
  gif,
  teks,
  doc,
  gcImg,
  gcGif,
  gcTeks,
  gcDoc,
  allakses,
  viewStory } = global.db.data.settings[conn.user.jid]

    const chats = Object.keys(await conn.chats)
    const groups = Object.keys(await conn.groupFetchAllParticipating())
    const block = await conn.fetchBlocklist()
    const wm = await style(namebot, 1)
  let tag = `@${m.sender.replace(/@.+/, '')}`
  let mentionedJid = [m.sender]
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let session = fs.statSync(authFolder)
    let sts = `╭〔 Status 〕
│Active as long as ${uptime}
│ *${groups.length}* Grup
│ *${chats.length - groups.length}* Private Chats
│ *${chats.length}* Total Chats
│ *${Object.keys(global.db.data.users).length}* User
│${block == undefined ? ' *0* Diblokir' :  ` *${block.length}* Diblokir`}
│ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Banned Chat
│ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Banned User
╰╾⬣

╭〔 Sistem Bot 〕
│${antiCall ? '[ ✓ ]' : '[ ⛌ ]'} *Anti Call*
│${autoread ? '[ ✓ ]' : '[ ⛌ ]'} *Auto Read*
│${viewStory ? '[ ✓ ]' : '[ ⛌ ]'} *Auto Read Sw*
│${image ? '[ ✓ ]' : '[ ⛌ ]'} *Template Menu Image*
│${doc ? '[ ✓ ]' : '[ ⛌ ]'} *Template Menu Document*
│${gif ? '[ ✓ ]' : '[ ⛌ ]'} *Template Menu Gif*
│${teks ? '[ ✓ ]' : '[ ⛌ ]'} *Template Menu Teks*
│${restrict ? '[ ✓ ]' : '[ ⛌ ]'} *Restrict*
╰╾⬣

╭〔 Server 〕
│ *Platform*: ${process.platform}
│ *Nodejs:* ${process.version}
│ *Session Size:* ${formatSize(session.size)}
│ *Memory:* ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}
│ *Cpu:* ${cpu}% / ${cpuTotal}
│ *CPU Model:* ${cpuModel}
│ *CPU Speed:* ${cpuSpeed} GHz
╰╾⬣

${wm}`

conn.sendMessage(m.chat, {
    image: {
    url: 'https://telegra.ph/file/dfb722d432a62149bb9dc.jpg'
    }, 
    caption: sts
    }, {
    quoted: m
    })

}
handler.help = ['infobot']
handler.tags = ['main']
handler.command = /^(botstat(us)?|info(bot|server|stats|status)?)$/i

export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}