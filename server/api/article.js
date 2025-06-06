import BaseResponse from "../base/baseResponse";
import parseQuery from "../utils/parseQuery";
import Article from "../models/article";
import { getLocationByIp, getWeather, rgeocode } from "../utils/location";
import * as MovieService from '../services/movie'
import * as ArticleService from '../services/article'
import { ObjectId } from "mongodb";

//查询列表
export let getArticleList = defineEventHandler(async (event) => {

  let { pagination, filter } = parseQuery(getQuery(event));
  if (filter.topic) {
    let topics = filter.topic?.split(",")
    filter.topics = { $in: topics.concat(topics.map(i => new ObjectId(i))) };
    delete filter.topic;
  }
  if (filter.type == 'moment') {
    delete filter.type
  }
  if (filter.type == 'photo') {
    filter.type = 'moment'
    filter.imgs = { "$ne": null, "$not": { "$size": 0 } }
  }
  if (filter.type == 'movie') {
    filter = { 'movie.link': { $ne: null }, 'movie.title': { $ne: "" } }
  }
  if (filter.title) {
    filter.title = new RegExp(filter.title)
  }
  if (filter.content) {
    filter.textContent = new RegExp(filter.content)
    delete filter.content
  }
  if (filter.date) {
    let date = new Date(filter.date)
    let start = date.getTime()
    let end = new Date(`${filter.date} 23:59:59`).getTime()
    filter.createTime = { $gte: start, $lte: end }
    delete filter.date
  }
  let select = { htmlContent: 0 }
  if (filter.type == 'article') {
    select['textContent'] = 0
  }
  let res = await Article.find(filter)
    .select(select)
    .skip((pagination.page - 1) * pagination.size)
    .limit(pagination.size)
    .sort({ createTime: -1 })
    .populate("topics")
    .lean();
  let total = await Article.find(filter).count();
  if (!event.context.user) {
    res = ArticleService.handleOnleSelf(res)
  }

  // await getMoods()

  return new BaseResponse({
    data: {
      list: res,
      ...pagination,
      total,
    },
  });
});

//旧数据增加新字段
async function getMoods() {
  let res = await Article.find({ topics: { $in: ["65f048a608f4379bf6dd0c63"] } }).lean()
  let num = 0
  for (const item of res) {
    num++
    if (item?.mood) {
      let mood = await ArticleService.getMood(item)
      await Article.updateOne(
        { _id: item._id },
        { ...item, mood }
      );
    }
    console.log(num / res.length * 100)
  }
}

//查询详情
export let getArticle = defineEventHandler(async (event) => {
  let params = getRouterParams(event);
  let res = await Article.findOne({ _id: params.id }).populate("topics");
  if (!event.context.user && res.onlySelf) {
    res = ArticleService.handleOnleSelf([res])[0]
  }
  return new BaseResponse({ data: res });
});

//相似文章-同主题
export let getSameArticleList = defineEventHandler(async (event) => {
  let query = getQuery(event);
  let params = getRouterParams(event);

  let topics = query.topics?.split(",")
  let res = await Article.find({
    _id: { $ne: params.id },
    topics: { $in: topics.concat(topics.map(i => new ObjectId(i))) },
  })
    .limit(3)
    .populate("topics");
  return new BaseResponse({ data: res });
});

//搜索
export let searchArticleList = defineEventHandler(async (event) => {
  let { pagination, filter } = parseQuery(getQuery(event));
  if (filter.keyword) {
    filter["$text"] = { $search: filter.keyword }
    delete filter.keyword
  }
  if (filter.topics) {
    let topics = filter.topics?.split(",")
    filter["topics"] = { $in: topics.concat(topics.map(i => new ObjectId(i))) };
  }
  let res = await Article.find(filter)
    .select({ htmlContent: 0, textContent: 0 })
    .skip((pagination.page - 1) * pagination.size)
    .limit(pagination.size)
    .populate("topics");
  return new BaseResponse({ data: res });
});

