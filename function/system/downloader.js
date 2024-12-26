/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fs from 'fs'
import path from 'path'
import axios from 'axios'
import fetch from 'node-fetch'
import crypto from "crypto";
import FormData from "form-data";
import yts from 'yt-search'
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

export class Samehadaku {
    BASE_URL;
    constructor() {
        this.BASE_URL = "https://samehadaku.email";
    }
    async search(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(this.BASE_URL +
                    "/?" +
                    new URLSearchParams({
                        s: query,
                    }));
                if (res.statusText !== "OK")
                    return reject("Fail Fetching");
                const $ = cheerio.load(res.data);
                if ($("main#main").find(".notfound").length)
                    return reject("Query Not Found");
                const data = [];
                $("main#main")
                    .find("article.animpost")
                    .each((i, el) => {
                        data.push({
                            title: $(el).find("img").attr("title")?.trim(),
                            id: $(el).attr("id")?.split("-")[1] || "",
                            thumbnail: $(el).find("img").attr("src") || "",
                            description: $(el).find("div.ttls").text().trim(),
                            genre: $(el)
                                .find("div.genres > .mta > a")
                                .map((i, el) => {
                                    return $(el).text().trim();
                                })
                                .get(),
                            type: $(el)
                                .find("div.type")
                                .map((i, el) => {
                                    return $(el).text().trim();
                                })
                                .get(),
                            star: $(el).find("div.score").text().trim(),
                            views: $(el).find("div.metadata > span").eq(2).text().trim(),
                            link: $(el).find("a").attr("href") || "",
                        });
                    });
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
    async latest() {
        return new Promise(async (resolve, reject) => {
            try {
                const url = "https://samehadaku.email/anime-terbaru/";
                const html = await axios.get(url, {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                    },
                });
                if (html.statusText !== "OK")
                    return reject("Website Down");
                const $ = cheerio.load(await html.data());
                const ul = $("div.post-show > ul").children("li");
                const data = {
                    total: 0,
                    anime: [],
                };
                for (let el of ul) {
                    data.anime.push({
                        title: $(el)
                            .find("h2.entry-title")
                            .text()
                            .trim()
                            .split(" Episode")[0],
                        thumbnail: $(el).find("div.thumb > a > img").attr("src") || "",
                        postedBy: $(el)
                            .find('span[itemprop="author"] > author')
                            .text()
                            .trim(),
                        episode: $(el).find("span").eq(0).find("author").text().trim(),
                        release: $(el)
                            .find('span[itemprop="author"]')
                            .next()
                            .contents()
                            .eq(3)
                            .text()
                            .split(": ")[1]
                            .trim(),
                        link: $(el).find("a").attr("href") || "",
                    });
                }
                data.total = data.anime.length;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
    async release() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = {
                    sunday: [],
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: [],
                };
                for await (let day of Object.keys(data)) {
                    const res = await axios
                        .get(this.BASE_URL +
                            "/wp-json/custom/v1/all-schedule?" +
                            new URLSearchParams({
                                perpage: "20",
                                day,
                                type: "schtml",
                            }))
                        .then((v) => v.data);
                    data[day] = res;
                }
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
    async detail(url) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!url.match(/samehadaku\.\w+\/anime/gi))
                    return reject("Invalid URL");
                const res = await axios.get(url);
                if (res.statusText !== "OK")
                    return reject("Fail Fetching");
                const $ = cheerio.load(res.data);
                const data = {
                    title: $('.infoanime > h1[itemprop="name"]')
                        .text()
                        .trim()
                        .replace("Nonton Anime ", ""),
                    thumbnail: $(".infoanime > .thumb > img").attr("src") || "",
                    published: new Date($(".anim-senct").find("time").attr("datetime") || ""),
                    trailer: $(".trailer-anime").find("iframe").attr("src") || "",
                    rating: $(".infoanime").find('span[itemprop="ratingValue"]').text().trim() +
                        "/" +
                        $(".infoanime")
                        .find('i.hidden[itemprop="ratingCount"]')
                        .attr("content"),
                    description: $(".infox > .desc").text().trim(),
                    genre: $(".infox > .genre-info > a")
                        .map((i, e) => $(e).text().trim())
                        .get(),
                    detail: $("h3.anim-detail")
                        .next()
                        .find("span")
                        .map((i, el) => {
                            return {
                                name: $(el).find("b").text().trim(),
                                data: `${$(el).text().trim()}`
                                    .replace($(el).find("b").text().trim() + " ", "")
                                    .trim(),
                            };
                        })
                        .get(),
                    batch: $(".listbatch").find("a").attr("href") || null,
                    episode: $(".lstepsiode > ul > li")
                        .map((i, el) => {
                            return {
                                title: $(el).find(".lchx > a").text().trim(),
                                date: $(el).find(".date").text().trim(),
                                link: $(el).find(".eps > a").attr("href") || "",
                            };
                        })
                        .get(),
                };
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
    async download(url) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!/samehadaku\.\w+\/[\w-]+episode/gi.test(url))
                    return reject("Invalid URL!");
                const html = await axios.get(url, {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                    },
                });
                if (html.statusText !== "OK")
                    return reject("Error Fetching");
                const $ = cheerio.load(html.data);
                const data = {
                    title: $('h1[itemprop="name"]').text().trim(),
                    link: url,
                    downloads: [],
                };
                data.downloads = await Promise.all($("div#server > ul > li").map(async (i, el) => {
                    const v = {
                        name: $(el).find("span").text().trim(),
                        post: $(el).find("div").attr("data-post") || "",
                        nume: $(el).find("div").attr("data-nume") || "",
                        type: $(el).find("div").attr("data-type") || "",
                        link: "",
                    };
                    const A = new FormData();
                    A.append("action", "player_ajax");
                    A.append("post", v.post);
                    A.append("nume", v.nume);
                    A.append("type", v.type);
                    v.link =
                        (await axios
                            .post("https://samehadaku.email/wp-admin/admin-ajax.php", A, {
                                headers: {
                                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                                    origin: "https://samehadaku.email",
                                },
                            })
                            .then((v) => v.data)
                            .then((v) => cheerio.load(v)("iframe").attr("src"))) || "";
                    return v;
                }));
                return resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }
}

