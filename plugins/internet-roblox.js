import axios from "axios"

let handler = async (m, {conn, text}) => {
if (!text) throw "masukan username";

try {
m.reply(wait)
let { userId, username, isPrivate, isDeleted, placeVisitCount, valueRank, accountValue, accountRAP } = await roblox(text);

m.reply(`Username: ${username}
ID: ${userId}
accountRAP: ${accountRAP}
accountValue: ${accountValue}
isPrivate: ${isPrivate}
isDeleted: ${isDeleted}
valueRank: ${valueRank}
placeVisitCount: ${placeVisitCount}`);

} catch (e) {
throw eror
}
}
handler.help = handler.command = ["roblox"]
handler.tags = ["internet"]

export default handler

async function roblox(name) {
  try {
    const response = await axios.get(`https://rblx.trade/api/v2/users/list/value`, {
      params: {
        query: name,
        offset: 0,
        limit: 10,
        showTerminated: 1,
        showPrivate: 1,
        showNormal: 1
      },
      headers: {
        'Content-Type': "application/json"
      }
    });

    return response.data.data[0]
  } catch (error) {
    console.error(error);
    return null;
  }
}