//添加
export let addArticle = defineEventHandler(async (event) => {
  const body = await readBody(event);
  // const headers = event.node.req.headers
  // let ip = headers['remote-host']
  //   || headers['x-client-source-ip']
  //   || headers['x-real-ip']
  // let location = await getLocationByIp(ip)
  let weather = {}
  if (body?.location?.location) {
    let lnglat = body.location.location
    body.location.detail = await rgeocode(lnglat.lng, lnglat.lat)
    weather = await getWeather(body.location?.location)
  }
  let validRes = validContent(body)
  if (validRes !== true) {
    return validRes
  }
  if (body.movie) {
    body.movie.cover = await ArticleService.saveNetworkImg(body.movie?.cover)
  }
  let d = {
    ...body,
    weather,
    desc: body.textContent?.slice(0, 50),
  }
  d['ai'] = await ArticleService.getAiResponse(d)
  d['mood'] = await ArticleService.getMood(d)
  let res = await Article.create(d);
  return new BaseResponse({ data: res });
});

//编辑
export let editArticle = defineEventHandler(async (event) => {
  let body = await readBody(event);
  let validRes = validContent(body)
  if (validRes !== true) {
    return validRes
  }
  if (body.movie) {
    body.movie.cover = await ArticleService.saveNetworkImg(body.movie?.cover)
  }
  if (body.location) {
    let lnglat = body.location.location
    body.location.detail = await rgeocode(lnglat.lng, lnglat.lat)
  }
  let d = {
    ...body,
    desc: body.textContent?.slice(0, 50),
    updateTime: new Date().getTime(),
  }
  if (!d.ai?.content) {
    const aiResponse = await ArticleService.getAiResponse(d)
    if (aiResponse?.content) {
      d['ai'] = aiResponse
    }
  }
  if (!d?.mood) {
    d['mood'] = await ArticleService.getMood(d)
  }
  let res = await Article.updateOne(
    { _id: body._id },
    d
  );
  return new BaseResponse({ data: res });
});

//删除
export let deleteArticle = defineEventHandler(async (event) => {
  let params = getRouterParams(event);
  let res = await Article.deleteOne({ _id: params?.id });
  return new BaseResponse({ data: res });
});

function validContent(body) {
  if (!body.title?.trim().length && body.type == 'article') {
    return new BaseResponse({ code: 100, msg: "标题不能为空" });
  }
  if (!body.htmlContent?.trim().length && body.type != 'photo') {
    return new BaseResponse({ code: 100, msg: "内容不能为空" });
  }
  if (!body.topics?.length && body.type == 'articlw') {
    return new BaseResponse({ code: 100, msg: "请选择至少一个标签" });
  }
  return true
}

//从豆瓣搜索电影
export let searchMovie = defineEventHandler(async (event) => {
  let query = getQuery(event);
  let res = await MovieService.searchMovie(query.name)
  return new BaseResponse({ data: res });
});


export let stArticleByDate = defineEventHandler(async (event) => {
  let query = getQuery(event);
  let res = await ArticleService.stByDate(parseQuery(query)?.filter)
  return new BaseResponse({ data: res });
});


//根据id列表查询内容
export let getContentById = defineEventHandler(async (event) => {
  const body = await readBody(event);
  let res = await ArticleService.getContentById(body.ids)
  if (!event.context.user) {
    res = ArticleService.handleOnleSelf(res)
  }
  return new BaseResponse({ data: res });
});

//那年今日
export let searchForSameDay = defineEventHandler(async (event) => {
  let query = getQuery(event);
  let res = await ArticleService.searchForSameDay(query.day)
  if (!event.context.user) {
    res = ArticleService.handleOnleSelf(res)
  }
  return new BaseResponse({ data: res });
});

//获取ai回复
export let getAiReply = defineEventHandler(async (event) => {
  let body = await readBody(event);
  const aiResponse = await ArticleService.getAiResponse(body)
  return new BaseResponse({ data: aiResponse });
});

export let getMood = defineEventHandler(async (event) => {
  let body = await readBody(event);
  const aiResponse = await ArticleService.getMood(body)
  return new BaseResponse({ data: aiResponse });
});