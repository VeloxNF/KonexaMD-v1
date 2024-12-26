/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, {
    text
}) => {
    if (!text) throw 'input link'

    try {
        let res = await axios.get(text) // Perubahan di sini
        m.reply(Object.keys(res.headers).map((v) => `• ${v}: ${res.headers[v]}`).join('\n'))
} catch (e) {
throw eror
}
    
}
handler.help = ['headers']
handler.command = /^(head(ers)?)$/i
handler.tags = ['tools']

export default handler