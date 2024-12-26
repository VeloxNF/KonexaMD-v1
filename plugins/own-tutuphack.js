let handler = async (m, { conn }) => {

conn.relayMessage(m.chat, {
scheduledCallCreationMessage: {
callType: 2,
scheduledTimestampMs:  Date.now(),
title: 'WELCOME BACK'
}
}, {})
}
handler.command = ['tutup']
handler.owner = true 
export default handler