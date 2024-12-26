import axios from 'axios'
import cheerio from 'cheerio'
import base64 from 'base64-js'
const _ = (await import("lodash")).default
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai"
import { GoogleAIFileManager } from "@google/generative-ai/server"
import path from "path"
import fs from 'fs'
export async function aiAeleyGpt() {
    conn.sessiAi = conn.sessiAi ? conn.sessiAi : {};
    async function image(q, username = null, logic = "Kamu adalah Axeley. Kamu dibuat oleh 1 owner yaitu Aeley.", web = true, img) {
        let bs64 = await base64.fromByteArray(img)
        const data = {
            messages: [{
                role: "user",
                content: q,
                data: {
                    imageBase64: "data:image/jpeg;base64," + bs64 || null,
                    fileText: q || null
                }
            }, ],
            id: username,
            previewToken: null,
            userId: username,
            codeModelMode: true,
            agentMode: {},
            trendingAgentMode: {},
            isMicMode: false,
            userSystemPrompt: logic,
            maxTokens: null,
            webSearchMode: true || web,
            promptUrls: "",
            isChromeExt: false,
            githubToken: null,
        };
        const response = await axios.post("https://www.blackbox.ai/api/chat", data);

        return {
            creator: "Aeley",
            messages: response.data.split("$@$v=undefined-rv1$@$").join("")
        }
    }
    async function ai(q, username = null, logic = "Kamu adalah Sutrisno-MD. Kamu dibuat oleh 3 owner yaitu Aeley, FlameDann, dan Nabil.", web = false, sender) {
        if (!conn.sessiAi[sender]) {
            conn.sessiAi[sender] = {
                messages: [],
            };
        }
        const maxMessages = 10;
        if (conn.sessiAi[sender].messages.length >= maxMessages) {
            conn.sessiAi[sender].messages.shift(); // Hapus pesan yang paling lama
        }
        const data = {
            messages: [
                ...conn.sessiAi[sender].messages,
                {
                    role: "user",
                    content: q,
                },
            ],
            id: username,
            previewToken: null,
            userId: username,
            codeModelMode: true,
            agentMode: {},
            trendingAgentMode: {},
            isMicMode: false,
            userSystemPrompt: logic,
            maxTokens: null,
            webSearchMode: true || web,
            promptUrls: "",
            isChromeExt: false,
            githubToken: null,
        };

        const response = await axios.post("https://www.blackbox.ai/api/chat", data);

        const jawabanTerakhir = response.data.split("$@$v=undefined-rv1$@$").join("");
        conn.sessiAi[sender].messages.push({
            role: "assistant",
            content: jawabanTerakhir,
        });

        return {
            creator: "Aeley",
            messages: jawabanTerakhir,
        };
    }
    return {
        image,
        ai
    }
}
const generateRandomID = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return _.sampleSize(chars, length).join("");
};

