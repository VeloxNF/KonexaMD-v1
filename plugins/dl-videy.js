import fetch from "node-fetch"

let handler = async (m, { text, conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply("Masukkan link video yang valid!")

  try {
    let api = await fetch(`https://api.agatz.xyz/api/videydl?url=${args[0]}`)
    let json = await api.json()
    let { data } = json

    // Reaksi emoji untuk loading
    await m.react("🔄")

    // Mengganti watermark menjadi 'aeley'
    await conn.sendFile(m.chat, data, 'aeley.mp4', null, m)

    // Menghapus reaksi loading setelah mengirim file
    await m.react("✅")
  } catch (error) {
    console.error(error)
    m.reply("Terjadi kesalahan saat mengambil video!")
    // Menghapus reaksi loading setelah kesalahan
    await m.react("❌")
  }
}

handler.command = ['videydl']
handler.tags = ['downloader']
handler.help = ['videydl <link>']
export default handler