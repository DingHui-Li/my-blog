import Log from "../models/log";
import { getLocationByIp, getLatlngByAddress } from '../utils/location'

export async function push({ ip = 'unknow', ua, url }) {
    return new Promise(async resolve => {
        if (!ip || ip == 'unknow') {
            return resolve(await Log.create({ ip, ua, url }))
        }
        let location = await getLocationByIp(ip)
        resolve(await Log.create({ ip, ua, url, location }))
    })
}

export function get({ page = 1, size = 100 }) {
    return Log.find().skip((page - 1) * size)
        .limit(size)
        .sort({ time: -1 })
}

export function st() {
    return new Promise(async resolve => {
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
        resolve(getLatlngByAddress('Phoenix, Arizona, USA'))
        // list = list.slice(0, 10)
        // for (const item of list) {
        //     item.location = await getLatlngByAddress(item._id)
        // }
        // resolve(list)
    })
}