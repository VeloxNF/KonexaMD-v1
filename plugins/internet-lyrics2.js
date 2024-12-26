import axios from "axios"

let handler = async (m, {
    text,
    conn,
    usedPrefix,
    command
}) => {
    let teks = text.split(', ')
    if (!teks[0]) return m.reply('masukan judul lagu')
    if (!teks[1]) return m.reply('masukan nama artis')

    try {
        await m.react('☕')
        let result = await songLyrics(teks[0], teks[1])
        await m.reply(result)
        await m.react('🔥')
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['lyrics2', 'lirik2']
handler.tags = ['main']

export default handler

async function songLyrics(title, artist) {
    try {
        const apiUrl = 'https://api.lyrics.ovh/v1';
        const response = await axios.get(`${apiUrl}/${artist}/${title}`);
        const data = response.data;

        if (data.lyrics) {
            return data.lyrics;
        } else {
            return 'Lirik lagu tidak ditemukan';
        }
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        return 'Terjadi kesalahan saat mencari lirik';
    }
}