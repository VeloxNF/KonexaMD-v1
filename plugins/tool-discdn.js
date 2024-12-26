/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import fetch from 'node-fetch';
import {
	FormData,
	Blob
} from 'formdata-node';
import {
	fileTypeFromBuffer
} from 'file-type';

let handler = async (m, {
	args,
	usedPrefix,
	command
}) => {
	try {
		let q = m.quoted ? m.quoted : m;
		let mime = (q.msg || q).mimetype || '';
		if (!mime) throw 'No media found';
		let media = await q.download();
		await m.reply(wait);
		const response = await uploadToDiscdn(m.name, media);
		if (response.attachments.length !== 0) {
			const result = response.attachments[0];
			const pesan = `*Pesan Anda berhasil terkirim! 🚀*\n\n*File Detail:*\n*Name:* ${result.filename}\n\n*Type:* ${result.content_type}\n*URL:* ${result.url}\n*Ukuran:* ${formatBytes(result.size)}`;
			await m.reply(pesan);
		} else {
			await m.reply('Pesan Anda gagal terkirim. 🙁');
		}
	} catch (error) {
		console.error(error);
		await m.reply('Terjadi kesalahan dalam pemrosesan permintaan Anda. 🙁');
	}
};
handler.help = ["discdn"];
handler.tags = ["tools"];
handler.command = /^(discdn)$/i;
export default handler;

function formatBytes(bytes) {
	if (bytes === 0) {
		return '0 B';
	}
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}
async function uploadToDiscdn(fileNames, content) {
	try {

		const {
			ext,
			mime
		} = await fileTypeFromBuffer(content) || {};
		const blob = new Blob([content.toArrayBuffer()], {
			type: mime
		});
		const formData = new FormData();
		formData.append('files[0]', blob, fileNames + '.' + ext);

		const res = await (
			await fetch("https://discord.com/api/v9/channels/1180731738176094228/messages", {
				method: "POST",
				headers: {
					Authorization: "Bot MTE4MDcyODk4MjAzNjA0MTczOA.GtqzcS.grSeXjgylvsY_e7YxYi4acHKIrYTabaOnubOx8"
				},
				body: formData,
			})
		).json()
		return res;
	} catch (error) {
		console.error('Error:', error.message);
		throw error;
	}
};