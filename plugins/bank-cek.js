// Function to format number into [ 10.000 (10K) ]
function formatRupiah(amount) {
    let formatted = new Intl.NumberFormat('id-ID').format(amount);  // Format without Rp symbol.
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

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    const caption = `
*──「 B A N K  U S E R 」──*
*│📇 Name :* ${user.registered ? user.name : conn.getName(m.sender)}
*│💳 Atm :* ${user.atm > 0 ? 'Level ' + user.atm : 'Tidak Punya'}
*│🏛️ Bank :* ${formatRupiah(user.bank)}
*│💵 Money :* ${formatRupiah(user.money)} 
*│📊 Status :* ${user.premiumTime > 0 ? '√' : '×'}
*│🌟 Registered :* ${user.registered ? '√' : '×'}
*└────────── · · ·*
`.trim();
    
    conn.sendMessage(m.chat, { image: { url: 'https://en.pimg.jp/071/200/649/1/71200649.jpg' }, caption: caption }, { quoted: m });
};

handler.help = ['bank'];
handler.tags = ['rpg'];
handler.command = /^(bank)$/i;

handler.register = false;
export default handler;