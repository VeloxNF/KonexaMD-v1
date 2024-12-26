import axios from 'axios';

let handler = async (m, {conn, text}) => {
if (!text) throw 'koe sopo?';
try {
await m.react('😂')
const data = new URLSearchParams();
data.append('text', text);
data.append('lc', 'id');
data.append('=', '');

const config = {
  method: 'post',
  url: 'https://simsimi.vn/web/simtalk',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest'
  },
  data: data
};

let { data: result } = await axios(config)
await m.reply(result.success)
} catch (e) {
throw eror
}
}
handler.help = handler.command = ['simi2']
handler.tags = ['ai']
export default handler