/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import fs from 'fs'
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

export async function npmstalk(packageName) {
    let stalk = await axios.get("https://registry.npmjs.org/" + packageName);
    let versions = stalk.data.versions;
    let allver = Object.keys(versions);
    let verLatest = allver[allver.length - 1];
    let verPublish = allver[0];
    let packageLatest = versions[verLatest];
    return {
        name: packageName,
        versionLatest: verLatest,
        versionPublish: verPublish,
        versionUpdate: allver.length,
        latestDependencies: Object.keys(packageLatest.dependencies).length,
        publishDependencies: Object.keys(versions[verPublish].dependencies).length,
        publishTime: stalk.data.time.created,
        latestPublishTime: stalk.data.time[verLatest],
    };
}

export async function randomCerpen() {
    try {
        const n = await axios.get("http://cerpenmu.com/");
        const a = cheerio.load(n.data);
        let r = [];
        a("#sidebar > div").each(function(t, e) {
            a(e)
                .find("ul > li")
                .each(function(t, e) {
                    let n = a(e).find("a").attr("href");
                    r.push(n);
                });
        });
        var t = r[Math.floor(Math.random() * r.length)];
        let o = await axios.get(`${t}`);
        const i = cheerio.load(o.data);
        let c = [];
        i("#content > article > article").each(function(t, e) {
            let n = i(e).find("h2 > a").attr("href");
            c.push(n);
        });
        var e = c[Math.floor(Math.random() * c.length)];
        let s = await axios.get(`${e}`);
        let u = cheerio.load(s.data);
        let l = u("#content").find("article > h1").text().trim();
        let h = u("#content").find("article > a:nth-child(2)").text().trim();
        let f = [];
        u("#content > article > p").each(function(t, e) {
            let n = u(e).text().trim();
            f.push(n);
        });
        let w = "";
        for (let t of f) w += t;
        return {
            status: true,
            judul: l,
            penulis: h,
            sumber: e,
            cerita: w,
        };
    } catch (t) {
        return {
            status: false,
        };
    }
}

export async function BukaLapak(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                data
            } = await axios.get(
                `https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, {
                    headers: {
                        "user-agent": "Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0",
                    },
                },
            );
            const $ = cheerio.load(data);
            const dat = [];
            const b = $("a.slide > img").attr("src");
            $("div.bl-flex-item.mb-8").each((i, u) => {
                const a = $(u).find("observer-tracker > div > div");
                const img = $(a).find("div > a > img").attr("src");
                if (typeof img === "undefined") return;

                const link = $(a).find(".bl-thumbnail--slider > div > a").attr("href");
                const title = $(a)
                    .find(".bl-product-card__description-name > p > a")
                    .text()
                    .trim();
                const harga = $(a)
                    .find("div.bl-product-card__description-price > p")
                    .text()
                    .trim();
                const rating = $(a)
                    .find("div.bl-product-card__description-rating > p")
                    .text()
                    .trim();
                const terjual = $(a)
                    .find("div.bl-product-card__description-rating-and-sold > p")
                    .text()
                    .trim();

                const dari = $(a)
                    .find("div.bl-product-card__description-store > span:nth-child(1)")
                    .text()
                    .trim();
                const seller = $(a)
                    .find("div.bl-product-card__description-store > span > a")
                    .text()
                    .trim();
                const link_sel = $(a)
                    .find("div.bl-product-card__description-store > span > a")
                    .attr("href");

                const res_ = {
                    title: title,
                    rating: rating ? rating : "No rating yet",
                    terjual: terjual ? terjual : "Not yet bought",
                    harga: harga,
                    image: img,
                    link: link,
                    store: {
                        lokasi: dari,
                        nama: seller,
                        link: link_sel,
                    },
                };

                dat.push(res_);
            });
            if (dat.every((x) => x === undefined))
                return resolve({
                    message: "Tidak ada result!"
                });
            resolve(dat);
        } catch (err) {
            console.error(err);
        }
    });
}

export async function Wikipedia(query) {
  const response = await fetch(
    `https://id.m.wikipedia.org/w/index.php?search=${query}`,
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  const contentArray = [];
  $("div.mw-parser-output p").each((index, element) => {
    contentArray.push($(element).text().trim());
  });

  const infoTable = [];
  $("table.infobox tr").each((index, element) => {
    const label = $(element).find("th.infobox-label").text().trim();
    const value =
      $(element).find("td.infobox-data").text().trim() ||
      $(element).find("td.infobox-data a").text().trim();
    if (label && value) {
      infoTable.push(`${label}: ${value}`);
    }
  });

  const data = {
    title: $("title").text().trim(),
    content: contentArray.join("\n"), // Menggabungkan konten menjadi satu string dengan newline separator
    image:
      "https:" +
      ($("#mw-content-text img").attr("src") ||
        "//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png"),
    infoTable: infoTable.join("\n"), // Menggabungkan infoTable menjadi satu string dengan newline separator
  };

  return data;
}

