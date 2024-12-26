/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(ganteng)}`, m)
}
handler.help = ['gantengcek']
handler.tags = ['fun']
handler.command = /^(gantengcek|cekganteng)$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

let ganteng = [
'Ganteng Level : 4%\n\nINI MUKA ATAU SAMPAH?!',
'Ganteng Level : 7%\n\nSerius ya,, Lu ampir mirip kayak Monyet!',
'Ganteng Level : 12%\n\nMakin lama liat muka lo gw bisa muntah!',
'Ganteng Level : 22%\n\nMungkin karna lo sering liat pekob😂',
'Ganteng Level : 27%\n\nKeknya bakal susah dapet jodoh lu,, berdoa aja',
'Ganteng Level : 35%\n\nYang sabar ya sayang',
'Ganteng Level : 41%\n\nSemoga diberkati mendapat jodoh',
'Ganteng Level : 48%\n\nDijamin cewek susah deketin lo',
'Ganteng Level : 56%\n\nLu Setengah Ganteng :v',
'Ganteng Level : 64%\n\nCukuplah Usaha Terus Ya',
'Ganteng Level : 71%\n\nLumayan ganteng juga lu ya',
'Ganteng Level : 2%\n\nAWOAKAK BURIQQQ!!!',
'Ganteng Level : 4%\n\nAWOAKAK BURIQQQ!!!',
'Ganteng Level : 1%\n\nAWOAKAK BURIQQQ SEKALI!!!',
'Ganteng Level : 6%\n\nAWOAKAK BURIQQQ!!!',
'Ganteng Level : 77%\n\nGak akan Salah Lagi dah omm🥵',
'Ganteng Level : 83%\n\nDijamin cewek gak akan kecewa omm😂',
'Ganteng Level : 89%\n\ncewek2 pasti auto salfok klo ngeliat lo!😍',
'Ganteng Level : 94%\n\nAARRGGHHH!!!😣',
'Ganteng Level : 100%\n\nKamu Ganteng!, Jadi Pacar Elaina Aja Yok😍🤣\nwa.me/62895324601397?text=.caielaina+on?\nAbis Ketik Itu Jan Lupa Sambut Aku Ya Sayang><',
]