export async function Ytdl(videoUrl) {
    const url = 'https://api.zeemo.ai/hy-caption-front/api/v1/video-download/yt-dlp-video-info';
    const requestHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    const headers = requestHeaders
    const response = await axios.post(url, {
        url: videoUrl,
        videoSource: 3
    }, {
        headers
    });
    const hasil = response.data
    return hasil.data
}

export async function instagram(url) {
    try {
        let res = await fetch(`https://api.neoxr.eu/api/ig?url=` + url + `&apikey=${neo}`)
        let hasil = await res.json()
        let sts = hasil.status
        let results = []

        for (let i = 0; i < hasil.data.length; i++) {
            if (i === 0) {
                const result = {
                    creator: 'Fanzz',
                    status: sts,
                    type: hasil.data[i].type,
                    url: hasil.data[i].url
                }
                results.push(result)
            } else {
                results.push({
                    type: hasil.data[i].type,
                    url: hasil.data[i].url
                })
            }
        }
        return results
    } catch (error) {
        console.error('Error Downloading:', error);
        throw error;
    }
}

export async function igdl(url) {
    return new Promise(async (resolve, reject) => {
        const payload = new URLSearchParams(
            Object.entries({
                url: url,
                host: "instagram"
            })
        )
        await axios.request({
                method: "POST",
                baseURL: "https://saveinsta.io/core/ajax.php",
                data: payload,
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    cookie: "PHPSESSID=rmer1p00mtkqv64ai0pa429d4o",
                    "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
                }
            })
            .then((response) => {
                const $ = cheerio.load(response.data)
                const mediaURL = $("div.row > div.col-md-12 > div.row.story-container.mt-4.pb-4.border-bottom").map((_, el) => {
                    return "https://saveinsta.io/" + $(el).find("div.col-md-8.mx-auto > a").attr("href")
                }).get()
                const res = {
                    creator: "Fanzz",
                    status: 200,
                    media: mediaURL
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
                throw {
                    status: 400,
                    message: "error",
                }
            })
    })
}

export async function pinterest(query) {
    const baseUrl = "https://www.pinterest.com/resource/BaseSearchResource/get/";
    const queryParams = {
        source_url: "/search/pins/?q=" + encodeURIComponent(query),
        data: JSON.stringify({
            options: {
                isPrefetch: false,
                query,
                scope: "pins",
                no_fetch_context_on_resource: false,
            },
            context: {},
        }),
        _: Date.now(),
    };
    const url = new URL(baseUrl);
    Object.entries(queryParams).forEach((entry) =>
        url.searchParams.set(entry[0], entry[1]),
    );

    try {
        const json = await (await fetch(url.toString())).json();
        const results = json.resource_response?.data?.results ?? [];
        return results.map((item) => ({
            pin: "https://www.pinterest.com/pin/" + item.id ?? "",
            link: item.link ?? "",
            created_at: new Date(item.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }) ?? "",
            id: item.id ?? "",
            images_url: item.images?.["736x"]?.url ?? "",
            grid_title: item.grid_title ?? "",
        }));
    } catch (error) {
        console.error("Error mengambil data:", error);
        return m.reply("image is't support")
    }
}


