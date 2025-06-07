import * as cacheService from '../services/cache'
import $http from "@/utils/http.js";
import Article from "../models/article";
import { rgeocode } from "../utils/location";
import config from "~/.config.json";

export async function stContentNumByProvince() {
  return new Promise(async (resolve) => {
    let list = await Article.find({ 'location': { $ne: null } }).select({ location: 1 })
    let res = {}
    for (const item of list) {
      let lnglat = item.location.location
      if (lnglat) {
        if (!item.location.detail) {
          item.location.detail = await rgeocode(lnglat.lng, lnglat.lat)
          await Article.updateOne({ _id: item._id }, { location: item.location })
        }
        if (res[item.location.detail.province]) {
          res[item.location.detail.province].push(item)
        } else {
          res[item.location.detail.province] = [item]
        }
      }
    }
    resolve(res)
  })
}

export function findRegionOfCity(codes = []) {
  return new Promise(async resolve => {
    let t = {}
    for (const code of codes) {
      let cityData = await findDistrictByCitycode(code)
      t[code] = cityData[0].center?.split(',')
    }
    resolve(t)
  })
}
export function findRegionOfDistrict(data) {
  return new Promise(async resolve => {
    let t = {}
    for (const citycode in data) {
      let cityData = await findDistrictByCitycode(citycode)
      for (const code of Array.from(new Set(data[citycode]))) {
        t[code] = cityData.find(item => item.adcode == code)?.center?.split(',')
      }
    }
    resolve(t)
  })
}

function findDistrictByCitycode(code) {
  return new Promise(async resolve => {
    let data = await cacheService.find(`district-${code}`, 0)
    if (!data) {
      await $http.get(`https://restapi.amap.com/v3/config/district?key=${config.amap.webkey}&keywords=${code}`).then(async res => {
        data = res.districts
        await cacheService.update(`district-${code}`, data)
      })
    }
    resolve(data)
  })
}

//统计积极/消极情绪top10列表
export function findRankListByMood() {
  return new Promise(async resolve => {
    //积极情绪前10
    let top10 = await Article.find({ type: "moment", mood: { $exists: true }, 'movie.link': { $exists: false } })
      .select({ htmlContent: 0 })
      .limit(10)
      .sort({ "mood.score": -1 })
      .populate("topics")
      .lean();
    //消极情绪前10
    let bottom10 = await Article.find({ type: "moment", mood: { $exists: true }, 'movie.link': { $exists: false } })
      .select({ htmlContent: 0 })
      .limit(10)
      .sort({ "mood.score": 1 })
      .populate("topics")
      .lean();
    //好吃食物前10
    let good10 = await Article.find({ 'mood.food': { $ne: "", $exists: true, } })
      .select({ htmlContent: 0 })
      .limit(10)
      .sort({ "mood.score": -1 })
      .populate("topics")
      .lean();
    //难吃食物前10
    let bad10 = await Article.find({ 'mood.food': { $ne: "", $exists: true, } })
      .select({ htmlContent: 0 })
      .limit(10)
      .sort({ "mood.score": 1 })
      .populate("topics")
      .lean();
    resolve({ top10, bottom10, good10, bad10 })
  })
}