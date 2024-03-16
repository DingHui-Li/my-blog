import BaseResponse from "../base/baseResponse";
import { verifyToken } from '../services/sys.js'

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook("request", async (event) => {
        try {
            if (event.node.req.url.includes('api/admin')) {
                const token = event.node.req.headers?.authorization
                let res = null
                if (!token) {
                    res = new BaseResponse({ msg: "Token cannot be empty", code: 2000 })
                } else {
                    let jwt = await verifyToken(token)
                    if (!jwt?.user) {
                        res = new BaseResponse({ msg: "Token is invalid", code: 2002 })
                    }
                }
                if (res) {
                    event.node.res.write(JSON.stringify(res));
                    event.node.res.end();
                }
            }
        } catch (err) { }
    });
})