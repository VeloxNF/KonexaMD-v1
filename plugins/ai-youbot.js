import axios from "axios";

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {

    if (!text) throw `${usedPrefix + command} siapa presiden Indonesia`;

    try {
        let {
            key
        } = await conn.sendMessage(m.chat, {
            text: "waiting...."
        }, {
            quoted: m
        })

        let {
            response
        } = await youbot(text);
        await conn.sendMessage(m.chat, {
            text: response,
            edit: key
        }, {
            quoted: m
        })

    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['youai', 'youbot']
handler.tags = ['ai']

export default handler

async function youbot(text) {
    const url = 'https://app.yoursearch.ai/api';
    const data = {
        searchTerm: text,
        promptTemplate: "Istilah pencarian: \"{searchTerm}\"\n\nBuatlah ringkasan dari hasil pencarian dalam tiga paragraf dengan nomor referensi, yang kemudian Anda daftarkan secara bernomor di bagian bawah.\nSertakan emoji dalam ringkasan.\nPastikan untuk menyertakan nomor referensi dalam ringkasan.\nBaik dalam teks ringkasan maupun daftar referensi, nomor referensi harus terlihat seperti ini: \"(1)\".\nRumuskan kalimat-kalimat sederhana.\nSertakan baris kosong antara paragraf.\nJangan memulai dengan pengantar, tetapi langsung mulai dengan ringkasan.\nSertakan emoji dalam ringkasan.\nDi akhir, tulis teks petunjuk di mana saya bisa menemukan hasil pencarian sebagai perbandingan dengan istilah pencarian di atas dengan tautan ke pencarian Google dalam format ini `Lihat hasil Google: ` dan tambahkan tautannya.\nDi bawah ini tuliskan tip bagaimana saya bisa mengoptimalkan hasil pencarian untuk kueri pencarian saya.\nSaya tunjukkan dalam format berikut:\n\n```\n<Ringkasan hasil pencarian dengan nomor referensi>\n\nSumber:\n(1) <URL referensi pertama>\n(2) <URL referensi kedua>\n\n<Teks petunjuk untuk hasil pencarian lebih lanjut dengan tautan Google>\n<Tip>\n```\n\nBerikut adalah hasil pencarian:\n{searchResults}",
        searchParameters: "{}",
        searchResultTemplate: "[{order}] \"{snippet}\"\nURL: {link}"
    };

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, data, {
            headers
        });
        console.log('POST request successful!');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}