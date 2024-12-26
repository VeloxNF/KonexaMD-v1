import { codes } from '../scraper/tool-code.js'
import util from 'util'

let handler = async ( m, { conn, text, command, usedPrefix }) => {

let [ text1, text2 ] = text.split('|')
if ( !text1 && !text2 ) throw 'Masukan kode|language'
let ini = await codes(text1, text2)

m.reply(util.format(ini))

}

handler.command = ['codetest']
handler.tags = ['tools']
handler.command = ['codetest','testcode']
handler.limit = true
export default handler