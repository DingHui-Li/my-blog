import * as LogService from '../services/log'
import parseQuery from "../utils/parseQuery";
import BaseResponse from "../base/baseResponse";

export let get = defineEventHandler(async (event) => {
    let query = getQuery(event);
    let { pagation, filter } = parseQuery(query);
    let res = await LogService.get(pagation, filter);
    return new BaseResponse({ data: { list: res, ...pagation } });
});

export let st = defineEventHandler(async (event) => {
    let res = await LogService.st();
    return new BaseResponse({ data: res });
});