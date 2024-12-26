/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = m => m
handler.before = m => {
  let user = global.db.data.users[m.sender]

if (!m.isGroup) return false
  if (user.afk > -1) {
    m.reply(`
Masih hidup ternyata wkwk\nKamu Berhenti AFK${user.afkReason ? ' Setelah ' + user.afkReason : ''}
Selama ${(new Date - user.afk).toTimeString()}
`.trim())
    user.afk = -1
    user.afkReason = ''
  }
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    let user = global.db.data.users[jid]
    if (!user) continue
    let afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || ''
    m.reply(`
Jangan Tag Dia bang!
Dia Sedang AFK ${reason ? 'Dengan Alasan ' + reason : 'Tanpa Alasan'}
Selama ${(new Date - afkTime).toTimeString()}
`.trim())
  }
  return true
}

export default handler