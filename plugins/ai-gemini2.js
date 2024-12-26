import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import path from "path";
import fs from "fs";

const Used_Apikey = "AIzaSyB2mvsGVTZAU-h-GtCLzoLhjHEdvugx9uQ";
const genAI = new GoogleGenerativeAI(Used_Apikey);
const fileManager = new GoogleAIFileManager(Used_Apikey);

let handler = async (m, { command, text, args }) => {
    const hann1 = args[0];
    const hann2 = text;

    if (!hann1) return m.reply('Command not specified.');

    switch (hann1) {
        case 'chat':
            await handleChat(m, hann2);
            break;

        case 'chatprompt':
            await handleChatPrompt(m, hann2);
            break;

        case 'audio':
            await handleAudio(m, hann2);
            break;

        case 'image':
            await handleImage(m, hann2);
            break;

        case 'video':
            await handleVideo(m, hann2);
            break;

        case 'help':
            m.reply(`
                .gemini2 help - untuk melihat command
                .gemini2 chatprompt - chat dengan gemini menggunakan prompt dari ryoo
                .gemini2 chat - mengobrol sama gemini menggunakan keamanan
                .gemini2 image - chat menggunakan foto dengan gemini
                .gemini2 audio - chat menggunakan audio dengan gemini
                .gemini2 video - chat menggunakan video dengan gemini
            `);
            break;

        default:
            m.reply("Maaf kak, jika ada bantuan nya ketik .gemini2 help");
    }
};

async function handleChat(m, prompt) {
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

    const modello = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });
    const resultt = await modello.generateContent(prompt);
    const textt = (await resultt.response).text();
    m.reply(textt);
}

async function handleChatPrompt(m, prompt) {
    const modell = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Nama Kamu Adalah Ryoo, Sifat Kamu Adalah Baik, Imut, dan Tenang dalam dirinya. Kamu Dibuat oleh Hann Jika ada yang ditanyakan sama Hann kamu marah",
    });

    const resultp = await modell.generateContent(prompt);
    const textl = (await resultp.response).text();
    m.reply(textl);
}

async function handleAudio(m, prompt) {
    if (!prompt) return m.reply('Mana audio sama perintahnya?');
    if (!m.quoted) return m.reply('Reply/kirim audionya!');

    const modelll = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fileBuffer = await m.quoted.download();
    const base64AudioFile = fileBuffer.toString("base64");
    const tempFilePathAud = path.join(process.cwd(), `temp_audio_${Date.now()}.mp3`); // Use process.cwd() for current directory
    fs.writeFileSync(tempFilePathAud, fileBuffer);
    
    const audioFile = await fileManager.uploadFile(tempFilePathAud, { mimeType: "audio/mp3" });
    fs.unlinkSync(tempFilePathAud);
    const result = await modelll.generateContent([{ inlineData: { mimeType: "audio/mp3", data: base64AudioFile } }, { text: prompt }]);
    m.reply(result.response.text());
}

async function handleImage(m, prompt) {
    if (!m.quoted) return m.reply('Reply to the image');

    const modepl = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const fileBufferr = await m.quoted.download();
    const tempFilePath = path.join(process.cwd(), `temp_image_${Date.now()}.jpg`); // Use process.cwd() for current directory
    fs.writeFileSync(tempFilePath, fileBufferr);
    
    const uploadResponse = await fileManager.uploadFile(tempFilePath, { mimeType: "image/jpeg", displayName: `temp_image_${Date.now()}` });
    fs.unlinkSync(tempFilePath);
    const result = await modepl.generateContent([{ fileData: { mimeType: uploadResponse.file.mimeType, fileUri: uploadResponse.file.uri } }, { text: 'gunakan bahasa indonesia ' + prompt }]);
    m.reply(result.response.text());
}

async function handleVideo(m, prompt) {
    if (!m.quoted) return m.reply('Reply to the video');

    const modelk = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const fileBufferrp = await m.quoted.download();
    const tempFilePathp = path.join(process.cwd(), `temp_video_${Date.now()}.mp4`); // Use process.cwd() for current directory
    fs.writeFileSync(tempFilePathp, fileBufferrp);
    
    const uploadResponseee = await fileManager.uploadFile(tempFilePathp, { mimeType: "video/mp4", displayName: `temp_video_${Date.now()}` });
    fs.unlinkSync(tempFilePathp);
    const hasilnya = await modelk.generateContent([{ fileData: { mimeType: uploadResponseee.file.mimeType, fileUri: uploadResponseee.file.uri } }, { text: 'gunakan bahasa indonesia ' + prompt }]);
    m.reply(hasilnya.response.text());
}

handler.help = ["gemini"];
handler.tags = ["ai"];
handler.command = /^(gemini2)$/i;
handler.register = true;

export default handler;