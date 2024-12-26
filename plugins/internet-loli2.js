import axios from "axios";

let handler = async (m, {
    conn,
    text,
    command
}) => {
    

    try {
        m.reply(wait)
        let {
            data
        } = await axios.get("https://site.tioxy.my.id/api/pixiv-r18?query=loli");

        let {
            title,
            urls,
            tags,
            author,
            ext
        } = await random(data.result);

        await conn.sendMessage(m.chat, {
            image: {
                url: urls.regular
            },
            caption: `\`${title}\`\nauthor: ${author}\n${tags.map(v => v).join(" #")}`
        }, {
            quoted: m
        })

    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ["loli2"]
handler.tags = ["internet"]

export default handler

function random(list) {
    return list[Math.floor(Math.random() * list.length)]
}