/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

export async function before(m, {
    isAdmin,
    isBotAdmin
}) {

    let chat = global.db.data.chats[m.chat]
    if (m.chat.endsWith('broadcast') || chat.isBanned || !chat.getmsg || global.db.data.users[m.sender].banned || m.isBaileys) return
    let msgs = global.db.data.chats[m.chat].list
    if (!(m.text in msgs)) return
    let _m = this.serializeM(JSON.parse(JSON.stringify(msgs[m.text]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)) {
            return Buffer.from(v.data)
        }
        return v
    }))
    await _m.copyNForward(m.chat, false)
    
}