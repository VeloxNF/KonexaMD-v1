import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    text,
    command
}) => {
    if (!text) throw `masukan link Instagram threads\n\n[!] .${command} https://www.threads.net/@lysa_tangkulung/post/C9E6EHtxSDJ?xmt=AQGzQLLa0XYPeolw9muZOKoojZNohPqWtvmGbgEj7jtu7Q`;

    try {
        await m.reply(wait)
        let {
            result
        } = await threads(text);
        for (let i of result) {
            await conn.sendFile(m.chat, i, '', null, m)
        }

    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ["threads"]
handler.tags = ["downloader"]

export default handler

/**
@credit Tio
@threads downloader
**/

async function threads(url) {

    const regex = /post\/([^/?]+)/;
    const match = url.match(regex);
    const id = match ? match[1] : null;

    if (id) {
        let headers = {
            accept: "*/*"
        };

        let {
            data
        } = await axios.get(`https://threadster.app/download/${id}`, {
            headers
        });
        let $ = cheerio.load(data);
        const result = [];

        // jikok ling gambar 
        $('.download__items .image img').each((index, element) => {
            const imgUrl = $(element).attr('src');
            if (imgUrl) {
                result.push(imgUrl);
            } else {
                false
            }
        });

        // jikok ling video bokep
        $('.download__wrapper .download__items .download_item.active .video_wrapper .video video').each((index, element) => {
            const videoUrl = $(element).attr('src');
            if (videoUrl) {
                result.push(videoUrl);
            } else {
                false
            }
        });

        return {
            result
        }

    } else {
        return {
            msg: "koe pekok su ra enek id ne"
        }
    }

}