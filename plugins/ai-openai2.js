/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
    
    try {
        let aii = await fetch(`https://aemt.me/gpt4?text=${text}`)
  let oke = await aii.json()
  let { key } = await conn.sendMessage(m.chat, {text: wait}, { quoted: m });
await conn.delay(1000)
  await conn.sendMessage(m.chat, { text: `${oke.result}`, edit: key }, { quoted: m });
       
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["openai2"]
handler.tags = ["ai"];
handler.command = /^(openai2|ai2)$/i
handler.register = handler.limit = true
export default handler