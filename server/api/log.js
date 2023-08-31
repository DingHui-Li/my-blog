import * as LogService from '../services/log'
import parseQuery from "../utils/parseQuery";
import BaseResponse from "../base/baseResponse";
import { createRouter, defineEventHandler, useBase } from 'h3';

export let get = defineEventHandler(async (event) => {
    let query = getQuery(event);
    let { pagation, filter } = parseQuery(query);
    let res = await LogService.get(pagation);
    return new BaseResponse({ data: { list: res, ...pagation } });
});

const router = createRouter();
router.get(
    '/log',
    get
);
export default useBase('/', router.handler);