export async function searchTikTok(query) {
    return new Promise(async (resolve, reject) => {
        axios("https://tikwm.com/api/feed/search", {
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                cookie: "current_language=en",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
            },
            data: {
                keywords: query,
                count: 12,
                cursor: 0,
                web: 1,
                hd: 1,
            },
            method: "POST",
        }).then((res) => {
            resolve(res.data.data);
        });
    });
}

export async function Tiktok(urls) {
    const url = "https://tiktokio.com/api/v1/tk-htmx";
    const data = new URLSearchParams({
        prefix: "dtGslxrcdcG9raW8uY29t",
        vid: urls,
    });

    const config = {
        headers: {
            "HX-Request": "true",
            "HX-Trigger": "search-btn",
            "HX-Target": "tiktok-parse-result",
            "HX-Current-URL": "https://tiktokio.com/id/",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
    };

    try {
        let {
            data: res
        } = await axios.post(url, data, config);
        let $ = cheerio.load(res);
        const urls = [];
        let media;

        const links = {
            creator: "Fanzz",
            status: 200,
            isSlide: false,
            title: $("h2").text(),
            media: media,
        };

        $(".download-item img").each((index, element) => {
            const url = $(element).attr("src");
            urls.push(url);
            links.isSlide = true;
        });

        if (urls.length === 0) {
            media = {};
            $("div.tk-down-link").each(function(index, element) {
                const linkType = $(this).find("a").text().trim();
                const url = $(this).find("a").attr("href");

                if (linkType === "Download watermark") {
                    media["watermark"] = url;
                } else if (linkType === "Download Mp3") {
                    media["mp3"] = url;
                } else if (linkType === "Download without watermark") {
                    media["no_wm"] = url;
                } else if (linkType === "Download without watermark (HD)") {
                    media["hd"] = url;
                }
            });
        } else {
            media = urls;
        }
        links.media = media;

        return links;
    } catch (e) {
        return {
            status: 404,
            msg: e,
        };
    }
}

export async function aio(
    url,
    options = {
        audio: false,
        aFormat: "mp3",
        vCodec: "standar",
        vReso: "720p",
        mute: false,
    },
) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!url) return reject("Insert URL!");

            // ? OPTIONS
            let {
                audio,
                aFormat,
                vCodec,
                vReso,
                mute
            } = options;

            const prop = {};
            const data = {
                url: url,
                filenamePattern: "pretty",
            };

            // ? AUDIO
            if (audio) {
                const aFRegex = /best|mp3|ogg|wav|opus/gi;
                if (!aFormat) aFormat = "mp3";
                if (!aFRegex.test(aFormat)) aFormat = "mp3";
                data.isAudioOnly = true;
                data.aFormat = aFormat;
                prop.type = "audio";
                prop.mtype = aFormat;
            }

            // ? VIDEO
            else {
                // ? REGEXP
                const vCRegex = /standar|high|medium/gi;
                const vRRegex =
                    /max|8k\+?|4k|1440p?|1080p?|720p?|480p?|360p?|240p?|144p?/gi;

                // ? IF
                if (!vReso) vReso = "720p";
                if (!vCodec) vCodec = "standar";
                if (!vCRegex.test(vCRegex)) vCodec = "standar";
                if (!vRRegex.test(vReso)) vReso = "720p";
                if (!mute) mute = false;

                // ? QUALITY
                if (vReso === "8k+") vReso = "max";

                // ? CODEC
                switch (vCodec) {
                    case "standar": {
                        vCodec = "h246";
                        break;
                    }
                    case "high": {
                        vCodec = "av1";
                        break;
                    }
                    case "medium": {
                        vCodec = "vp9";
                        break;
                    }
                    default: {
                        vCodec: "h246";
                        break;
                    }
                }

                data.vCodec = vCodec;
                data.vQuality = vReso;
                data.isAudioOnly = false;
                data.isAudioMuted = mute;
                prop.type = "video";
                prop.hd = /max|8k+?|4k|1440p?/gi.test(vReso);
                prop.quality = vReso === "max" ? "8k+" : vReso;
                prop.codec = vCodec;
                prop.isMuted = mute;
            }

            // ? FETCHING
            const BASE_URL = "https://cobalt.tools";
            const BASE_API = "https://api.cobalt.tools/api";
            await fetch(BASE_API + "/json", {
                method: "OPTIONS",
                headers: {
                    "access-control-request-method": "POST",
                    "access-control-request-headers": "content-type",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                    origin: BASE_URL,
                    referer: BASE_URL,
                },
            }).then(async () => {
                const res = await fetch(BASE_API + "/json", {
                    method: "POST",
                    headers: {
                        origin: BASE_URL,
                        referer: BASE_URL,
                        "user-agent": BASE_URL,
                        "content-type": "application/json",
                        accept: "application/json",
                    },
                    body: JSON.stringify(data),
                }).then((v) => v.json());

                return resolve({
                    ...res,
                    ...prop
                });
            });
        } catch (e) {
            reject(e);
        }
    });
}

