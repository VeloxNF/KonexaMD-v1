export async function before(m, {
    conn,
    participants
}) {
    // Inisialisasi state jika belum ada
    if (!conn.time_join) {
        conn.time_join = {
            join: false,
            time: 0,
        };
    }

    const currentTime = Math.floor(Date.now() / 1000);

    // Cek apakah pesan berasal dari grup dan apakah sudah memenuhi cooldown
    if (!m.isGroup || conn.time_join.time > currentTime) {
        console.log("Not a group message or still in cooldown");
        return;
    }

    // Cek apakah pengirim adalah user premium
    const isCek = global.db.data.users[m.sender];

    let messageText = "";
    
    switch (m.sender) {
        case info.nomerown+"@s.whatsapp.net":
        
            messageText = "📣 *Perhatian semua, Ownerku telah tiba disini sambutlah Raja Iblis Terkuat Aeley* ";
            break 
        default:
            if (isCek.owner) {
                messageText = "Selamat datang, Owner !";
            }
            if (isCek.premium) {
                messageText = "Selamat datang, user premium !";
            }
            break;
    }

    // Kirim pesan jika ada teks sambutan yang harus dikirim
    if (messageText) {
        await conn.sendMessage(
            m.chat, {
                text: messageText,
            }, {
                quoted: m
                
            }
        );

        // Atur ulang state time_join untuk cooldown
        conn.time_join = {
            join: true,
            time: currentTime + 2400, // Cooldown 2 detik
        };
    } else {
        console.log("No message to send");
    }
}