export async function HariLibur() {
  const { data } = await axios.get("https://www.liburnasional.com/");
  let libnas_content = [];
  let $ = cheerio.load(data);
  let result = {
    nextLibur:
      "Hari libur" +
      $("div.row.row-alert > div").text().split("Hari libur")[1].trim(),
    libnas_content,
  };
  $("tbody > tr > td > span > div").each(function (a, b) {
    summary = $(b).find("span > strong > a").text();
    days = $(b).find("div.libnas-calendar-holiday-weekday").text();
    dateMonth = $(b).find("time.libnas-calendar-holiday-datemonth").text();
    libnas_content.push({ summary, days, dateMonth });
  });
  return result;
}
export async function resepMasak() {
async function search(query) {
  return new Promise(async (resolve, reject) => {
    axios
      .get("https://resepkoki.id/?s=" + query)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const link = [];
        const judul = [];
        const upload_date = [];
        const format = [];
        const thumb = [];
        $(
          "body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a",
        ).each(function (a, b) {
          link.push($(b).attr("href"));
        });
        $(
          "body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a",
        ).each(function (c, d) {
          let jud = $(d).text();
          judul.push(jud);
        });
        for (let i = 0; i < link.length; i++) {
          format.push({
            judul: judul[i],
            link: link[i],
          });
        }
        const result = {
          creator: "Fanzz",
          data: format.filter((v) =>
            v.link.startsWith("https://resepkoki.id/resep"),
          ),
        };
        resolve(result);
      })
      .catch(reject);
  });
}

async function detail(query) {
  return new Promise(async (resolve, reject) => {
    axios
      .get(query)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const abahan = [];
        const atakaran = [];
        const atahap = [];
        $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name",
        ).each(function (a, b) {
          let bh = $(b).text();
          abahan.push(bh);
        });
        $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount",
        ).each(function (c, d) {
          let uk = $(d).text();
          atakaran.push(uk);
        });
        $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p",
        ).each(function (e, f) {
          let th = $(f).text();
          atahap.push(th);
        });
        const judul = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1",
        ).text();
        const waktu = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span",
        ).text();
        const hasil = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span",
        )
          .text()
          .split(": ")[1];
        const level = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span",
        )
          .text()
          .split(": ")[1];
        const thumb = $(
          "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img",
        ).attr("src");
        let tbahan = "bahan\n";
        for (let i = 0; i < abahan.length; i++) {
          tbahan += abahan[i] + " " + atakaran[i] + "\n";
        }
        let ttahap = "tahap\n";
        for (let i = 0; i < atahap.length; i++) {
          ttahap += atahap[i] + "\n\n";
        }
        const tahap = ttahap;
        const bahan = tbahan;
        const result = {
          creator: "Fanzz",
          data: {
            judul: judul,
            waktu_masak: waktu,
            hasil: hasil,
            tingkat_kesulitan: level,
            thumb: thumb,
            bahan: bahan.split("bahan\n")[1],
            langkah_langkah: tahap.split("tahap\n")[1],
          },
        };
        resolve(result);
      })
      .catch(reject);
  });
}
return {
search,
detail
}
}