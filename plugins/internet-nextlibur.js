import axios from 'axios'

let handler = async (m, {conn}) => {

try {
await m.reply(wait)
const {libnas_content, nextLibur} = await nexLibur();
let no = 1
let teks = `*${nextLibur}*\n\n${readMore}`

for (let a of libnas_content) {
teks += `${no++}. Ringkasan: ${a.summary}
Hari: ${a.days}
Bulan: ${a.dateMonth}\n\n`
}
conn.reply(m.chat, teks, m)
} catch (e) {
throw eror
}
}
handler.help = handler.command = ['harilibur','nextlibur']
handler.tags = ['internet']

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

async function nexLibur() {
  const { data } = await axios.get("https://www.liburnasional.com/");
  let libnas_content = [];
  let $ = cheerio.load(data);
  let result = {
    nextLibur:
      "Hari libur" +
      $("div.row.row-alert > div").text().split("Hari libur")[1].trim(),
    libnas_content,
  };
  $("tbody > tr > td > span > div").each(function (a, b) {
    summary = $(b).find("span > strong > a").text();
    days = $(b).find("div.libnas-calendar-holiday-weekday").text();
    dateMonth = $(b).find("time.libnas-calendar-holiday-datemonth").text();
    libnas_content.push({ summary, days, dateMonth });
  });
  return result;
}