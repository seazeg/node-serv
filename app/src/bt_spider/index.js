const rp = require('request-promise');
const cheerio = require('cheerio');
const iconv = require('iconv-lite')
const egu = require('eg-utils')
const fs = require('fs')


run(1)

function run(pageNum) {
    for (let i = 1; i <= pageNum; i++) {
        getContent(`https://www.dytt8.net/html/gndy/dyzz/list_23_${i}.html`, function ($) {
            let result = {
                "data": [],
                "isSuccess": true,
                "resultMsg": "执行成功！"
            }
            $('.co_content8').find('a').each(function () {

                getContent(`https://www.dytt8.net/${$(this).attr('href')}`, function ($, resolve) {
                    let obj = {}
                    let info = egu.trim($('#Zoom').find('p').eq(0).text(), 'all')
                    let imdb = info.indexOf('◎IMDb评分')
                    let douban = info.indexOf('◎豆瓣评分')
                    if ($('.title_all h1').text()) {
                        obj.name = $('.title_all h1').text()
                        // console.log(`${$('.title_all h1').text()}`);
                    }
                    if (imdb > 0) {
                        obj.imdb = info.slice(imdb + 1, imdb + 13)
                        // console.log(info.slice(imdb + 1, imdb + 13));
                    }
                    if (douban > 0) {
                        obj.douban = info.slice(douban + 1, douban + 11)
                        // console.log(info.slice(douban + 1, douban + 11));
                    }

                    $('#Zoom a[href]').each(function () {
                        if ($(this).attr('href').includes('magnet:?xt=urn')) {
                            obj.url = $(this).attr('href')
                            // console.log($(this).attr('href'));
                        }
                    });
                    if (JSON.stringify(obj) != "{}") {
                        result.data.push(obj)
                        resolve();
                    }
                }).then(function () {
                    writeFile(JSON.stringify(result));
                })
            })
        })
    }
}

function writeFile(msg) {
    fs.writeFile('./res.json', msg, 'utf-8', function (err) {
        if (err)
            console.log('写文件出错了，错误是：' + err);
        else
            console.log('ok');
    })
}

function getContent(url, callback) {
    return new Promise((resolve, reject) => {
        const options = {
            uri: url,
            encoding: null,
            headers: {
                'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"
            },
            transform: function (body) {
                return cheerio.load(iconv.decode(body, 'gb2312'));
            }
        };
        rp(options).then(function ($) {
            callback($, resolve)
        }).catch(function (err) {
            // Crawling failed or Cheerio choked...
        });
    })
}