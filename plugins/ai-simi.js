let handler = async (m, {text, args}) => {

  if (!args[0]) throw `Use example .simi halo`

  let api = await fetchJson(`https://api.tioxy.my.id/api/simsimi?text=${text}`)
  
  m.reply(api.data.success)
}
handler.command = ['simi']
handler.tags = ['main']
handler.help = ['simi']

export default handler