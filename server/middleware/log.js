import * as LogService from '../services/log'
export default defineEventHandler((event) => {
    const headers = event.node.req.headers
    LogService.push({
        ip: headers['bigo-x-client-source-ip']
            || headers['x-real-ip']
            || event.node.req.message?.socket?.remoteAddress,
        ua: headers['user-agent'],
        url: event.node.req.url
    })
})