export async function Likee(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.request(
                "https://likeedownloader.com/process", {
                    method: "POST",
                    data: new URLSearchParams(Object.entries({
                        id: url
                    })),
                    headers: {
                        cookie: "_ga=GA1.2.553951407.1656223884; _gid=GA1.2.1157362698.1656223884; __gads=ID=0fc4d44a6b01b1bc-22880a0efed2008c:T=1656223884:RT=1656223884:S=ALNI_MYp2ZXD2vQmWnXc2WprkU_p6ynfug; __gpi=UID=0000069517bf965e:T=1656223884:RT=1656223884:S=ALNI_Map47wQbMbbf7TaZLm3TvZ1eI3hZw; PHPSESSID=e3oenugljjabut9egf1gsji7re; _gat_UA-3524196-10=1",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    },
                },
            );
            const $ = cheerio.load(data.template);
            const result = {
                status: 200,
                title: $("div.quote-box p.infotext").text().trim(),
                thumbnail: $("div.quote-box div.img_thumb img").attr("src"),
                watermark: $(".result-links-item:first-child a.with_watermark").attr(
                    "href",
                ),
                no_watermark: $(
                    ".result-links-item:last-child a.without_watermark",
                ).attr("href"),
            };
            console.log(result);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export async function cocofun(url) {
    return new Promise((resolve, reject) => {
        axios({
                url,
                method: "get",
                headers: {
                    Cookie: "client_id=1a5afdcd-5574-4cfd-b43b-b30ad14c230e",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                },
            })
            .then((data) => {
                $ = cheerio.load(data.data);
                let json;
                const res = $("script#appState").get();
                for (let i of res) {
                    if (i.children && i.children[0] && i.children[0].data) {
                        ress = i.children[0].data.split("window.APP_INITIAL_STATE=")[1];
                        json = JSON.parse(ress);
                    }
                    const result = {
                        status: 200,
                        author: author,
                        topic: json.share.post.post.content ?
                            json.share.post.post.content : json.share.post.post.topic.topic,
                        caption: $("meta[property='og:description']").attr("content"),
                        play: json.share.post.post.playCount,
                        like: json.share.post.post.likes,
                        share: json.share.post.post.share,
                        duration: json.share.post.post.videos[json.share.post.post.imgs[0].id].dur,
                        thumbnail: json.share.post.post.videos[json.share.post.post.imgs[0].id]
                            .coverUrls[0],
                        watermark: json.share.post.post.videos[json.share.post.post.imgs[0].id]
                            .urlwm,
                        no_watermark: json.share.post.post.videos[json.share.post.post.imgs[0].id].url,
                    };
                    resolve(result);
                }
            })
            .catch(reject);
    });
}

export async function terabox(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(
                "https://tera.instavideosave.com/?url=" + url
            ).then((v) => v.json());
            resolve(res);
        } catch (e) {
            reject(e);
        }
    });
}

export async function drive(url) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!/drive\.google\.com\/file\/d\//gi.test(url))
                return reject("Invalid URL");
            const res = await fetch(url).then((v) => v.text());
            const $ = cheerio.load(res);
            const id = url.split("/")[5];
            const data = {
                name: $("head").find("title").text().split("-")[0].trim(),
                download: `https://drive.usercontent.google.com/uc?id=${id}&export=download`,
                link: url,
            };

            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

export async function mediafiredl(url) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!/https?:\/\/(www\.)?mediafire\.com/.test(url)) {
                return reject(new Error("URL tidak valid untuk MediaFire"));
            }

            const response = await fetch(url);
            if (!response.ok) {
                return reject(new Error("Tidak dapat mengakses halaman MediaFire"));
            }

            const data = await response.text();
            const $ = cheerio.load(data);
            const Url = ($("#downloadButton").attr("href") || "").trim();
            const url2 = ($("#download_link > a.retry").attr("href") || "").trim();
            const $intro = $("div.dl-info > div.intro");
            const filename = $intro.find("div.filename").text().trim();
            const filetype = $intro.find("div.filetype > span").eq(0).text().trim();
            const ext = ((/\.([^.]*)$/.exec(filename) || [])[1] || "bin").trim();
            const $li = $("div.dl-info > ul.details > li");
            const upload_date = $li.eq(1).find("span").text().trim();
            const filesizeH = $li.eq(0).find("span").text().trim();

            const result = {
                url: Url || url2,
                filename,
                filetype,
                ext,
                upload_date,
                filesizeH,
            };

            resolve(result);
        } catch (error) {
            reject(new Error("Gagal mengambil informasi file dari MediaFire"));
        }
    });
}

