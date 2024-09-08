import * as LogService from '../services/log'
import parseQuery from "../utils/parseQuery";
import BaseResponse from "../base/baseResponse";

export let push = defineEventHandler(async (event) => {
    const body = await readBody(event);
    let res = await LogService.push({
        ip: body.ip,
        ua: body.ua,
        url: body.url,
        login: body.login || false
    });
    return new BaseResponse({ data: res });
});

export let get = defineEventHandler(async (event) => {
    let query = getQuery(event);
    let { pagination, filter } = parseQuery(query);
    let res = await LogService.get(pagination, filter);
    return new BaseResponse({ data: { list: res, ...pagination } });
});

export let st = defineEventHandler(async (event) => {
    let res = await LogService.st();
    return new BaseResponse({ data: res });
});