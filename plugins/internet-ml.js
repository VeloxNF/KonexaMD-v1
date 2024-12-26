import axios from 'axios';

let handler = async (m, {conn, text, usedPrefix, command}) => {
let teks = text.split('|')
if (!teks[0]) return m.reply('masukan id akun ml\ncontoh: .ml id|zona')
if (!teks[1]) return m.reply('masukan zona id akun ml\ncontoh: .ml id|zona')
if (isNaN(teks[0]) || isNaN(teks[1])) return m.reply('harus angka ya')
try { 
await m.reply(wait)
let { userName } = await ml(teks[0], teks[1])
await m.reply(`NickName: ${userName}\nId: ${teks[0]}\nZona: ${teks[1]}`)
} catch (e) {
throw eror
}
}
handler.help = ['ml']
handler.tags = ['internet']
handler.command = /^(ml(stalk)?)$/i
export default handler

 async function ml(id, zoneId) {
        return new Promise(async (resolve, reject) => {
            const data = new URLSearchParams(
                Object.entries({
                    productId: "1",
                    itemId: "2",
                    catalogId: "57",
                    paymentId: "352",
                    gameId: id,
                    zoneId: zoneId,
                    product_ref: "REG",
                    product_ref_denom: "AE",
                }),
            );
            await axios
                .post("https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store",
                    data
                )
                .then((response) => {
                    resolve(response.data.data.gameDetail);
                })
                .catch((e) => {
                    console.log(e);
                    reject({
                        status: 300,
                        message: "request failed",
                    });
                });
        });
    };