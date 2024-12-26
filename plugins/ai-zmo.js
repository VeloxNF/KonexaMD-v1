import axios from "axios";

let handler = async (m, {
    conn,
    command,
    text
}) => {
    if (!text) throw 'masukan prompt nya bang!';

    try {
        await m.reply(wait);
        let {
            images
        } = await zmo(text);
        await conn.sendMessage(m.chat, {
            image: {
                url: images[0].original
            },
            caption: `\`Prompt: ${text}\``
        }, {
            quoted: m
        })
    } catch (e) {
        throw eror
    }
}
handler.help = handler.command = ['zmoai']
handler.tags = ['ai']
handler.limit = true

export default handler

const ip = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

const zmo = async (prompt) => {
    const url = "https://web-backend-prod.zmo.ai/api/v1.0/microTask/makeUp/anonymous/create";
    const headers = {
        "Content-Type": "application/json",
        "App-Code": "dalle",
        "x-forwarded-for":  await ip(),
        "identify": "f944236b0480a21d0344ad661b0bae9f"
    };
    const data = {
        "subject": prompt,
        "categoryId": "b8001af87354413387180815c5f250cf",
        "styleCategoryIds": ["cdf3fddfee364bcfa31a38a9bb4d63fe"],
        "scale": "432x768",
        "resolution": "432x768",
        "numOfImages": 1
    };

    try {
        const response = await axios.post(url, data, {
            headers
        });
        const anjing = await getTaskDetails(response.data.batchTaskId);
        return anjing;
    } catch (error) {
        console.error("Error creating task:", error);
    }
}

async function getTaskDetails(batchTaskId) {
    return new Promise(async (resolve, reject) => {
        const url = `https://web-backend-prod.zmo.ai/api/v1.0/microTask/makeUp/get?batchTaskId=${batchTaskId}`;
        const headers = {
            "App-Code": "dalle",
            "x-forwarded-for":  await ip()
        };

        try {
            setTimeout(async () => {
                const response = await axios.get(url, {
                    headers
                });
                resolve(response.data);
            }, 15000);
        } catch (error) {
            console.error("Error getting task details:", error);
            reject(error);
        }
    });
}