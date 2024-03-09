import BaseResponse from "../base/baseResponse";
import Sys from "../models/sys";
import * as SysService from '../services/sys.js'

export let getTOTPQR = defineEventHandler(async (event) => {
    let query = getQuery(event);
    const img = await SysService.getTOTPQR(query.secret);
    return new BaseResponse({ data: img });
});

export let login = defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const token = await SysService.login(body.code)
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