let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*• Example :* ${usedPrefix + command} *[name chara]*`
    m.reply(wait)
    try {
        let chara = await func.fetchJson("https://api-blue-archive.vercel.app/api/characters/students?name=" + text)
        let poto = await pinterest(text)
        
        let cap = `*[ CHARA BLUE ARCHIVE INFO ]*
 *• Name :* ${chara.data[0].names.japanName} *[ ${chara.data[0].names.firstName} ${chara.data[0].names.lastName} ]*
*• Age :* ${chara.data[0].age} TH
*• Birthday :* ${chara.data[0].birthday}
*• Study In :* ${chara.data[0].school}
*• Hobbies :* ${chara.data[0].hobbies.map(a => a + ", ").join(" ")}
*• Height:* ${chara.data[0].height}
*• Use Weapon :* ${chara.data[0].weapon}
        ${chara.data[0].background}`
        
        if (chara.data.length < 1) {
            cap = "*[ CHARA NOT FOUND ]*"
        }    
        await conn.sendMessage(m.chat, { image: { url: poto }, caption: cap }, { quoted: m })
    } catch(e) {
        throw "nama anime tidak terdeteksi"
    }
}

handler.help = ["bluearchive", "ba"].map(a => a + " *[name chara]*")
handler.tags = ["anime"]
handler.command = ["bluearchive", "ba"]

export default handler
async function pinterest(query) {
  
    let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    let json = await res.json();
    let data = json.resource_response.data.results;
    if (!data.length) throw `Query "${query}" not found :/`;
    return data[~~(Math.random() * data.length)].images.orig.url;
  
}