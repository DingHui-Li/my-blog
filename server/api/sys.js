import BaseResponse from "../base/baseResponse";
import Sys from "../models/sys";

export let getGlobalSetting = defineEventHandler(async (event) => {
    let res = await Sys.findOne({ key: 'setting' });
    return new BaseResponse({ data: res?.value });
});

export let setGlobalSetting = defineEventHandler(async (event) => {
    const body = await readBody(event);
    let res = await Sys.updateOne({ key: 'setting' }, { value: body }, { upsert: true });
    return new BaseResponse({ data: res });
});