export async function snackVideo(url) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!/snackvideo.com/gi.test(url)) return reject("Invalid URL!");
            const res = await fetch(url).then((v) => v.text());
            const $ = cheerio.load(res);
            const video = $("div.video-box").find("a-video-player");
            const author = $("div.author-info");
            const attr = $("div.action");
            const data = {
                title: $(author)
                    .find("div.author-desc > span")
                    .children("span")
                    .eq(0)
                    .text()
                    .trim(),
                thumbnail: $(video)
                    .parent()
                    .siblings("div.background-mask")
                    .children("img")
                    .attr("src"),
                media: $(video).attr("src"),
                author: $("div.author-name").text().trim(),
                authorImage: $(attr).find("div.avatar > img").attr("src"),
                like: $(attr).find("div.common").eq(0).text().trim(),
                comment: $(attr).find("div.common").eq(1).text().trim(),
                share: $(attr).find("div.common").eq(2).text().trim(),
            };

            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

export async function gofile(url) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!/gofile.io\/d\//gi.test(url)) return reject("Invalid URL!");
            const id = /https:\/\/gofile.io\/d\/([\d\w]+)/gi.exec(url)[1];

            if (!id) return reject("Folder Id Not Found");

            const BASE_API = "https://api.gofile.io";
            const BASE_URL = "https://gofile.io";
            const acc = await fetch(BASE_API + "/accounts", {
                method: "POST",
                headers: {
                    origin: BASE_URL,
                    referer: `${BASE_URL}/`,
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                },
                body: "{}",
            }).then((v) => v.json());

            if (acc.status !== "ok") return reject("Error making account");
            const {
                token
            } = acc.data;

            const content = await fetch(
                BASE_API +
                "/contents/" +
                id +
                "?" +
                new URLSearchParams({
                    wt: "4fd6sg89d7s6"
                }), {
                    method: "GET",
                    headers: {
                        origin: BASE_URL,
                        referer: `${BASE_URL}/`,
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                        authorization: `Bearer ` + token,
                    },
                }
            ).then((v) => v.json());

            if (content.status !== "ok") return reject("Error Fetching Content");

            resolve(content.data);
        } catch (e) {
            reject(e);
        }
    });
}

