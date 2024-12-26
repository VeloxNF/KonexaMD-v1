const colors = [
    0xff26c4dc, 0xff792138,
    0xff8b6990, 0xfff0b330,
    0xffae8774, 0xff5696ff,
    0xffff7b6b, 0xff57c9ff,
    0xff243640, 0xffb6b327,
    0xffc69fcc, 0xff54c265,
    0xff6e257e, 0xffc1a03f,
    0xff90a841, 0xff7acba5,
    0xff8294ca, 0xffa62c71,
    0xffff8a8c, 0xff7e90a3,
    0xff74676a
]

let handler = async (m, { conn, text, args}) => {
    //let keys = Promise.resolve({ key: { id: '' }}).bind(Promise) 
    
    let keys
    
    let upping = (m.quoted) ? 
    ((m.quoted.mtype === 'conversation' ) ? 
        keys = conn.sendMessage('status@broadcast', { text: (m.quoted.text) ? m.quoted.text : m.text, textArgb: 0xffffffff, backgroundArgb: pickRandom(colors), mentions: conn.parseMention(m.quoted.text) }, { quoted: m }) : 
        keys = m.quoted.forward('status@broadcast')) : 
    ((args[0]) ? 
         keys = conn.sendMessage('status@broadcast', { text: text, textArgb: 0xffffffff, backgroundArgb: pickRandom(colors), mentions: conn.parseMention(m.text) }, { quoted: m }) : 
         keys = 'error'
        ) 

       if(upping !== 'error'){
           conn.reply(m.chat, `Done!`, m) 
       } else { conn.reply(m.chat, `Error: Maybe no text? or ${upping}`, m) }

}
handler.help = ['upsw2 <text|reply>', 'upsw2 <text>']
handler.tags = ['owner']

handler.command = /^upsw2$/i
handler.owner = true

export default handler

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}