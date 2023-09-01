import BaseResponse from "../base/baseResponse";

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook("request", (event) => {
        try {
            // if (event.node.req.url.includes('/api/log')) {
            //     let res = new BaseResponse({ data: "no token", code: 500 })
            //     event.node.res.write(JSON.stringify(res));
            //     event.node.res.end();
            // }
        } catch (err) { }
    });
})