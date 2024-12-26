import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {
    conn,
    text
}) => {
    if (!text) throw 'masukan IP'
    try {
        let res = await IP(text)
        await m.reply(res)
    } catch (e) {
        throw eror
    }
}
handler.command = handler.help = ['iplook']
handler.tags = ['internet']
export default handler
async function IP(ip) {
    try {
        let {
            data
        } = await axios.get('https://who.is/whois-ip/ip-address/' + ip)
        let $ = cheerio.load(data)
        let result = $('div.col-md-12.queryResponseBodyKey').text()
        return result
    } catch (e) {
        return e
    }
}