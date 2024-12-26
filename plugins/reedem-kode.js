import fs from 'fs'

let handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply('Kodenya mana?\nContoh: .reedem hbafd21\n\nHuruf Besar Kecil Harus Sama!!')
    if (fs.existsSync(`./plugins/database/userclaim/${m.sender}.json`)) return m.reply('Anda Telah Claim Kode Hari Ini Tunggu Besok hari')
    let user = db.data.users[m.sender]
    let teks = 'Selamat Anda Berhasil Claim Kode reedem\nAnda Mendapatkan:\n\n'
    let aja = [];
    let rand = pickRandom(['1','0','2','3','3','4','5','5','6','7','8','7','4','8','9','10','9']); // tambahkan lagi jika kurang
    let data = JSON.parse(fs.readFileSync("./plugins/database/codereedem.json"))
 //   console.log(data)
    let itemrand = [
        'pet',
        'money',
        'exp',
        'diamond',
        'iron',
        'petfood',
        'pizza',
        'potion',
        'rock',
        'wood'
    ] 
    if (data.includes(args[0])) {
        for (let i = 0; i < rand; i++) {
    let item = pickRandom(itemrand);
    let jumlah = pickRandom(['1','3','1','1','2','0','2','0']); // Pilih jumlah acak langsung dari _pet
            teks += `Mendaptkan Item: ${item} Sebanyak: ${jumlah}\n`
   user[pickRandom(itemrand)] += jumlah * 1 // hapus garis miring jika itemrand sesuai database
}
        m.reply(teks)
        let unp = data.indexOf(args[0])
     data.splice(unp, 1)
        fs.writeFileSync("./plugins/database/codereedem.json", JSON.stringify(data))
        let obj = { status: 'telah claim code' }
fs.writeFileSync(`./plugins/database/userclaim/${m.sender}.json`, JSON.stringify(obj))
  //  console.log("Data ditemukan dalam array");
} else {
    m.reply('Tidak Ada Kode Seperti itu\nHarap Huruf Kecil&Besar sama!!')
  //  console.log("Data tidak ditemukan dalam array");
}
	
}

handler.help = ['reedemkode']
handler.tags = ['rpg']
handler.command = /^(reedemkode|reedem)$/i

export default handler

function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}