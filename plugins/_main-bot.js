const handler = async (m, {
    conn,
    command,
    isOwner
}) => {
    let aeley = '6288289338073@s.whatsapp.net'
    let capt = `Whats Up Bro! @${m.sender.replace(/@.+/g, '')}`
    conn.reply(m.chat, `${capt}\n\n> Powered By _@${aeley.replace(/@.+/g, '')}_`, m)
}

handler.customPrefix = /^(bot|bot?|bott)$/i
handler.command = new RegExp

export default handler