import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import axios from 'axios'
import speed from 'performance-now'

let handler = m => m
handler.all = async function(m) {
    let name = await conn.getName(m.sender)
    let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
    let fotonyu = 'https://telegra.ph/file/e1047817d256d9e372144.jpg'
    try {
        pp = await this.profilePictureUrl(m.sender, 'image')
    } catch (e) {}

    global.emror = 'https://telegra.ph/file/a6294049a1863a69154cf.jpg'
    global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])
    global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000])

    // Module 
    global.skrep = (await import('../scraper/scrape.js'))
    global.skrep2 = (await import('../scraper/scrape2.js'))
    global.skrep3 = (await import('../scraper/scrape3.js'))
    global.skrepdl = (await import('../scraper/scrape_dl.js'))
    global.skrep4 = (await import('../scraper/scrape4.js'))
    global.skreps = (await import('../scraper/scrape-search.js'))
    global.skrepdl = (await import('../scraper/scrape_dl.js'))

    // modul
    global.axios = (await import('axios')).default
    global.fetch = (await import('node-fetch')).default
    global.cheerio = (await import('cheerio')).default
    global.fs = (await import('fs')).default

    let timestamp = speed();
    let latensi = speed() - timestamp;
    let ms = await latensi.toFixed(4)
    const _uptime = process.uptime() * 1000

    // Ini untuk command creator/owner
    global.kontak2 = [
        [owner[0], await conn.getName(owner[0] + '6288289338073@s.whatsapp.net'), 'Tio', 'https://whatsapp.com', true],
    ]

    global.fkon = {
        key: {
            fromMe: false,
            participant: m.sender,
            ...(m.chat ? {
                remoteJid: 'BROADCAST GROUP'
            } : {})
        },
        message: {
            contactMessage: {
                displayName: `${name}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }
    }

    global.fVerif = {
        key: {
            participant: '6288289338073@s.whatsapp.net',
            remoteJid: "6288289338073@s.whatsapp.net"
        },
        message: {
            conversation: `_${global.namebot} Terverifikasi Oleh WhatsApp_`
        }
    }

    // pesan sementara
    global.ephemeral = '86400'

    global.ucapan = ucapan()
    global.botdate = date()
    global.runtime = runtime()

    global.adReply = {
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                "newsletterJid": "120363272189553503@newsletter",
                "serverMessageId": 103,
                "newsletterName": `© 2024 Axeley By Aeley | All Right Deserved.`
            },
            externalAdReply: {
                showAdAttribution: true,
                title: conn.getName(m.sender),
                body: 'Runtime : ' + global.runtime,
                previewType: "FOTO",
                thumbnailUrl: logo,
                sourceUrl: 'https://whatsapp.com/channel/0029VaXtaJwG3R3lWS7CpZ1y',
            }
        }
    }

    global.fakeig = {
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: namebot,
                body: ucapan(),
                thumbnailUrl: pp,
                sourceUrl: sig
            }
        }
    }
}

export default handler

function date() {
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, {
        weekday: 'long'
    })
    let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let tgl = `${week}, ${date}`
    return tgl
}

function runtime(){
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  return uptime;
}

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat malam "
    if (time >= 4) {
        res = "Selamat pagi "
    }
    if (time > 10) {
        res = "Selamat siang "
    }
    if (time >= 15) {
        res = "Selamat sore "
    }
    if (time >= 18) {
        res = "Selamat malam "
    }
    return res
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}