import Log from "../models/log";
import request from 'request'

export async function push({ ip = 'unknow', ua, url }) {
    return new Promise(async resolve => {
        if (!ip || ip == 'unknow') {
            return resolve(await Log.create({ ip, ua, url }))
        }
        request(`https://opendata.baidu.com/api.php?query=${ip}&co=&resource_id=6006&oe=utf8`,
            async (err, res, body) => {
                let data = {}
                try {
                    data = JSON.parse(body)
                    data = data.data[0]
                } catch (err) { }
                resolve(await Log.create({ ip, ua, url, location: data.location }))
            })
    })
}

export function get({ page = 1, size = 100 }) {
    return Log.find().skip((page - 1) * size)
        .limit(size)
        .sort({ time: -1 })
}