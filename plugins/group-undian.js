const items = [
    "money", "limit", "premium"
]

let handler = async (m, { conn, usedPrefix, command, args, groupMetadata }) => {
    let type = (args[0] || '').toLowerCase()
    let count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
    let user = global.db.data.users

    if (!args[0]) return m.reply('Masukkan nama item yang ingin di giveaway')
    if (!args[1]) return m.reply('Masukkan jumlah item yang ingin di giveaway')
    if (!items.includes(type)) return m.reply(`Daftar Item Yang Bisa Di Giveaway:\n${items.map(v => v).join('\n')}`)
    if (user[m.sender][type] * 1 < count) return m.reply(`Mohon Maaf ${type} Tidak Cukup, Kamu hanya memiliki ${user[m.sender][type]} ${type}!`)

    let random = groupMetadata.participants.map(v => v.id)
    let winner = random.getRandom()

    await m.reply('Sedang Mencari Pemenang...')
    await delay(10000)

    if (typeof user[winner] === 'undefined' || user[winner] === m.sender || user[winner] === conn.user.jid) {
        let random2 = groupMetadata.participants.map(v => v.id)
        let winner2 = random2.getRandom()

        await m.reply('Pemenang Tidak Valid, Mencari Ulang...')
        await delay(10000)

        if (typeof user[winner2] === 'undefined' || user[winner2] === m.sender || user[winner2] === conn.user.jid) {

            let random3 = groupMetadata.participants.map(v => v.id)
            let winner3 = random2.getRandom()

            await m.reply('Pemenang Tidak Valid, Mencari Ulang...')
            await delay(10000)

            await m.reply(`Selamat Kepada @${winner3.split('@')[0]} Telah Mendapatkan ${count} ${type} `, false, { contextInfo: {mentionedJid : [winner3]}}).then(() => {
                user[m.sender][type] -= count
                user[winner3][type] += count
            })
        } else {
            await m.reply(`Selamat Kepada @${winner2.split('@')[0]} Telah Mendapatkan ${count} ${type} `, false, { contextInfo: {mentionedJid : [winner2]}}).then(() => {
                user[m.sender][type] -= count
                user[winner2][type] += count
            })
        }

    } else {
        await m.reply(`Selamat Kepada @${winner.split('@')[0]} Telah Mendapatkan ${count} ${type} `, false, { contextInfo: {mentionedJid : [winner]} }).then(() => {
            user[m.sender][type] -= count
            user[winner][type] += count
        })
    }
}
handler.help = ['undian']
handler.tags = ['rpg']
handler.command = /^(undi(an)?)$/i

handler.group = true

export default handler



// Baris Baru
function isNumber(x) {
    return !isNaN(x)
}

const delay = time => new Promise(res => setTimeout(res, time))