/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch'
/**
 * @type {import('@adiwajshing/baileys')}
 */
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn, text, participants }) => {
    let link = await conn.groupInviteCode(m.chat)
    if (!text) throw 'Mana nomer nya yg mau di add ke group!'
    let nomor = text.replace(/ /g, '').replace(/-/g, '').replace("+", '');
    let _participants = participants.map(user => user.id)
    let users = (await Promise.all(
        nomor.split(',')
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [
                v,
                await conn.onWhatsApp(v + '@s.whatsapp.net')
            ])
    )).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')
    const response = await conn.query({
        tag: 'iq',
        attrs: {
            type: 'set',
            xmlns: 'w:g2',
            to: m.chat,
        },
        content: users.map(jid => ({
            tag: 'add',
            attrs: {},
            content: [{ tag: 'participant', attrs: { jid } }]
        }))
    })
    const pp = await conn.profilePictureUrl(m.chat).catch(_ => null)
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
    const add = getBinaryNodeChild(response, 'add')
    const participant = getBinaryNodeChildren(add, 'participant')
    for (const user of participant.filter(item => item.attrs.error == 403)) {
        const jid = user.attrs.jid
        let teks = `Mengundang @${jid.split('@')[0]} menggunakan Link invite...`
       m.reply(teks)
       conn.sendMessage(text + '@s.whatsapp.net', {text: 'https://chat.whatsapp.com/' + link})
    }
}
handler.help = ['add', '+']
handler.tags = ['owner']
handler.command = /^(add|\+)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true


export default handler