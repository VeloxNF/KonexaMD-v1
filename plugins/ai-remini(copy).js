/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

/**
import uploadImage from '../lib/uploadImage.js'
import uploadFile from '../lib/uploadFile.js'

let handler = async (m, {
    conn,
    command,
    usedPrefix
}) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'media not found'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g)/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)

    try {
        m.reply(wait)
        const result = await runReplication(link);
        await conn.sendFile(m.chat, result, '', `*Result from*: ${usedPrefix+command}`, m)
    } catch (e) {
        throw e
    }

}
handler.help = ['remini (swap face']
handler.command = /^(remini)$/i
handler.tags = ['ai']
handler.premium = false

export default handler

const Replicate = await (await import("replicate")).default;

const replicate = new Replicate({
    auth: 'r8_XatZQWOTvViMWhlCTfNhM4yr0L3w99E1jgFhA',
});

const runReplication = async (url) => {
    const output = await replicate.run(
        "mv-lab/swin2sr:a01b0512004918ca55d02e554914a9eca63909fa83a29ff0f115c78a7045574f", {
            input: {
                task: "real_sr",
                image: url
            }
        }
    );
    return output;
};
**/