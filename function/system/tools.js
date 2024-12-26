/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fs from 'fs'
import axios from 'axios'
import ytdl from 'ytdl-core'
import fetch from 'node-fetch'
import crypto from "crypto";
import FormData from "form-data";
import {
    fileTypeFromBuffer
} from "file-type";
import fakeUserAgent from "fake-useragent";
import cheerio from "cheerio";
import chalk from "chalk";
import {
    watchFile,
    unwatchFile
} from 'fs'
import {
    fileURLToPath
} from 'url'

export async function Uploader() {
    const uloadUrlRegexStr = /url: "([^"]+)"/;
    const randomBytes = crypto.randomBytes(5).toString("hex");

    const createFormData = (content, fieldName, ext) => {
        if (!Buffer.isBuffer(content) && typeof content !== 'tring') {
            throw new Error('Invalid content type');
        }
        const buffer = Buffer.from(content);
        const {
            mime
        } = fileTypeFromBuffer(buffer) || {};
        const formData = new FormData();
        formData.append(fieldName, buffer, `${randomBytes}.${ext}`);
        return formData;
    };
    async function telegraph(buffer) {
        try {
            const {
                ext
            } = await fileTypeFromBuffer(buffer);
            const form = await createFormData(buffer, "file", ext);
            const res = await fetch("https://telegra.ph/upload", {
                method: "POST",
                body: form
            });
            const img = await res.json();
            if (img.error) throw img.error;
            return `https://telegra.ph${img[0].src}`;
        } catch (e) {
            throw e
        }
    };
    async function uploadPomf2(buffer) {
        try {
            const {
                ext
            } = await fileTypeFromBuffer(buffer) || {};
            const form = await createFormData(buffer, "files[]", ext);
            const res = await fetch("https://pomf2.lain.la/upload.php", {
                method: "POST",
                body: form
            });
            const json = await res.json();
            if (!json.success) throw json;
            return json;
        } catch (e) {
            throw e;
        }
    };
    async function ucarecdn(content) {
        try {
            const {
                ext
            } = await fileTypeFromBuffer(content) || {};
            const formData = await createFormData(content, "file", ext);
            formData.append("UPLOADCARE_PUB_KEY", "demopublickey");
            formData.append("UPLOADCARE_STORE", "1");
            const response = await fetch("https://upload.uploadcare.com/base/", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            const {
                file
            } = await response.json();
            return `https://ucarecdn.com/${file}/${randomBytes}.${ext}`;
        } catch (e) {
            throw e;
        }
    };
    async function tmpfiles(content) {
        try {
            const {
                ext,
                mime
            } = await fileTypeFromBuffer(content) || {};
            const formData = await createFormData(content, "file", ext);
            const response = await fetch("https://tmpfiles.org/api/v1/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            const result = await response.json();
            const match = /https?:\/\/tmpfiles.org\/(.*)/.exec(result.data.url);
            return `https://tmpfiles.org/dl/${match[1]}`;
        } catch (e) {
            throw e;
        }
    };
    async function Uguu(content) {
        try {
            const {
                ext,
                mime
            } = await fileTypeFromBuffer(content) || {};
            const formData = createFormData(content, "files[]", ext);
            const response = await fetch("https://uguu.se/upload.php", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            const files = await response.json();
            return files.files[0].url;
        } catch (e) {
            throw e;
        }
    };
    async function gofile(content) {
        try {
            const {
                ext,
                mime
            } = await fileTypeFromBuffer(content) || {};
            const formData = createFormData(content, "file", ext);
            const getServer = await (await fetch("https://api.gofile.io/getServer", {
                method: "GET",
            })).json();
            const response = await fetch(`https://${getServer.data.server}.gofile.io/uploadFile`, {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            const result = await response.json();
            return `https://${getServer.data.server}.gofile.io/download/web/${result.data.fileId}/thumb_${result.data.fileName}`;
        } catch (e) {
            throw e;
        }
    };
    async function oxo(content) {
        try {
            const {
                ext,
                mime
            } = await fileTypeFromBuffer(content) || {};
            const formData = createFormData(content, "file", ext);
            const response = await fetch("http://0x0.st", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });

            return await response.text();
        } catch (e) {
            throw e
        }
    };
    async function catbox(content) {
        try {
            const {
                ext,
                mime
            } = await fileTypeFromBuffer(content) || {};
            const formData = createFormData(content, "fileToUpload", ext);
            formData.append("reqtype", "fileupload");
            const response = await fetch("https://catbox.moe/user/api.php", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            return await response.text();
        } catch (e) {
            throw e
        }
    };
    async function Team(buff) {
        try {
            const {
                ext
            } = await fileTypeFromBuffer(buff);
            const form = new FormData();
            form.append('file', buff, `${randomBytes}.${ext}`);

            const response = await axios.post('https://nvlgroup.my.id/api/upload', form, {
                headers: {
                    ...form.getHeaders()
                }
            });
            let {
                status,
                data
            } = response.data
            return {
                status: status,
                creator: 'Noval',
                data: {
                    originalname: data.originalname,
                    filename: data.originalname,
                    mimetype: data.mimetype,
                    size: data.size,
                    url: data.url
                }
            }
        } catch (error) {
            return ('Error uploading file:', error.message);
        }
    };
    return {
        telegraph,
        uploadPomf2,
        ucarecdn,
        Uguu,
        catbox,
        oxo,
        gofile,
        tmpfiles,
        Team
    };
}