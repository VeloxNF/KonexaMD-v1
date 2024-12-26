/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, {
	conn,
	args,
	command 
}) => {
 
 let type = (args[0] || '').toLowerCase()

switch (type) {
case 'limit':
	if (!args[1] || isNaN(args[1])) {
		throw '*Contoh*:.buy limit 10';
	}

	conn.sendMessage(m.chat, {
		react: {
			text: '📄',
			key: m.key,
		}
	})

	let count = parseInt(args[1]);
	let price = count * 20000;
	let users = global.db.data.users;
	let user = users[m.sender];
	if (price > user.money) {
		throw `Sorry, uang kamu tidak cukup untuk membeli ${count} limit. Harga 1 limit nya 20000 balance.`;
	}
	user.money -= price;
	user.limit += count;
	conn.reply(m.chat, `Berhasil membeli sebuah ${count} limit dengan harga ${price} money.`, m);
	break
	case 'token':
	if (!args[1] || isNaN(args[1])) {
		throw '*Contoh*:.buy token 10';
	}

	conn.sendMessage(m.chat, {
		react: {
			text: '📄',
			key: m.key,
		}
	})

	let count1 = parseInt(args[1]);
	let price1 = count1 * 25000;
	let users1 = global.db.data.users[m.sender]
	if (price1 > users1.money) {
		throw `Sorry, uang kamu tidak cukup untuk membeli ${count1} Token pet. Harga 1 Token nya 25000 balance.`;
	}
	users1.money -= price1
	users1.pet += count1
	conn.reply(m.chat, `Berhasil membeli sebuah ${count1} Token pet dengan harga ${price1} money.`, m);
	break 
	default:
	return m.reply(`List:
1. Token 25000
2. Limit 2000

contoh: /buy token 1
`)
	}
}

handler.help = ['buy limit <jumlah>'];
handler.tags = ['rpg'];
handler.command = /^buy$/i;
handler.register = true;
handler.limit = false;

export default handler;