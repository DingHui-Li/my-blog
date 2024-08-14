import * as StService from '../services/st.js'
import BaseResponse from "../base/baseResponse";

//按省份分类统计内容数量
export let stContentNumByProvince = defineEventHandler(async (event) => {
  let res = await StService.stContentNumByProvince()
  return new BaseResponse({ data: res });
});

//市级行政区查询
export let findRegionOfCity = defineEventHandler(async (event) => {
  const query = getQuery(event) || {}
  let res = await StService.findRegionOfCity(query?.codes?.split(','))
  return new BaseResponse({ data: res });
});
//区级行政区查询
export let findRegionOfDistrict = defineEventHandler(async (event) => {
  const body = await readBody(event);
  let res = await StService.findRegionOfDistrict(body.data)
  return new BaseResponse({ data: res });
});