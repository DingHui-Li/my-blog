import request from 'request'
import Geocode from "../models/geocode";
import config from "~/.config.json";
import zlib from 'zlib';

export function getLocationByIp(ip) {
    return new Promise((resolve, reject) => {
        request({
            url: `https://opendata.baidu.com/api.php?query=${ip}&co=&resource_id=6006&oe=utf8`,
        },
            async (err, res, body) => {
                let location = ''
                try {
                    let data = JSON.parse(body)
                    data = data.data[0]
                    location = data.location.split(' ')[0]
                } catch (err) {
                    return resolve(location)
                }
                resolve(location)
            })
    })
}

export function getWeather(location = '') {
    return new Promise(async (resolve, reject) => {
        try {
            let latlon = await getGeocode(location)
            let chunks = []
            let res = request(`https://devapi.qweather.com/v7/weather/now?location=${latlon.lon},${latlon.lat}&key=${config.qweather.key}`)
            res.on('data', chunk => {
                chunks.push(chunk)
            })
            res.on('end', () => {
                let buffer = Buffer.concat(chunks);
                zlib.gunzip(buffer, (err, d) => {
                    let data = JSON.parse(d.toString())
                    data.now.fxLink = data.fxLink
                    resolve(data?.now || {})
                })
            })
        } catch (err) {
            resolve({})
        }
    })
}

export function getGeocode(address) {
    return new Promise(async (resolve) => {
        address = parseName(address)
        if (!address) {
            return resolve({})
        }
        let res = await Geocode.find({ name: address }).select({ raw: 0 })
        if (res.length) {
            return resolve(res[0])
        }
        const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1&addressdetails=1&extratags=1`
        //每秒绝对最多 1 个请求-免费api限制
        setTimeout(() => {
            request({
                url: encodeURI(url),
                headers: {
                    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
                }
            },
                async (err, res, body) => {
                    let location = {
                        name: address
                    }
                    try {
                        let data = JSON.parse(body)
                        location.lon = data[0]?.lon
                        location.lat = data[0]?.lat
                        await Geocode.create({
                            ...location,
                            raw: data[0]
                        })
                    } catch (err) {
                        console.log(err)
                    }
                    resolve(location)
                })
        }, 1000);
    })
}

function parseName(name) {
    //去除可能影响搜索位置的字
    const replaceWords = ['CNNIC', '腾讯云', '阿里云', '华为云', '移动', '联通', '电信', 'BGP多线', '德克萨斯', '格拉沃利讷', '伊利诺斯', '南卡罗来纳', '皮斯卡特维', '马哈拉施特拉', '赫恩登', '博尔德', '伊利诺斯西', '辛辛那提', '德克萨斯', '伊利诺斯', '弗吉尼亚', '考克斯', '南本德', '俄勒冈', '纽瓦克', '亚利桑那', '阿什本']
    if (!name) {
        return ''
    }
    name = replaceWords.reduce((t, word) => {
        return t.replace(word, '')
    }, name)
    return name
}