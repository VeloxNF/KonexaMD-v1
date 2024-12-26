import {
    ApiGratis
} from '../scraper/api-cai.js';
import chalk from 'chalk';

const handler = async (m, {
    conn,
    command,
    usedPrefix,
    text
}) => {
    conn.externalIds = conn.externalIds || {};

    if (!text) {
        return m.reply(`
    Input query:
    Example: .cai hello
    Usage:
    .caiinfo - Get info karakter oleh external ID.
    .caisearch - Search karakter berdasarkan pencarian.
    .caistats - Get status.
    .cai - Send pesan menggunakan disimpan external ID.
    .caiset - Set external ID untuk perintah.
        `.trim());
    }

    const apiClient = new ApiGratis();

    try {
        let message = '';

        if (command === 'caiinfo') {
        
            const characterInfo = (await apiClient.getCharacterInfo(text)).result.character;
            message = characterInfo ? formatCharacterInfo(characterInfo) : 'Info karakter tidak ditemukan.';
            await m.reply(message);
        } else if (command === 'caistats') {
        
            const status = (await apiClient.getStatus()).result;
            message = status.status === 'ok' ? formatStatus(status) : 'Statusnya tidak ditemukan.';
            await m.reply(message);
        } else if (command === 'cai') {
        
            message = conn.externalIds[m.sender] ? ((await apiClient.sendMessage(conn.externalIds[m.sender], text)).result.replies[0]?.text ?? 'Tidak ada balasan dari AI.') : 'Tidak ada ID eksternal set. Use .caiset perintah untuk mengatur external ID. ❗';
            await m.reply(message);
        } else if (command === 'caisearch') {
        
            const searchResults = (await apiClient.searchCharacters(text)).result.characters;
            message = searchResults ? formatSearchResults(searchResults) : 'Hasil pencarian tidak ditemukan.';
            
            let result = [], no = 1
            let hasil = searchResults.slice(0, 10)
            for (let pus of hasil) {
                result.push({
                    header: no++,
                    title: `${pus.title}`.toUpperCase(),
                    description: "Set number " + no,
                    id: ".caiset " + pus.external_id,
                })
            }
            const buttons = {
                title: "List",
                sections: [{
                    title: 'Search character'.toUpperCase(),
                    highlight_label: "Character id",
                    rows: [...result]
                }]
            };
            await conn.sendListButton(m.chat, message, buttons, wm, '[]', m)
        } else if (command === 'caiset') {
        
            if (!text) {
                message = `Harap berikan ID eksternal untuk ditetapkan. Contoh: ${usedPrefix}caiset your_external_id`;
                await m.reply(message);
            } else {
            
                conn.externalIds[m.sender] = text.trim();
                message = 'External ID berhasil diatur! ✅';                    await m.reply(message);
            }
        } else {
            message = 'Perintah tidak valid. ❌';
        }

        
    } catch (error) {
        await m.reply(`Error: ${error.message} ❌`);
    }
};

handler.help = handler.command = ["cai", "caiinfo", "caistats", "caiset", "caisearch"];
handler.tags = ["ai"];

export default handler;

function formatCharacterInfo(character) {
    const {
        title,
        name,
        visibility,
        greeting,
        avatar_file_name,
        participant__num_interactions,
        user__username,
        priority,
        search_score
    } = character;
    return `*Title:* ${title}\n*Name:* ${name}\n*Visibility:* ${visibility}\n*Greeting:* ${greeting}\n*Avatar:* ${avatar_file_name}\n*Participant Interactions:* ${participant__num_interactions}\n*User Username:* ${user__username}\n*Priority:* ${priority}\n*Search Score:* ${search_score}`;
}

function formatStatus(status) {
    const {
        version,
        cai_status
    } = status;
    const isAuthenticated = cai_status.is_authenticated ? 'Yes' : 'No';
    const isBrowserLaunched = cai_status.browser_launched ? 'Yes' : 'No';
    return `*Status:* OK\n*Version:* ${version}\n*Authenticated:* ${isAuthenticated}\n*Browser Launched:* ${isBrowserLaunched}`;
}

function formatSearchResults(characters) {
    return characters.slice(0, 10).map((char, index) => `*${index + 1}*.\n┎─•❲ *${char.title}* ❳
┃ *Name:* ${char.participant__name}
┃ *ExternalID:* ${char.external_id}
┃ *Greeting:* ${char.greeting}
┃ *Visibility:* ${char.visibility}
┃ *Participant Interactions:* ${char.participant__num_interactions}
┃ *User Username:* ${char.user__username}
┃ *Priority:* ${char.priority}
┃ *Search Score:* ${char.search_score}
┖─•`).join('\n\n');
}