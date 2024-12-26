import { areJidsSameUser } from '@adiwajshing/baileys';
import fs from 'fs';
import canvafy from 'canvafy';

const leaderboards = [
    'atm', 'level', 'exp', 'money', 'iron', 'gold', 'diamond', 'emerald',
    'trash', 'potion', 'wood', 'rock', 'string', 'umpan', 'petfood',
    'common', 'uncommon', 'mythic', 'legendary', 'pet', 'bank', 'chip',
    'skata', 'donasi', 'deposit', 'garam', 'minyak', 'gandum', 'steak',
    'ayam_goreng', 'ribs', 'roti', 'udang_goreng', 'bacon'
];

leaderboards.sort((a, b) => a.localeCompare(b));

let handler = async (m, { conn, data, args, participants, usedPrefix, command }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return { ...value, jid: key };
    });

    let leaderboard = leaderboards.filter(v => v && users.some(user => user && user[v]));
    let type = (args[0] || '').toLowerCase();

    const getPage = item => Math.ceil(users.filter(user => user && user[item]).length / 5);
    let wrong = `🔖 Type list:
${leaderboard.map(v => `⮕ ${global.rpg.emoticon(v)} - ${v}`).join('\n')}
––––––––––––––––––––––––
💁🏻‍♂ Tip:
⮕ To view different leaderboard:
${usedPrefix}${command} [type]
★ Example:
${usedPrefix}${command} legendary`.trim();

    if (!leaderboard.includes(type)) {
        let responseText = '*––––『 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 』––––*\n' + wrong;
        return conn.sendMessage(m.chat, { text: responseText }, { quoted: m });
    }

    let page = isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 0), getPage(type)) : 0;
    let sortedItem = users.map(toNumber(type)).sort(sort(type));
    let userItem = sortedItem.map(enumGetKey);
    
    const pp = who => conn.profilePictureUrl(who, 'image').catch(_ => fs.readFileSync('./src/avatar_contact.png'));
    let dataUser = await Promise.all(sortedItem.slice(page * 5, (page + 1) * 5).map(async (user, i) => {
        return {
            top: i + 1,
            avatar: await pp(user.jid),
            tag: user.registered ? user.name : conn.getName(user.jid),
            score: parseInt(user[type]) || 0,
            jid: user.jid // Keep jid for later use
        };
    }));

    let imageLb = await topRank(type, "https://pomf2.lain.la/f/ff3tkfm.jpg", dataUser);
    
    let text = `
🏆 Rank: ${toRupiah(userItem.indexOf(m.sender) + 1)} out of ${toRupiah(userItem.length)}

                *• ${global.rpg.emoticon(type)} ${type} •*

${dataUser.map((user) => {
    if (!user.jid) return ''; // Ensure user.jid is defined
    return `${user.top}.*﹙${toRupiah(user.score)}﹚*- ${participants.some(p => areJidsSameUser(user.jid, p.id)) ? `${user.tag} \nwa.me/` : 'from other group\n @'}${user.jid.split`@`[0]}`;
}).filter(Boolean).join('\n\n')}
`.trim();

    await conn.sendFile(m.chat, imageLb, '', text, m, false, { contextInfo: { mentionedJid: conn.parseMention(text) } });
};

handler.help = ['leaderboard'];
handler.tags = ['xp'];
handler.command = /^(leaderboard|lb)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;

export default handler;

function sort(property, ascending = true) {
    return (...args) => args[ascending ? 1 : 0][property] - args[ascending ? 0 : 1][property];
}

function toNumber(property, _default = 0) {
    return (a, i, b) => {
        return { ...b[i], [property]: a[property] === undefined ? _default : a[property] };
    };
}

function enumGetKey(a) {
    return a.jid;
}

function isNumber(number) {
    if (!number) return false;
    number = parseInt(number);
    return !isNaN(number);
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".");

async function topRank(message, image, data) {
    const top = new canvafy.Top()
        .setBackground("image", image)
        .setUsersData(data)
        .build();

    return top;
}