/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import { textpro2 } from '../scraper/textpro2.js'

let handler = async (m, { 
text,
conn,
usedPrefix,
command
}) => {

var txt1 = text.split('|')[0]
var txt2 = text.split('|')[1]

let cap = `*Result from* : ${usedPrefix+command} ${txt1}|${txt2}`

switch (command) {
case 'pornhub':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let pornhub = await textpro2("https://textpro.me/generate-a-free-logo-in-pornhub-style-online-977.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: pornhub}, caption: cap}, {quoted: m})

break 
case 'marvel':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let marvel = await textpro2("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: marvel}, caption: cap}, {quoted: m})

break 
case 'avangers':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let avangers = await textpro2("https://textpro.me/create-3d-avengers-logo-online-974.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: avangers}, caption: cap}, {quoted: m})

break 
case 'vintage':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let vintage = await textpro2("https://textpro.me/create-realistic-vintage-style-light-bulb-1000.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: vintage}, caption: cap}, {quoted: m})

break 
case 'glitchtext2':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let glitch2 = await textpro2("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: glitch2}, caption: cap}, {quoted: m})

break 
case 'spooky':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let spooky = await textpro2("https://textpro.me/create-a-spooky-halloween-text-effect-online-1046.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: spooky}, caption: cap}, {quoted: m})

break 
case 'marvelstudios':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let marvels = await textpro2("https://textpro.me/create-logo-style-marvel-studios-ver-metal-972.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: marvels}, caption: cap}, {quoted: m})

break 
case 'blackpinkborn':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let born = await textpro2("https://textpro.me/create-blackpink-s-born-pink-album-theme-logo-online-1092.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: born}, caption: cap}, {quoted: m})

break 
case 'space3d':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let space = await textpro2("https://textpro.me/create-space-3d-text-effect-online-985.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: space}, caption: cap}, {quoted: m})

break 
case 'gameover':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let gameover = await textpro2("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: gameover}, caption: cap}, {quoted: m})

break 
case 'glitchtext3':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let glitch3 = await textpro2("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: glitch3}, caption: cap}, {quoted: m})

break 
case 'lion':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let lion = await textpro2("https://textpro.me/create-lion-logo-mascot-online-938.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: lion}, caption: cap}, {quoted: m})

break 
case 'ninja':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let ninja = await textpro2("https://textpro.me/create-ninja-logo-online-935.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: ninja}, caption: cap}, {quoted: m})

break 
case 'promotion':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let promo = await textpro2("https://textpro.me/sale-promotion-ads-3d-text-effect-1136.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: promo}, caption: cap}, {quoted: m})

break 
case '3dretro':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let retro = await textpro2("https://textpro.me/create-3d-retro-text-effect-online-free-1065.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: retro}, caption: cap}, {quoted: m})

break 
case 'stonetext':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let stone = await textpro2("https://textpro.me/create-a-stone-text-effect-online-982.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: stone}, caption: cap}, {quoted: m})

break 
case 'steeltext':
if (!txt1) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
if (!txt2) return m.reply(`*[!]* INVALID\nExample: /${command} aku|kamu`)
m.reply(wait)

let steel = await textpro2("https://textpro.me/3d-steel-text-effect-877.html", [`${txt1}`,`${txt2}`])

conn.sendMessage(m.chat, {image: {url: steel}, caption: cap}, {quoted: m})

break 

}
}

handler.help = [
"pornhub",
"marvel",
"avangers",
"vintage",
"glitchtext2",
"spooky",
"marvelstudio",
"blackpinkborn",
"space3d",
"gameover",
"glitchtext3",
"lion",
"ninja",
"promotion",
"3dretro",
"stonetext",
"steeltext"].sort()

handler.command = [
"pornhub",
"marvel",
"avangers",
"vintage",
"glitchtext2",
"spooky",
"marvelstudio",
"blackpinkborn",
"space3d",
"gameover",
"glitchtext3",
"lion",
"ninja",
"promotion",
"3dretro",
"stonetext",
"steeltext"
]
handler.registered = handler.limit = true
handler.tags = ['logos']

export default handler