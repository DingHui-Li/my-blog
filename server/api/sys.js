import BaseResponse from "../base/baseResponse";
import Sys from "../models/sys";
import * as SysService from '../services/sys.js'
import * as cacheService from '../services/cache'
import * as AiService from '../services/AIAssistant'

export let getTOTPQR = defineEventHandler(async (event) => {
    let query = getQuery(event);
    const img = await SysService.getTOTPQR(query.secret);
    return new BaseResponse({ data: img });
});

export let login = defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const token = await SysService.login(body.code, Boolean(body.fromApp), body.longtime)
        return new BaseResponse({ data: { token } });
    } catch (err) {
        return new BaseResponse({ code: 2001, msg: err });
    }
});

export let getGlobalSetting = defineEventHandler(async (event) => {
    let res = await Sys.findOne({ key: 'setting' });
    return new BaseResponse({ data: res?.value });
});

export let setGlobalSetting = defineEventHandler(async (event) => {
    const body = await readBody(event);
    let res = await Sys.updateOne({ key: 'setting' }, { value: body }, { upsert: true });
    return new BaseResponse({ data: res });
});

//分析博客内容
export let analyMyBlog = defineEventHandler(async (event) => {
    let res = await cacheService.find('aiAnalyMyBlog')
    if (!res) {//没有缓存,重新分析
        res = await AiService.analyOfAllData()
        res.time = new Date().getTime()
        if (res.content) {
            await cacheService.update("aiAnalyMyBlog", res)
        }
    }
    return new BaseResponse({ data: res });
});

//分析近一周的情绪
export let analyMoodByNearWeek = defineEventHandler(async (event) => {
    let res = await cacheService.find('aiAnalyMoodByNearWeek')
    if (!res) {//没有缓存,重新分析
        res = await AiService.analyMoodByNearWeek()
        res.time = new Date().getTime()
        if (res.content) {
            await cacheService.update("aiAnalyMoodByNearWeek", res)
        }
    }
    return new BaseResponse({ data: res });
});