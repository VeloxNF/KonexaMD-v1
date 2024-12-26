import cheerio from 'cheerio'
import axios from 'axios'
import fetch from 'node-fetch'

export async function search(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const nama = [];
				const developer = [];
				const lupdate = [];
				const size = [];
				const down = [];
				const version = [];
				const link = [];
				const format = [];
				$('#content > div > div > div.appRow > div > div > div > h5 > a').each(function(a, b) {
					const nem = $(b).text();
					nama.push(nem)
				})
				$('#content > div > div > div.appRow > div > div > div > a').each(function(c, d) {
					const dev = $(d).text();
					developer.push(dev)
				})
				$('#content > div > div > div.appRow > div > div > div > div.downloadIconPositioning > a').each(function(e, f) {
					link.push('https://www.apkmirror.com' + $(f).attr('href'))
				})
				$('#content > div > div > div.infoSlide > p > span.infoslide-value').each(function(g, h) {
					data = $(h).text();
					if (data.match('MB')) {
						size.push(data)
					} else if (data.match('UTC')) {
						lupdate.push(data)
					} else if (!isNaN(data) || data.match(',')) {
						down.push(data)
					} else {
						version.push(data)
					}
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: nama[i],
						dev: developer[i],
						size: size[i],
						version: version[i],
						uploaded_on: lupdate[i],
						download_count: down[i],
						link: link[i]
					})
				}
				const result = {
					creator: 'Hanya Orang Biasa',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
export async function apkDl(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const link = 'https://www.apkmirror.com' + $('.downloadButton').attr('href')

      if (link.includes('#downloads')) {

        const link2 = $('meta[property="og:url"]').attr('content') + "#downloads"
        const responses2 = await fetch(link2);
        const htmls2 = await responses2.text();
        const $s = cheerio.load(htmls2);
        const result = [];

        $s('.table-row.headerFont').each((index, row) => {
          const rowData = {
            version: $s(row).find('a.accent_color').text().trim(),
            bundle: $s(row).find('.apkm-badge.success').eq(0).text().trim(),
            splits: $s(row).find('.apkm-badge.success').eq(1).text().trim(),
            apkUrl: 'https://www.apkmirror.com' + $s(row).find('a.accent_color').attr('href'),
            downloadDate: $s(row).find('.dateyear_utc').data('utcdate')
          };

          // Memeriksa apakah setidaknya salah satu properti memiliki nilai
          const hasOutput = Object.values(rowData).some(value => value !== undefined && value !== '');
          if (hasOutput) {
            result.push(rowData);
          }
        });
        const response3 = await fetch(result[1].apkUrl);
        const html3 = await response3.text();
        const $t = cheerio.load(html3);

        const link3 = 'https://www.apkmirror.com' + $t('.downloadButton').attr('href')

        const response2 = await fetch(link3);
        const html2 = await response2.text();
        const $$ = cheerio.load(html2);

        const formElement2 = $$('#filedownload');
        const id2 = formElement2.find('input[name="id"]').attr('value');
        const key2 = formElement2.find('input[name="key"]').attr('value');

        const linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id2}&key=${key2}`;

        return {
          title: $('meta[property="og:title"]').attr('content'),
          gambar: $('meta[property="og:image"]').attr('content'),
          link: link,
          linkdl: linkdl,
          downloadText: $('.downloadButton').text().trim(),
          author: url.split('/')[4].toUpperCase(),
          info: $('.infoSlide').text().trim(),
          description: $('#description .notes').text().trim()
        };
      } else {
        const response2 = await fetch(link);
        const html2 = await response2.text();
        const $$ = cheerio.load(html2);

        const formElement = $$('#filedownload');
        const id = formElement.find('input[name="id"]').attr('value');
        const key = formElement.find('input[name="key"]').attr('value');
        const forcebaseapk = formElement.find('input[name="forcebaseapk"]').attr('value');
        const linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id}&key=${key}&forcebaseapk=${forcebaseapk}`;

        return {
          title: $('meta[property="og:title"]').attr('content'),
          gambar: $('meta[property="og:image"]').attr('content'),
          link: link,
          linkdl: linkdl,
          downloadText: $('.downloadButton').text().trim(),
          author: url.split('/')[4].toUpperCase(),
          info: $('.appspec-value').text().trim(),
          description: $('#description .notes').text().trim(),
          size: $('.appspec-row:nth-child(2) .appspec-value').text().trim(),
          tanggal: $('.appspec-row:last-child .appspec-value .datetime_utc').attr('data-utcdate')
        }
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  }