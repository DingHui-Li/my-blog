import Log from "../models/log";

export function push({ ip = 'unknow', ua, url }) {
    return Log.create({ ip, ua, url })
}

export function get({ page = 1, size = 100 }) {
    return Log.find().skip((page - 1) * size)
        .limit(size)
        .sort({ time: -1 })
}