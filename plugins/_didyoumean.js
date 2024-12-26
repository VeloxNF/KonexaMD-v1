/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/


import didyoumean from 'didyoumean'
import similarity from 'similarity'

let handler = m => m

handler.before = function (m, { match, usedPrefix, text, args }) {
	if ((usedPrefix = (match[0] || '')[0])) {
		let noPrefix = m.text.replace(usedPrefix, '')
		let args = noPrefix.trim().split` `.slice(1)
		let text = args.join` `
		let alias = Object.values(global.plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
		if (alias.includes(noPrefix)) return
		let mean = didyoumean(noPrefix, alias)
		let sim = similarity(noPrefix, mean)
		let som = sim * 100
       	let yoo = `Are you looking for the following menu? 

 ◦ Name Command: *${usedPrefix + mean}* 
 ◦ Results of Similarities: *${parseInt(som)}%*
 `
    

	 if (mean) conn.sendMessage(m.chat, {
text: yoo,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: namebot,
body: sig,
thumbnailUrl: didyou,
sourceUrl: sig,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
	}
  }

export default handler