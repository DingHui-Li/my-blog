import Log from "../models/log";
import { getLocationByIp } from '../utils/location'

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