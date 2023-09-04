import request from 'request'

export function getLocationByIp(ip) {
    return new Promise((resolve, reject) => {
        request(`https://opendata.baidu.com/api.php?query=${ip}&co=&resource_id=6006&oe=utf8`,
            async (err, res, body) => {
                let data = {}
                try {
                    data = JSON.parse(body)
                    data = data.data[0]
                } catch (err) {
                    return reject(err)
                }
                resolve(data.location)
            })
    })
}