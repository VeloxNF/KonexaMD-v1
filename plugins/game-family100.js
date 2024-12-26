import { family100 } from '@bochilteam/scraper'
const winScore = 4999
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', this.game[id].msg)
        throw false
    }
    const json = await family100()
    let caption = `
*waktu 120 detik*
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
+${winScore} XP tiap jawaban benar
    `.trim()
    this.game[id] = {
        id,
        msg: await this.reply(m.chat, caption, m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
        waktu: setTimeout(() => {
        conn.reply(m.chat, `*soal telah berakhir*\n\nsoal: `+this.game[id].soal+'\njawaban: '+this.game[id].jawaban.map(v => v).join('\n'), m)
        delete this.game[id]
        }, 120000)
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i
handler.register = true

export default handler