import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply(usedPrefix+command+" siapa kamu")
    await m.react('🔮');
    try {
        const result = await chatAi(text);
        await m.reply(result);
    } catch (error) {
        await m.react('😅');
    }

}
handler.help = ["chatai"]
handler.tags = ["ai"];
handler.command = /^(chatAi)$/i
export default handler

async function chatAi(inputValue) {
    try {
        const chatApiUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
        const chatResponse = await fetch(chatApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "Kamu adalah asisten. siap membantu segala hal dengan senang hati. kamu diciptakan oleh Tio dan tio adalah developer bot yang sudah lama dikenal banyak orang. gunakan emoji sesuai dengan jawaban di setiap kalimat."
                }, {
                    role: "user",
                    content: inputValue
                }]
            }),
        });
        const chatData = await chatResponse.json();
        return chatData.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}