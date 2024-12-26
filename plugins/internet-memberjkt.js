import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, {conn, text, command}) => {

switch (command) {
case "memberjkt":
let { member } = await getMemberJkt();
let daftar = []

member.forEach(async (v) => {
daftar.push({
header: "member jkt".toUpperCase(),
title: v.name,
description: "detail member jkt ".toUpperCase() + v.name,
id: ".idjkt " + v.detailLink
})
})

let list = {
title: "Daftar Jkt48",
sections: [{
title: "Daftar member jkt48".toUpperCase(),
highlight_label: "JKT48",
rows: [...daftar]
}]
}
await conn.sendListButton(m.chat, "Kumpulan Member JKT48", list, wm, '[]', m)
break
case 'idjkt':
if (!text) return m.reply("masukan id jkt\nketik: .memberjkt (untuk mendapatkan id)")
let result = await getDetailMember(text);
let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${result.name}+jkt48&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${result.name}+jkt48%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
let res = data.resource_response.data.results.map(v => v.images.orig.url);
let urls = res.splice(0, 6)
let caption = `\`Nama: ${result.name}\`
\`Birth Date: ${result.birthDate}\`
\`Blood Type: ${result.bloodType}\`
\`Horoscope: ${result.horoscope}\`
\`Height: ${result.height}\`
\`Nickname: ${result.nickname}\`
\`Twitter: ${result.socialMedia.twitter}\`
\`Instagram: ${result.socialMedia.instagram}\`
\`Tiktok: ${result.socialMedia.tiktok}\``

await conn.sendMessage(m.chat, {image: {url: urls[0] }, caption}, {quoted: m})
}
}
handler.help = handler.command = ["memberjkt", "idjkt"]
handler.tags = ["internet"]

export default handler 

async function getMemberJkt() {
    const respon = await axios.get('https://cors.caliph.my.id/https://jkt48.com/member/list?lang=id')
    const $ = cheerio.load(respon.data)
    const members = {
    member: []
    }

    $('.entry-member').each((index, element) => {
      const photoUrl = $(element).find('img').attr('src')
      const name = $(element).find('.entry-member__name a').text().trim().replace(/\n/g, ' ')
      const detailLink = $(element).find('a').attr('href')

      members.member.push({
        photoUrl: 'https://jkt48.com' + photoUrl,
        name: name,
        detailLink: 'https://jkt48.com' + detailLink
      })
    })

    return members
  }

async function getDetailMember(link) {
    const { data } = await axios.get('https://cors.caliph.my.id/' + link)
    const $ = cheerio.load(data)

    const name = $('.entry-mypage__item').eq(0).find('.entry-mypage__item--content').text().trim()
    const birthDate = $('.entry-mypage__item').eq(1).find('.entry-mypage__item--content').text().trim()
    const bloodType = $('.entry-mypage__item').eq(2).find('.entry-mypage__item--content').text().trim()
    const horoscope = $('.entry-mypage__item').eq(3).find('.entry-mypage__item--content').text().trim()
    const height = $('.entry-mypage__item').eq(4).find('.entry-mypage__item--content').text().trim()
    const nickname = $('.entry-mypage__item').eq(5).find('.entry-mypage__item--content').text().trim()

    let socialMedia = {}
    $('.entry-mypage__history').each((index, element) => {
      const platform = $(element).find('h3').text().trim().toLowerCase()
      const url = $(element).find('a').attr('href')
      if (platform && url) {
        socialMedia[platform] = url
      }
    })

    return { name, birthDate, bloodType, horoscope, height, nickname, socialMedia }
}