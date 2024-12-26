let handler = async (m, {
conn,
args
}) => {
let d = new Date(new Date().setMonth(new Date().getMonth() + 1));
let locale = 'id';
let tgl = d.toLocaleDateString(locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
let d2 = new Date(new Date + 3600000)
let date = d2.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
if (!args[0] || !args[1] || !args[2]) return  m.reply('harus di isi dengan format \n.vps PASS IP PORT')
let vps = `> 📁 Data VPS

User: root
Pass: ${args[0]}
IP: ${args[1]}
Port:  ${args[2]}
transaksi: ${date}
expired: ${tgl}
`
await m.reply(vps)
}
handler.help = handler.command = ['vps']
handler.owner = true
handler.tags = ['main']
export default handler