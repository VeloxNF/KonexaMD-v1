import axios from "axios";

let handler = async (m, {conn, text}) => {
if (!text) {
return m.reply("[!] ex: " + command + " girl");
} 
try {
if (!m.isGroup) {
m.reply(wait)
} else if (m.isGroup) {
m.reply("Tunggu.. hasil akan dikirim ke private chat")
}
let { result } = await generateImages(text);
for (let res of result) {
await conn.sendFile(m.sender, res.url, '', `Model: \`${res.model}\``, m)
await conn.delay(1000)
}
} catch (e) {
throw eror
}
}
handler.help = handler.command = ["generateimages"]
handler.tags = ["ai"]

export default handler 

async function generateImages(prompt) {
    try {
        const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

        const userAgentList = [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36'
        ];

        const models = [
            "Glowing Forest",
            "Vector Art",
            "Princess",
            "LoL",
            "Realistic Anime",
            "West Coast",
            "Blue Rhapsody",
            "Graffiti",
            "Clown",
            "Elf"
        ];

        let pull = [];

        for (let i = 0; i < models.length; i++) {
            const randomUserAgent = userAgentList[Math.floor(Math.random() * userAgentList.length)];

            const source = await axios.post(
                'https://restapi.cutout.pro/web/ai/generateImage/generateAsync',
                {
                    prompt: prompt,
                    style: models[i],
                    quantity: 1,
                    width: 512,
                    height: 512
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": randomUserAgent,
                        "X-Forwarded-For": randomIP,
                        "Referer": "https://www.cutout.pro/zh-CN/ai-art-generation/upload"
                    }
                }
            );

            if (!source.data.data || !source.data.data.batchId) {
                throw new Error(`无法从 POST 响应中检索 batchId ${models[i]}`);
            }

            const batchId = source.data.data.batchId;

            let status = false;
            let nganu_hasil = [];

            while (!status) {
                const txt2img = await axios.get(
                    `https://restapi.cutout.pro/web/ai/generateImage/getGenerateImageTaskResult?batchId=${batchId}`,
                    {
                        headers: {
                            "Accept": "application/json, text/plain, */*",
                            "User-Agent": randomUserAgent,
                            "X-Forwarded-For": randomIP,
                            "Referer": "https://www.cutout.pro/zh-CN/ai-art-generation/upload"
                        }
                    }
                );

                const image = txt2img.data.data.text2ImageVoList;

                status = image.every(image => image.status === 1);

                if (status) {
                    const model_result = image.map((image, index) => ({
                        model: models[i],
                        url: image.resultUrl,
                        creator_scrape: "INS"
                    }));

                    pull = pull.concat(model_result);
                } else {
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }
        }

        return {result: pull}
    } catch (error) {
        throw error;
    }
}