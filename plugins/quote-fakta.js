/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'


let handler  = async (m, { conn, command }) => {
            const { data } = await axios.get(`https://raw.githubusercontent.com/HasamiAini/Bot_Takagisan/main/faktanya.txt`)
        
                let splitnix = data.split('\n')
                let rendem = splitnix[Math.floor(Math.random() * splitnix.length)]
                conn.sendThumb(m.chat, rendem, flaaa.getRandom() + command, m)
                // conn.sendFile(m.chat, flaaa.getRandom() + command, '', rendem, m)

} 
handler.help = ['fakta']
handler.tags = ['quotes']
handler.command = /^(fakta|faktaunik)$/i

handler.fail = null

export default handler