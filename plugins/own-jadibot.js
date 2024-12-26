import baileys from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';
import { createCanvas } from 'canvas';
import NodeCache from 'node-cache';
import Pino from 'pino';
import simple from '../lib/simple.js';
import fs from 'fs';

const { useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore, PHONENUMBER_MCC } = baileys;

if (!global.conns) global.conns = [];

const handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
  if (conn.user.jid !== global.conn.user.jid) return conn.reply(m.chat, '```Perintah ini hanya dapat digunakan di bot utama:```' + '\n```wa.me/```' + '```' + global.conn.user.jid.split`@`[0] + '```' + '```?text=.jadibot```', m);
  await m.react('');

  let conns = global.conn;
  let user = global.db.data.users[m.sender];

  let authFile = `plugins/jadibot/${m.sender.split('@')[0]}`;
  let isInit = !fs.existsSync(authFile);
  let { state, saveCreds } = await useMultiFileAuthState(authFile);
  let msgRetryCounterCache = new NodeCache();

  const config = {
    logger: Pino({ level: 'fatal' }).child({ level: 'fatal' }),
    printQRInTerminal: false,
    mobile: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: 'fatal' }).child({ level: 'fatal' })),
    },
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  };

  conn = simple.makeWASocket(config);
  const ev = conn.ev;

  if (!conn.authState.creds.registered) {
    setTimeout(async () => {
      let phoneNumber = m.sender.split('@')[0];
      let code = await conn.requestPairingCode(phoneNumber);
      let hasilcode = code?.match(/.{1,4}/g)?.join('-') || code;
      let image = await generateCanvas(hasilcode);
      let capt = `Enter the code in the image above to become a temporary bot.

*How To Install*
1. Enter the *linked device*
2. Click *link device*
3. Click enter *with phone number only*
4. Enter your *code*"

Your code will *expire* in *20* seconds`;
      await conns.sendFile(m.chat, image, '', capt, m);
    }, 3000);
  }

  const connectionUpdate = async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'open') {
      conns.reply(`${text}@s.whatsapp.net`, '``` Tersambung```', m);
      await m.react('');
      global.conns.push(conn);
    }
    if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
      reloadHandler(true);
    }
  };

  const reloadHandler = (restartConn) => {
    let handlerModule = require('../handler');
    if (restartConn) {
      try {
        conn.ws.close();
      } catch (error) {
        console.error('Failed to close WebSocket', error);
      }
      conn = { ...conn, ...simple.makeWASocket(config) };
    }

    if (!isInit) {
      conn.ev.off('messages.upsert', conn.handler);
      conn.ev.off('group-participants.update', conn.onParticipantsUpdate);
      conn.ev.off('connection.update', conn.connectionUpdate);
      conn.ev.off('creds.update', conn.credsUpdate);
    }

    conn.welcome = 'Hai, @user!\nSelamat datang di grup *@subject*\n\n@desc';
    conn.bye = 'Selamat tinggal @user!';
    conn.spromote = '@user sekarang admin!';
    conn.sdemote = '@user sekarang bukan admin!';
    conn.handler = handlerModule.handler.bind(conn);
    conn.onParticipantsUpdate = handlerModule.participantsUpdate.bind(conn);
    conn.connectionUpdate = connectionUpdate.bind(conn);
    conn.credsUpdate = saveCreds.bind(conn);

    conn.ev.on('messages.upsert', conn.handler);
    conn.ev.on('group-participants.update', conn.onParticipantsUpdate);
    conn.ev.on('connection.update', conn.connectionUpdate);
    conn.ev.on('creds.update', conn.credsUpdate);
    isInit = false;
    return true;
  };

  reloadHandler();
};

handler.help = ['jadibot *<number>*'];
handler.tags = ['jadibot'];
handler.command = /^jadibot$/i;
handler.premium = true;
handler.limit = true;
handler.owner = false;
handler.private = false;

export default handler;

async function generateCanvas(text) {
  const canvasWidth = 2560;
  const canvasHeight = 1440;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.font = 'bold 250px Arial';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

  const textBottom = '@dcodekemii';
  ctx.font = 'bold 60px Arial';
  ctx.fillText(textBottom, canvasWidth / 2, canvasHeight - 50);

  const buffer = canvas.toBuffer();
  return buffer;
}