import Log from "../models/log";

export function push({ ip = 'unknow', platform = 'unknow', ua, url }) {
    return Log.create({ ip, platform, ua, url })
}

export function get({ page = 1, size = 500 }) {
    return Log.find().skip((page - 1) * size)
        .select({ ua: 0 })
        .limit(size)
        .sort({ time: -1 })
}