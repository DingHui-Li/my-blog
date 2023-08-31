import * as LogService from '../services/log'
export default defineEventHandler((event) => {
    const headers = event.node.req.headers
    console.log('middleware=',event.node.req.url)
    let ip = headers['remote-host']
        || headers['x-real-ip']
        || event.node.req.message?.socket?.remoteAddress
    LogService.push({
        ip: ip,
        ua: headers['user-agent'],
        url: event.node.req.url
    })
})