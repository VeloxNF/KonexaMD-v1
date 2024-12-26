import PhoneNumber from 'awesome-phonenumber';
import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
    // Loading sederhana
    await conn.sendMessage(m.chat, { text: 'Loading...' });

    let d = new Date();
    let locale = 'id';

    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let wktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

    if (typeof db.data.users[who] === 'undefined') {
        return m.reply('Pengguna tidak ada di dalam database.');
    }

    let user = db.data.users[who];
    let name = user.registered ? user.name : conn.getName(who);

    // Format money dalam bentuk [ 10.000 (10K) ]
    let money = formatRupiah(user.money || 0);
    let bank = formatRupiah(user.bank || 0);
    let limit = user.limit || 0;
    let level = user.level || 0;
    let role = user.role || 'User';
    let xp = user.xp || 0;
    let warn = user.warn || 0;

    let banned = user.banned ? '√' : '×';
    let blocked = user.blocked ? '√' : '×';
    let registered = user.registered ? '√' : '×';

    // Informasi premium dan expired
    let isPremium = user.premium;  // Mengganti user.premiumTime dengan user.premium
    let premiumStatus = isPremium ? '√' : '×';
    let premiumExpire = isPremium ? moment(user.premiumTime).format('DD MMMM YYYY') : 'Tidak Aktif';

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg');
    let bio = await conn.fetchStatus(who).then(res => res.status).catch(_ => 'Tidak Ada Bio');

    // Calculate bot runtime
    let uptime = process.uptime();  // Runtime in seconds
    let runtime = formatRuntime(uptime); // Formatted runtime string

    // Menyiapkan pesan info pengguna dengan contextInfo
    let status = who.split('@')[0] == global.nomorwa ? '🎗️ᴅᴇᴠᴇʟᴏᴘᴇʀ🎗️' : isPremium ? '👑ℙ𝕣𝕖𝕞𝕚𝕦𝕞👑' : user.level >= 1000 ? 'Elite' : 'Free';
    let caption = `*I N F O - U S E R*

┌ • *Nama :* ${name}
│ • *Bio :* ${bio}
│ • *Tag :* @${who.replace(/@.+/, '')} (${name})
│ • *Nomor :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
├───────────
│ • *Money :* ${money}
│ • *Bank :* ${bank}
│ • *Limit :* ${limit}
│ • *Level :* ${level}
│ • *Role :* ${role}
│ • *XP :* ${xp}
├───────────
│ • *Blocked :* ${blocked}
│ • *Banned :* ${banned}
│ • *Warn:* ${warn}/5
├───────────
│ • *Verified :* ${registered}
│ • *Premium :* ${premiumStatus}
└ • *Expired :* ${premiumExpire}


*Status :* ${status}`;

    // Mengirim pesan dengan gambar profil pengguna sebagai thumbnail dan contextInfo
    await conn.sendMessage(m.chat, {
        image: { url: pp },
        caption: caption,
        mentions: [who],  // Menambahkan mention disini
        contextInfo: {
            externalAdReply: {
                mediaType: 1,  // Type media: 1 for image, 2 for video, 3 for audio, etc.
                title: name,
                body: `Runtime: ${runtime}`,  // Bot runtime included here
                thumbnailUrl: 'https://telegra.ph/file/bd27d56b0af6f566d550a.jpg',  // Thumbnail and ContextInfo as one
            }
        }
    });
};

handler.command = /^(|userinfo|profile|me)$/i;
handler.tags = ['info'];
handler.help = ['profile @user'];

// Function to format runtime into HH:mm:ss
function formatRuntime(seconds) {
    let pad = (s) => (s < 10 ? '0' : '') + s;
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds % 3600 / 60);
    let secs = Math.floor(seconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

// Function to format number into [ 10.000 (10K) ]
function formatRupiah(amount) {
    let formatted = new Intl.NumberFormat('id-ID').format(amount);  // Format tanpa simbol Rp.
    let suffix = '';

    if (amount >= 1e9) {
        suffix = `${(amount / 1e9).toFixed(1)}M`;
    } else if (amount >= 1e6) {
        suffix = `${(amount / 1e6).toFixed(1)}JT`;
    } else if (amount >= 1e3) {
        suffix = `${(amount / 1e3).toFixed(1)}K`;
    } else {
        suffix = amount.toString();
    }

    return `[ ${formatted} (${suffix}) ]`;
}

export default handler;