export async function PlayStore(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data,
                status
            } = await axios.get(
                    `https://play.google.com/store/search?q=${search}&c=apps`,
                ),
                hasil = [],
                $ = cheerio.load(data);
            if (
                ($(
                        ".ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a",
                    ).each((i, u) => {
                        const linkk = $(u).attr("href"),
                            nama = $(u).find(".j2FCNc > .cXFu1 > .ubGTjb > .DdYX5").text(),
                            developer = $(u)
                            .find(".j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb")
                            .text(),
                            img = $(u).find(".j2FCNc > img").attr("src"),
                            rate = $(u)
                            .find(".j2FCNc > .cXFu1 > .ubGTjb > div")
                            .attr("aria-label"),
                            rate2 = $(u)
                            .find(".j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF")
                            .text(),
                            link = `https://play.google.com${linkk}`;
                        hasil.push({
                            link: link,
                            nama: nama || "No name",
                            developer: developer || "No Developer",
                            img: img || "https://i.ibb.co/G7CrCwN/404.png",
                            rate: rate || "No Rate",
                            rate2: rate2 || "No Rate",
                            link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join("+")}`,
                        });
                    }),
                    hasil.every((x) => void 0 === x))
            )
                return resolve({
                    developer: "@xorizn",
                    mess: "no result found",
                });
            resolve(hasil);
        } catch (err) {
            console.error(err);
        }
    });
}

export async function wattpad() {
    async function search(q) {
        const baseUrl = "https://www.wattpad.com";
        const url = `${baseUrl}/search/${q}`; // Ganti dengan URL yang sesuai

        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body);

        const results = $(
                "section#section-results-stories article#results-stories ul.list-group li.list-group-item",
            )
            .map((index, element) => ({
                link: baseUrl + $(element).find(".story-card").attr("href"),
                image: $(element).find(".cover img").attr("src"),
                title: $(element)
                    .find('.story-info .title[aria-hidden="true"]')
                    .first()
                    .text()
                    .trim(),
                readCount: $(element)
                    .find(".new-story-stats .stats-value")
                    .eq(0)
                    .text(),
                voteCount: $(element)
                    .find(".new-story-stats .stats-value")
                    .eq(1)
                    .text(),
                chapterCount: $(element)
                    .find(".new-story-stats .stats-value")
                    .eq(2)
                    .text(),
                description: $(element).find(".description").text().trim(),
            }))
            .get();

        return results;
    }
    async function read(url, page = 1, output = "\n\n", prevTitle = null) {
        const pageURL = `${url}/page/${page}`;
        const response = await fetch(pageURL);
        const text = await response.text();
        const $ = cheerio.load(text);
        const newTitle = $("title").text();

        if (newTitle === prevTitle) {
            const nextURL = $("a.on-navigate.next-up").attr("href");
            if (!nextURL) return output;
            return read(nextURL, 1, output + `\n\n\t${prevTitle}\n`, null);
        }

        console.log(newTitle, text.length);

        $("p").each((index, element) => {
            const paragraph = $(element).text().trim();
            output += `${paragraph}\n`;
        });

        return read(url, page + 1, output, newTitle);
    }

    async function startRead(url) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);
            const startReadingLink = $("a.read-btn").attr("href");
            return "https://www.wattpad.com" + startReadingLink;
        } catch (error) {
            throw new Error("Error fetching data:", error);
        }
    }
    async function list(url) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);

            const tableOfContents = $('ul.table-of-contents li[class=""]')
                .map((index, element) => ({
                    title: $(element).find(".part-title").text().trim(),
                    link: "https://www.wattpad.com" +
                        $(element).find("a.on-navigate").attr("href"),
                }))
                .get();
            return tableOfContents;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }
    return {
        search,
        read,
        startRead,
        list
    }
};

export async function YTreso() {
    const extractVid = (data) => {
        const match = /(?:youtu\.be\/|youtube\.com(?:.*[?&]v=|.*\/))([^?&]+)/.exec(data);
        return match ? match[1] : null;
    };

    const info = async (link) => {
        let id = await extractVid(link)
        const {
            title,
            description,
            url,
            videoId,
            seconds,
            timestamp,
            views,
            genre,
            uploadDate,
            ago,
            image,
            thumbnail,
            author
        } = await yts({
            videoId: id
        });
        return {
            title,
            description,
            url,
            videoId,
            seconds,
            timestamp,
            views,
            genre,
            uploadDate,
            ago,
            image,
            thumbnail,
            author
        };
    };
    async function downloadVideo(url, downtype, vquality) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|music\?v=|embed\/|v\/|.+\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);

        if (!match) {
            throw new Error('URL tidak valid. Silakan masukkan URL YouTube yang benar.');
        }

        const videoId = match[1];
        const data = new URLSearchParams({
            videoid: videoId,
            downtype,
            vquality
        });

        try {
            const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
            return response.data.url;
        } catch (error) {
            throw new Error('Terjadi kesalahan: ' + error.message);
        }
    }

    async function download(urlnya, {
        mp4 = '360',
        mp3 = '128'
    } = {}) {
        try {
            const mp4Link = await downloadVideo(urlnya, 'mp4', mp4);
            const mp3Link = await downloadVideo(urlnya, 'mp3', mp3);
            const data = await info(urlnya) || null
            return {
                creator: "Fanzz",
                result: {
                    metadata: {
                        title: data.title,
                        description: data.description,
                        url: data.url,
                        videoId: data.videoId,
                        seconds: data.seconds,
                        timestamp: data.timestamp,
                        views: data.views,
                        genre: data.genre,
                        uploadDate: data.uploadDate,
                        ago: data.ago,
                        image: data.image,
                        thumbnail: data.thumbnail,
                        author: {
                            name: data.author.name,
                            url: data.author.url
                        }
                    },
                    mp4: mp4Link,
                    mp3: mp3Link
                },
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Mencari video YouTube berdasarkan kata kunci.
     * @param {string} query - Kata kunci pencarian.
     * @returns {Promise<Object>} - Hasil pencarian dari API.
     */
    async function search(query) {
        const url = `https://api.flvto.top/@api/search/YouTube/${encodeURIComponent(query)}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Cache-Control': 'no-cache',
                    'Origin': 'https://keepvid.online',
                    'Referer': 'https://keepvid.online/',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                }
            });

            return response.data.items.map(item => ({
                ...item,
                url: `https://www.youtube.com/watch?v=${item.id}`
            }));
        } catch (error) {
            throw new Error('Gagal mengambil hasil pencarian: ' + error.message);
        }
    }
    return {
        download,
        search
    }
}

