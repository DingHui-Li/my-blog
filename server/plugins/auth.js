import BaseResponse from "../base/baseResponse";
import { verifyToken } from '../services/sys.js'

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook("request", async (event) => {
        try {
            const token = event.node.req.headers?.authorization
            let jwt = await verifyToken(token)
            event.context.user = jwt?.user
            if (event.node.req.url.includes('api/admin')) {
                let res = null
                if (!token) {
                    res = new BaseResponse({ msg: "Token不能为空", code: 2000 })
                } else {
                    if (!jwt?.user) {
                        res = new BaseResponse({ msg: "Token无效", code: 2002 })
                    }
                }
                if (res) {
                    event.node.res.write(JSON.stringify(res));
                    event.node.res.end();
                }
            }
        } catch (err) { }
    });
    nitroApp.hooks.hook("beforeResponse", async (event) => {
        setResponseHeaders(event, {
            "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': 'true',
            "Access-Control-Allow-Headers": '*',
            "Access-Control-Expose-Headers": '*'
        })
    })
})