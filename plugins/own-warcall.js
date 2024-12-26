let handler = async (m, { conn, text }) => {
if(!text) throw `contoh: \n.warcall kontol`
conn.relayMessage(m.chat, {
scheduledCallCreationMessage: {
callType: 2,
scheduledTimestampMs:  Date.now(),
title: text
}
}, {})
}
handler.command = handler.help = ['warcall']
handler.owner = true 
export default handler