export async function apkDl() {
    const APIs = {
        1: "https://apkcombo.com",
        2: "apk-dl.com",
        3: "https://apk.support",
        4: "https://apps.evozi.com/apk-downloader",
        5: "http://ws75.aptoide.com/api/7",
        6: "https://cafebazaar.ir",
    };
    const api = (ID, path = "/", query = {}) =>
        (ID in APIs ? APIs[ID] : ID) +
        path +
        (query ?
            "?" +
            new URLSearchParams(
                Object.entries({
                    ...query,
                }),
            ) :
            "");
    async function search(teks) {
        let res = await fetch(
            api(5, "/apps/search", {
                query: teks,
                limit: 1000,
            }),
        );

        let ress = {};
        res = await res.json();
        ress = res.datalist.list.map((v) => {
            return {
                name: v.name,
                id: v.package,
            };
        });
        return ress;
    }
    async function download(id) {
        let res = await fetch(
            api(5, "/apps/search", {
                query: id,
                limit: 1,
            }),
        );

        res = await res.json();
        return {
            img: res.datalist.list[0].icon,
            developer: res.datalist.list[0].store.name,
            appname: res.datalist.list[0].name,
            link: res.datalist.list[0].file.path,
        };
    }
    return {
        search,
        download
    }
};

export async function spotify() {
    process.env['SPOTIFY_CLIENT_ID'] = '4c4fc8c3496243cbba99b39826e2841f'
    process.env['SPOTIFY_CLIENT_SECRET'] = 'd598f89aba0946e2b85fb8aefa9ae4c8'
    async function convert(ms) {
        var minutes = Math.floor(ms / 60000)
        var seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }

    async function spotifyCreds() {
        return new Promise(async resolve => {
            try {
                const json = await (await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
                    headers: {
                        Authorization: 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
                    }
                })).data
                if (!json.access_token) return resolve({
                    creator: 'Budy x creator ',
                    status: false,
                    msg: 'Can\'t generate token!'
                })
                resolve({
                    creator: 'Budy x creator ',
                    status: true,
                    data: json
                })
            } catch (e) {
                resolve({
                    creator: 'Budy x creator ',
                    status: false,
                    msg: e.message
                })
            }
        })
    }



    async function getInfo(url) {
        return new Promise(async resolve => {
            try {
                const creds = await spotifyCreds()
                if (!creds.status) return resolve(creds)
                const json = await (await axios.get('https://api.spotify.com/v1/tracks/' + url.split('track/')[1], {
                    headers: {
                        Authorization: 'Bearer ' + creds.data.access_token
                    }
                })).data
                resolve({
                    creator: 'Budy x creator ',
                    status: true,
                    data: {
                        thumbnail: json.album.images[0].url,
                        title: json.artists[0].name + ' - ' + json.name,
                        artist: json.artists[0],
                        duration: convert(json.duration_ms),
                        preview: json.preview_url
                    }
                })
            } catch (e) {
                resolve({
                    creator: 'Budy x creator ',
                    status: false,
                    msg: e.message
                })
            }
        })
    }

    async function searching(query, type = 'track', limit = 20) {
        return new Promise(async resolve => {
            try {
                const creds = await spotifyCreds()
                if (!creds.status) return resolve(creds)
                const json = await (await axios.get('https://api.spotify.com/v1/search?query=' + query + '&type=' + type + '&offset=0&limit=' + limit, {
                    headers: {
                        Authorization: 'Bearer ' + creds.data.access_token
                    }
                })).data
                if (!json.tracks.items || json.tracks.items.length < 1) return resolve({
                    creator: 'Budy x creator ',
                    status: false,
                    msg: 'Music not found!'
                })
                let data = []
                json.tracks.items.map(v => data.push({
                    title: v.album.artists[0].name + ' - ' + v.name,
                    duration: convert(v.duration_ms),
                    popularity: v.popularity + '%',
                    preview: v.preview_url,
                    url: v.external_urls.spotify
                }))
                resolve({
                    creator: 'Budy x creator ',
                    status: true,
                    data
                })
            } catch (e) {
                resolve({
                    creator: 'Budy x creator ',
                    status: false,
                    msg: e.message
                })
            }
        })
    }


    async function spotifydl(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const yanzz = await axios.get(
                    `https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`, {
                        headers: {
                            accept: "application/json, text/plain, */*",
                            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                            "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
                            "sec-ch-ua-mobile": "?1",
                            "sec-ch-ua-platform": "\"Android\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "cross-site",
                            Referer: "https://spotifydownload.org/",
                            "Referrer-Policy": "strict-origin-when-cross-origin",
                        },
                    }
                );
                const yanz = await axios.get(
                    `https://api.fabdl.com/spotify/mp3-convert-task/${yanzz.data.result.gid}/${yanzz.data.result.id}`, {
                        headers: {
                            accept: "application/json, text/plain, */*",
                            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                            "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
                            "sec-ch-ua-mobile": "?1",
                            "sec-ch-ua-platform": "\"Android\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "cross-site",
                            Referer: "https://spotifydownload.org/",
                            "Referrer-Policy": "strict-origin-when-cross-origin",
                        },
                    }
                );
                const result = {};
                result.title = yanzz.data.result.name;
                result.type = yanzz.data.result.type;
                result.artis = yanzz.data.result.artists;
                result.durasi = yanzz.data.result.duration_ms;
                result.image = yanzz.data.result.image;
                result.download = "https://api.fabdl.com" + yanz.data.result.download_url;
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    };
    return {
        searching,
        spotifydl,
        getInfo
    }
}

