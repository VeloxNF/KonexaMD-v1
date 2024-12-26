let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let codeToConvert = text || (m.quoted && m.quoted.text);
    
    if (!codeToConvert) throw `Masukkan atau reply kode yang ingin diubah`;

    let result;
    if (command === 'toesm') {
        result = convertCJSToESM(codeToConvert);
    } else if (command === 'tocjs') {
        result = convertESMToCJS(codeToConvert);
    } else {
        throw `Perintah tidak dikenal`;
    }
    
    m.reply(result);
};

handler.help = ['toesm <kode>', 'tocjs <kode>'];
handler.tags = ['code'];
handler.command = /^(toesm|tocjs)$/i;
handler.limit = true;

export default handler;

function convertCJSToESM(code) {
    return code
        .replace(/const (\w+) = require['"](.+?)['"];?/g, 'import $1 from \'$2\';')
        .replace(/module\.exports = (\w+);?/g, 'export default $1;');
}

function convertESMToCJS(code) {
    return code
        .replace(/import (\w+) from ['"](.+?)['"];/g, 'const $1 = require(\'$2\');')
        .replace(/export default (\w+);?/g, 'module.exports = $1;');
}