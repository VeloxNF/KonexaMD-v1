import {
    subdomain
} from '../lib/subdomain.js'
let handler = async (m, {
    conn,
    text,
    command,
    usedPrefix
}) => {
    let teks = text.split('|')[2]
    let prot = new subdomain({
        zone: '8c4fc3b184bb6d56b2cfc3aeefc81093',
        token: 'ctrL1bBMcSzcldz6XxZGN2GMEex1XuiLQfCJQnTY',
        domain: teks ? teks : 'night-team.my.id'
    })

    switch (command) {
        case 'subdomain':
            text = text.split('|');
            if (!text[0]) return m.reply('masukan nama subdomain')
            if (!text[1]) return m.reply('masukan ip')
            try {
                const {
                    name,
                    success
                } = await prot.create(text[0], text[1]);
                if (success != true) throw 'Maaf ada kesalahan sistem';
                await m.reply(`*Created Subdomain*
┎[ *INFO* ]
┃ *Name*: \`${name}\`
┃ *Ip*: \`${text[1]}\`
┖━━━━━━━▪`)
            } catch (e) {
                throw e
            }
            break
        case 'listsubdomain':
            const {
                success, data
            } = await prot.list();
            if (success != true) throw 'Maaf ada kesalahan sistem';
            let resdo = []
            for (let pus of data) {
                resdo.push({
                    header: `Subdomain ${pus.zone_name}`,
                    title: `[ ${pus.name} ]`,
                    description: "Cek detail",
                    id: ".detailsubdomain " + pus.id,
                })
            }
            const button = {
                title: "Open here!",
                sections: [{
                    title: '*\`List*\`*',
                    highlight_label: "Subdomain",
                    rows: [...resdo]
                }]
            };
            await conn.sendListButton(m.chat, '*\`LIST SUBDOMAIN\`*', button, wm, '[]', m)
            break
        case 'deletesubdomain':
        const {
                success: status, data: datas
            } = await prot.list();
            if (status != true) throw 'Maaf ada kesalahan sistem';
            let resdos = []
            for (let pus of datas) {
                resdos.push({
                    header: `Subdomain ${pus.zone_name}`,
                    title: `[ ${pus.name} ]`,
                    description: "Delete subdomain",
                    id: ".deletesubdomain " + pus.id,
                })
            }
            const buttons = {
                title: "Open here!",
                sections: [{
                    title: '*\`List\`*',
                    highlight_label: "Subdomain",
                    rows: [...resdos]
                }]
            };
            if (!text) return conn.sendListButton(m.chat, '*\`LIST SUBDOMAIN\`*', buttons, wm, '[]', m)
            try {
                const {
                    result
                } = await prot.delete(text);
                await m.reply(`Sukses menghapus subdomain dengan id *\`${text}\`*`)
            } catch (e) {
                throw eror
            }
            break
        case 'detailsubdomain':
            if (!text) return m.reply('masukan dns_id / atau id subdomain')
            try {
                const {
                    data
                } = await prot.detail(text);
                let result = data.result;
                let txt = `*Info subdomain*

Id: ${result.id},
Zone_id: ${result.zone_id},
Zone_name: ${result.zone_name},
Name: ${result.name},
Type: ${result.type},
Content: ${result.content},
Proxiable: ${result.proxiable},
Proxied: ${result.proxied},
Ttl: ${result.ttl},
Locked: ${result.locked}`
await m.reply(txt)
            } catch (e) {
                throw e
            }

            break
    }
}
handler.help = handler.command = ['subdomain', 'listsubdomain', 'deletesubdomain', 'detailsubdomain']
handler.tags = ['owner']
handler.rowner = true

export default handler