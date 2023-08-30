import * as LogService from '../services/log'
export default defineEventHandler((event) => {
    const headers = event.node.req.headers
    LogService.push({
        ip: headers['X-Real-IP'],
        ua: headers['user-agent'],
        url: event.node.req.url
    })
})