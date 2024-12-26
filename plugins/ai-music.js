import axios from "axios";
import {
    v4 as id
} from "uuid";

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw "masukan prompt/deskripsi music"

    try {
        m.reply(`\`Waktu yang dibutuhkan mungkin lama hingga music dapat di kirim\``)
        let music = new aiMusic()
        let id = await music.create(text);
        await conn.delay(1000 * 60 * 5)
        let { data } = await music.getMusic(id);

        await conn.sendMessage(m.chat, {
            audio: {
                url: data[0].sunoData.sunoData[0].audioUrl
            },
            mimetype: "audio/mpeg",
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: data[0].sunoData.sunoData[0].title,
                    body: data[0].sunoData.sunoData[0].title,
                    mediaType: 1,
                    thumbnail: await (await conn.getFile(data[0].sunoData.sunoData[0].imageUrl)).data,
                    sourceUrl: data[0].sunoData.sunoData[0].audioUrl
                }
            }
        }, {
            quoted: m
        })
        
    } catch (e) {
        throw eror
    }

}
handler.help = handler.command = ["aimusic"]
handler.tags = ["ai"]
handler.premium = true

export default handler

/**
creator tio
**/

const ip = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

class aiMusic {
    constructor() {}

    static async getHeaders() {
        return {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "uniqueId": id(),
            "x-forwarded-for": await ip(),
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://aimusic.so/app'
        };
    }

    async create(prompt, instrumen = true) {
        try {
            let data = {
                "prompt": prompt,
                "style": "",
                "title": "",
                "customMode": false,
                "instrumental": instrumen
            };

            let headers = await aiMusic.getHeaders();
            let {
                data: res
            } = await axios.post("https://aimusic.erweima.ai/api/v1/suno/create", data, {
                headers
            });

            if (res.code == 200) {
                return res.data.recordId;
            }
        } catch (e) {
            return {
                msg: e
            };
        }
    }

    async getMusic(id) {
        try {
            let data = {
                "pendingRecordIdList": [id]
            };

            let res;
            let headers = await aiMusic.getHeaders();
        
    do {
        let response = await axios.post("https://aimusic.erweima.ai/api/v1/suno/loadPendingRecordList", data, {
            headers
        });
        res = response.data;
    } while (res.data[0].state == "queuing");

    return res
} catch (e) {
    return {
        msg: e
    };
}
}
}