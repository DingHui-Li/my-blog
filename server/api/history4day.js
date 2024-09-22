import BaseResponse from "../base/baseResponse";
import * as cacheService from '../services/cache'
import $http from "@/utils/http.js";
import Cache from "../models/cache";

const apiKey = 'f695e46d053ba111a53cf72380c865f2'
export let searchByDate = defineEventHandler(async (event) => {
  const query = getQuery(event) || {}
  if (`${new Date().getMonth() + 1}/${new Date().getDate()}` != query.date) {
    return new BaseResponse({ data: '无效日期' });
  }
  const cacheKey = `history4day-${query.date}`
  let data = await cacheService.find(cacheKey, 0)
  if (!data) {
    await $http.get(`http://v.juhe.cn/todayOnhistory/queryEvent.php?key=${apiKey}&date=${query.date}`).then(async res => {
      data = res.result
      await cacheService.update(cacheKey, data)
    })
  }
  return new BaseResponse({ data: data });
});
export let searchById = defineEventHandler(async (event) => {
  let params = getRouterParams(event);
  if (params.id.length > 6) {
    return new BaseResponse({ data: "无效id" });
  }
  const cacheKey = `history4day-detail-${params.id}`
  let data = await cacheService.find(cacheKey, 0)
  if (!data) {
    await $http.get(`http://v.juhe.cn/todayOnhistory/queryDetail.php?key=${apiKey}&e_id=${params.id}`).then(async res => {
      data = res.result[0]
      await cacheService.update(cacheKey, data)
    })
  }
  return new BaseResponse({ data: data });
});