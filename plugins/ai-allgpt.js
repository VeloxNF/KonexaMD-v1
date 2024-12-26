import FormData from "form-data";
import Jimp from "jimp";
import axios from 'axios'
import fs from "fs"
import {
    ChatGpt
} from '../scraper/chatGpt.js'
import {
    GPT
} from '../scraper/GPT.js'
import {
    sendWebhookRequest
} from '../scraper/botika.js';


let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    const his = []

    const openai = 'https://telegra.ph/file/8fd766bb9f183c98ba4eb.jpg'
    let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} presiden Indonesia`
    const react = {
        react: {
            text: "⏳",
            key: m.key
        }
    }
    const reactdone = {
        react: {
            text: "✔️",
            key: m.key
        }
    }
    async function reload() {
        conn.sendMessage(m.chat, react)
    }
    async function done() {
        conn.sendMessage(m.chat, reactdone)
    }
    global.chara = global.db.data.settings[conn.user.jid]


    switch (command) {
        case "chatgpt-2":
        case 'gpt-2':
            if (!text) throw input
            reload()

            chatgpt(text).then(a => {
                conn.sendThumb(m.chat, a, openai, m)

            }).catch(err => {
                console.error(err)
                m.reply("gw pusing sorry gak bisa jawab")
            })
            done()
            break
        case 'setchara':
            if (!text) throw `[!] *wrong input*

Ex : ${usedPrefix + command} Spongebob`
            chara.cai = text
            m.reply(`success change Characters *${text}*`)
            break
        case 'boredhumans':
        case 'bored':
            if (!text) throw input
            const bored = await boredhumans(text)
            if (bored.status === false) throw 'Upps im sorry , *Error'
            conn.sendThumb(m.chat, bored.output, 'https://telegra.ph/file/72b349cdc839f55ad0103.jpg', m)

            break
        case 'onlinegpt':
        case 'ongpt':
            if (!text) throw input
            const onlineg = await onlinegpt(text)
            if (onlineg.success === false) throw 'Upps im sorry , *Error'
            conn.sendThumb(m.chat, onlineg.reply, 'https://telegra.ph/file/b8bbe65c52b75fbc3c923.jpg', m)

            break
        case 'chat-gpt':
        case 'gpt':
            if (!text) throw input
            his.push = text
            const result_ = await GPT(`${his} + ${text}`)
            if (result_.success === false) throw 'Upps im sorry , *Error'
            let pesan = await conn.sendMessage(m.chat, {
                text: '_?_'
            })
            await conn.delay(2000)
            await conn.sendMessage(m.chat, {
                text: result_.reply,
                edit: pesan.key
            })
            break
        case 'botika':
            if (!text) throw input

            try {
                const openAIResponse = await sendWebhookRequest(text);

                if (openAIResponse) {
                    console.log("Respons dari OpenAI:");
                    await m.reply(openAIResponse);
                } else {
                    console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
                }
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                await m.reply(eror);
            }
            break

    };
}
handler.tags = ["ai"];
handler.limit = handler.register = true
handler.help = ["boredhumans", "botika",  "setchara", "onlinegpt"];
handler.command = ["chat-gpt", "gpt", "boredhumans", "bored", "setchara", "onlinegpt", "ongpt", "botika"];

export default handler;


//chara - boredgumans
async function boredhumans(query, character = `${chara.cai}`) {
    return new Promise(async (resolve, reject) => {
        try {
            const danz = await axios.post('https://boredhumans.com/api_celeb_chat.php', 'message=' + query + '&intro=' + character + '&name=' + character, {
                headers: {
                    'User-Agent': 'Googlebot-News',
                }
            });
            resolve(danz.data);
        } catch (e) {
            reject(e);
        }
    });
}

// online gpt
async function onlinegpt(text) {
    try {
        const {
            data
        } = await axios(`https://onlinegpt.org/wp-json/mwai-ui/v1/chats/submit`, {
            method: "post",
            data: {
                botId: "default",
                newMessage: text,
                stream: false
            },
            headers: {
                Accept: "text/event-stream",
                "Content-Type": "application/json"
            }
        })
        return data
    } catch (err) {
        console.log(err.response.data)
        return err.response.data.message
    }
}