export async function liriklagu(judul) {
    try {
        const {
            data
        } = await axios.get(
            "https://songsear.ch/q/" + encodeURIComponent(judul),
        );
        const $ = cheerio.load(data);
        const result = {
            title: $("div.results > div:nth-child(1) > .head > h3 > b").text() +
                " - " +
                $("div.results > div:nth-child(1) > .head > h2 > a").text(),
            album: $("div.results > div:nth-child(1) > .head > p").text(),
            number: $("div.results > div:nth-child(1) > .head > a")
                .attr("href")
                .split("/")[4],
            thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src"),
        };

        const {
            data: lyricData
        } = await axios.get(
            `https://songsear.ch/api/song/${result.number}?text_only=true`,
        );
        const lyrics = lyricData.song.text_html
            .replace(/<br\/>/g, "\n")
            .replace(/&#x27;/g, "'");

        return {
            status: true,
            title: result.title,
            album: result.album,
            thumb: result.thumb,
            lyrics: lyrics,
        };
    } catch (err) {
        console.log(err);
        return {
            status: false,
            error: "Unknown error occurred",
        };
    }
}

export async function apkmod() {
    async function search(query) {
        try {
            const response = await axios.get(`https://modcombo.com/?s=${query}`);
            const $ = cheerio.load(response.data);

            const apkList = [];
            $('.blogs.w3 li').each((index, element) => {
                const apk = {
                    title: $(element).find('.title').text(),
                    link: $(element).find('a.blog.search').attr('href'),
                    image: $(element).find('img.thumb.img-lazy').attr('data-src'),
                };
                apkList.push(apk);
            });

            return apkList;
        } catch (e) {
            throw e
        }
    }

    async function detail(link) {
        let response = await axios.get(link)
        const html = response.data;
        const $ = cheerio.load(html);
        let f = await axios.get($('a.btn.btn-red.btn-icon.btn-download').attr('href'))
        const ht = f.data;
        const $$ = cheerio.load(ht);
        const urlDownload = $$('div.links > div.item-apk > a').attr('href');
        let r = await axios.get(urlDownload)
        const hm = r.data;
        const $$$ = cheerio.load(hm);
        const script = $$$('script');
        const url = script.text().match(/https?:\/\/dlnew\.gamestoremobi\.com\/[^\s]+/g);
        let hasil = url[0].split('";').join("")
        const metadata = {
            name: $('h1.page-title').text().trim(),
            rating: $('div.rating span.score').text().trim(),
            image: $('figure.thumb img').attr('src'),
            version: $('table.apk-info-table tr:nth-child(4) td').text().trim(),
            category: $('table.apk-info-table tr:nth-child(6) td a').text().trim(),
            size: $('table.apk-info-table tr:nth-child(5) td').text().trim(),
            publish: $('table.apk-info-table tr:nth-child(2) td time').attr('datetime'),
            description: $('div.wrapcontent p').first().text().trim(),
            flatfrom: 'Android',
            developer: $('table.apk-info-table tr:nth-child(7) td a').text().trim(),
            download: hasil,
            original: $('table.apk-info-table tr:nth-child(9) td a').attr('href'),
        };
        const screenshot = [];
        $('figure.sm-single-content-image img').each((index, element) => {
            screenshot.push($(element).attr('src'));
        });
        return {
            creator: "Bang Fanzz",
            result: {
                metadata,
                screenshot
            }
        }
    }

    return {
        search,
        detail
    }
}

export async function facebook(t) {
    return new Promise(async (e, a) => {
        const i = await fetch("https://www.getfvid.com/downloader", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Referer: "https://www.getfvid.com/",
                },
                body: new URLSearchParams(
                    Object.entries({
                        url: t,
                    }),
                ),
            }),
            o = cheerio.load(await i.text());
        e({
            result: {
                url: t,
                title: o(
                    "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-5.no-padd > div > h5 > a",
                ).text(),
                time: o("#time").text(),
                hd: o(
                    "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a",
                ).attr("href"),
                sd: o(
                    "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a",
                ).attr("href"),
                audio: o(
                    "body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(3) > a",
                ).attr("href"),
            },
        });
    });
}