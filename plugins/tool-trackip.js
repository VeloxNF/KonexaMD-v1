import { getIPInfo } from '../scraper/trackIp.js'
let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} 123.456.789.0`
	if (!text) return m.reply(input)

    getIPInfo(text).then(ipInfo => {
 if (ipInfo) {
 const ip = `
  *Ip:* ${ipInfo.ip}
  *Hostname*: ${ipInfo.hostname}
  *City*: ${ipInfo.city}
  *Region*: ${ipInfo.region}
  *Country*: ${ipInfo.country}
  *Loc*: ${ipInfo.loc}
  *Org*: ${ipInfo.org}
  *Postal*: ${ipInfo.postal}
  *Timezone:* ${ipInfo.timezone}
  
  *Location:* ${ipInfo.loc}
  *Coordinates:* ${ipInfo.loc}
  `
m.reply(ip)
    }
})
}
handler.help = ['trackip']
handler.tags = ['tools']
handler.command = /^(trackip|getipinfo)$/i
handler.premium = true
handler.limit = true

export default handler