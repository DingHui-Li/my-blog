import Log from "../models/log";
import Cache from "../models/cache";
import { getLocationByIp, getGeocode } from '../utils/location'

export async function push({ ip = 'unknow', ua, url }) {
    return new Promise(async resolve => {
        if (!ip || ip == 'unknow') {
            return resolve(await Log.create({ ip, ua, url }))
        }
        let location = await getLocationByIp(ip)
        resolve(await Log.create({ ip, ua, url, location }))
    })
}

export function get({ page = 1, size = 100 }, filter = {}) {
    if (filter.type == 'client') {
        filter = { url: { '$not': /admin/i } }
    }
    return Log.find(filter).skip((page - 1) * size)
        .limit(size)
        .sort({ time: -1 })
}

export function st() {
    return new Promise(async resolve => {
        const result = await Cache.find({ label: "logSt" })
        console.log(result)
        if (result?.length && new Date().getTime() - result[0].time < (1000 * 60 * 60 * 24)) {
            return resolve(result[0].value)
        }
        let list = await Log.aggregate([
            {
                $group: {
                    _id: "$location",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    count: -1
                }
            }
        ])
        // resolve(getGeocode(list[1]._id))
        for (const item of list) {
            item.location = await getGeocode(item._id)
        }
        await Cache.updateOne({ label: "logSt" }, { value: list, time: new Date().getTime() }, { upsert: true })
        resolve(list)
    })
}