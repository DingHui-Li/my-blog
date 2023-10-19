import request from 'request'
import config from "~/.config.json";

export function getLocationByIp(ip) {
    return new Promise((resolve, reject) => {
        request(`https://opendata.baidu.com/api.php?query=${ip}&co=&resource_id=6006&oe=utf8`,
            async (err, res, body) => {
                let location = '未知'
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

export function getLatlngByAddress(address) {
    return new Promise(resolve => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=${config.mapbox.token}&language=zh&limit=1`
        request(encodeURI(url),
            async (err, res, body) => {
                console.log(body)
                let location = {}
                try {
                    let data = JSON.parse(body)
                    location = data.result.location
                } catch (err) { }
                resolve(JSON.parse(body))
            })
    })
}