export async function leptonAi(query) {
    try {
        const client = axios.create({
            baseURL: "https://search.lepton.run/api/",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const requestId = generateRandomID(10);
        const payload = {
            query,
            rid: requestId
        };
        const response = await client.post("query", payload);
        const match = response.data.match(
            /__LLM_RESPONSE__([\s\S]*?)__RELATED_QUESTIONS__/,
        );

        if (match?.[1]) {
            return match[1].trim();
        } else {
            throw new Error("No LLM response found.");
        }
    } catch (error) {
        console.error("Error fetching leptonAi response:", error);
        throw new Error("Error fetching LLM response: " + error.message);
    }
};

export async function askTwo(q, search = false) {
    try {
        const res = (await axios({
            method: 'post',
            url: `https://so.nuu.su/api/search?q=${encodeURIComponent(q)}`,
            headers: {
                'Accept': 'text/event-stream',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
                'Referer': `https://so.nuu.su/search?q=${encodeURIComponent(q)}`
            },
            data: {
                "stream": true,
                "model": "deepseek-chat",
                "mode": "deep",
                "language": "all",
                "categories": ["general"],
                "engine": "SEARXNG",
                "locally": false,
                "reload": false
            },
            responseType: 'json'
        })).data;

        let answer = '';
        let regex = /\\"answer\\":\\"(.*?)\\"/g;
        let match;
        let references = [];
        let regex2 = /\\"url\\":\\"(.*?)\\",\\"source\\":\\"(.*?)\\",\\"img\\":\\"(.*?)\\",\\"snippet\\":\\"(.*?)\\"/g;
        let match2;

        while ((match = regex.exec(res)) !== null) {
            if (match[1] !== "null") {
                answer += match[1].replace(/\[\[citation:[^\]]+\]\]/g, '').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
            }
        }

        while ((match2 = regex2.exec(res)) !== null && references.length < 5) {
            let url = match2[1];
            let snippet = match2[4];
            let reference = `- ${snippet} source: [${url}]`;
            references.push(reference);
        }
        if (search === true) {
            let a = answer + '\n\nReferences: \n' + references.join("\n");
            let b = a.split("\\").join("")
            let hasil = {
                creator: "Aeley",
                references: search,
                message: b
            }
            return hasil
        } else if (search === false) {
            let a = answer
            let b = a.split("\\").join("")
            let hasil = {
                creator: "Aeley",
                references: search,
                message: b
            }
            return hasil
        }
    } catch (e) {
        return e
    }
}

export async function gemini() {
const Used_Apikey = "AIzaSyB2mvsGVTZAU-h-GtCLzoLhjHEdvugx9uQ"
const genAI = new GoogleGenerativeAI(Used_Apikey);
const fileManager = new GoogleAIFileManager(Used_Apikey);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];
async function simple(query, modell = "gemini-1.5-flash") {
const modello = genAI.getGenerativeModel({ model: modell, safetySettings: safetySettings });
const resultt = await modello.generateContent(query);
const responsek = await resultt.response;
var jawab = responsek.text()
return {
creator: "Aeley",
message: jawab
}
}

async function logic(query, prompt = "Nama Kamu Adalah Nahida, Charakter Dari Game Genshin Impact. Kamu dibuat Oleh Owner Yang bernama Aeley", modell = "gemini-1.5-flash") {
const modelll = genAI.getGenerativeModel({
  model: modell,
  systemInstruction: prompt,
});
const resultp = await modelll.generateContent(query);
const responseqo = await resultp.response;
var jawab = responseqo.text();
return {
creator: "Aeley",
message: jawab
}
}

async function audio(query, prompt = "Nama Kamu Adalah Nahida, Charakter Dari Game Genshin Impact. Kamu dibuat Oleh Owner Yang bernama Aeley", modell = "gemini-1.5-flash", fileBuffer) {
const modelll = genAI.getGenerativeModel({
model: modell,
systemInstruction: prompt,
});
const base64AudioFile = fileBuffer.toString("base64");
const tempFilePathAud = path.join("tmp", `temp_audio_${Date.now()}.mp3`);
fs.writeFileSync(tempFilePathAud, fileBuffer);
const audioFile = await fileManager.uploadFile(tempFilePathAud, {
mimeType: "audio/mp3",
});
fs.unlinkSync(tempFilePathAud);
const result = await modelll.generateContent([
{
inlineData: {
mimeType: "audio/mp3",
data: base64AudioFile
}
},
{ text: query },
])
var jawab = result.response.text()
return {
creator: "Aeley",
message: jawab
}
}

async function image(query, prompt = "Nama Kamu Adalah Nahida, Charakter Dari Game Genshin Impact. Kamu dibuat Oleh Owner Yang bernama Aeley", modell = "gemini-1.5-pro", fileBufferr) {
const modepl = genAI.getGenerativeModel({
model: modell,
systemInstruction: prompt,
});
const tempFilePath = path.join("tmp", `temp_image_${Date.now()}.jpg`);
fs.writeFileSync(tempFilePath, fileBufferr);
const uploadResponse = await fileManager.uploadFile(tempFilePath, {
mimeType: "image/jpeg",
displayName: `temp_image_${Date.now()}`,
});
fs.unlinkSync(tempFilePath);
const result = await modepl.generateContent([
{
fileData: {
mimeType: uploadResponse.file.mimeType,
fileUri: uploadResponse.file.uri
}
},
{ text: 'gunakan bahasa indonesia ' + query },
]);
var jawab = result.response.text()
return {
creator: "Aeley",
message: jawab
}
}
return {
simple,
logic,
audio,
image
}
}