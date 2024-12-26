import cron from "node-cron";

export async function before(m, {conn}) {

function sendBirthdayGreeting(name) {
    conn.reply(nomerown + info.jid, "selamat ultah min", m)
}

const name = nameown;

const task = cron.schedule('0 0 1 4 *', () => {
    sendBirthdayGreeting(name);
}, {
    scheduled: true,
    timezone: "Asia/Jakarta" 
});

task.start();

}