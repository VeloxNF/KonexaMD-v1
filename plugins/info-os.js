import os from "os"
import speed from "performance-now"

import {
 spawn,
 exec, 
execSync 
} from "child_process"

var handler = async (m, { 
conn 
}) => {
         let timestamp = speed();
         let latensi = speed() - timestamp;
let { key } = await conn.sendMessage(m.chat, {text: '☕'}, {quoted: m})
await conn.delay(500)
         exec(`neofetch --stdout`, (error, stdout, stderr, json) => {
          let child = stdout.toString("utf-8");
          let ssd =
 child.replace(/Memory:/, "Ram:");

           conn.sendMessage(m.chat, {text:`• *CPU:* ${ssd}*Kecepatan* : ${latensi.toFixed(4)} _ms_\n• *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem / 1024 / 1024)}MB\n• *OS:* ${os.version()}\n• *Platform:* ${os.platform()}\n• *Hostname:* ${os.hostname()}`, edit: key}, {quoted: m});
            });
}
handler.command = handler.help = ['os'];
handler.tags = ['main'];
handler.register = true
handler.limit = true
export default handler