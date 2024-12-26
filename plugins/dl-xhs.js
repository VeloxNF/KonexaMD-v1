import axios from "axios";
import FormData from "form-data";

let handler = async (m, {
    conn,
    text,
    command
}) => {
    if (!text) throw "masukan url";

    try {
        await m.reply(wait);

        let {
            title,
            thumbnail,
            source,
            medias
        } = await fetchData(text);

        if (medias[0].extension == "mp4") {
            await conn.sendMessage(m.chat, {
                video: {
                    url: medias[1].url
                },
                caption: `Title: ${title}\nSource: ${source}`
            }, {
                quoted: m
            })
        } else if (medias[0].extension == "jpg") {
            for (let res of medias) {
                await conn.sendMessage(m.chat, {
                    image: {
                        url: res.url
                    },
                    caption: `Title: ${title}\nSource: ${source}`
                }, {
                    quoted: m
                })
                await conn.delay(500)
            }
        } else throw "gagal fetch data"
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['xhs']
handler.tags = ['downloader']

export default handler

async function fetchData(url) {

    const instance = axios.create({
        baseURL: 'https://snapvideo.io',
        headers: {
            'Content-Type': 'ultipart/form-data'
        }
    });

    let form = new FormData();
    form.append('url', url);

    try {
        const response = await instance.post('/wp-json/aio-dl/video-data/', form);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}