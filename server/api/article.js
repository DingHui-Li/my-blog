import BaseResponse from "../base/baseResponse";
import parseQuery from "../utils/parseQuery";
import Article from "../models/article";
import { getLocationByIp, getWeather } from "../utils/location";
import * as MovieService from '../services/movie'
import * as ArticleService from '../services/article'

//查询列表
export let getArticleList = defineEventHandler(async (event) => {
  let { pagination, filter } = parseQuery(getQuery(event));
  if (filter.topic) {
    filter.topics = { $in: filter.topic };
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
  console.log(select)
  let res = await Article.find(filter)
    .select(select)
    .skip((pagination.page - 1) * pagination.size)
    .limit(pagination.size)
    .sort({ createTime: -1 })
    .populate("topics");
  let total = await Article.find(filter).count();
  return new BaseResponse({
    data: {
      list: res,
      ...pagination,
      total,
    },
  });
});

//查询详情
export let getArticle = defineEventHandler(async (event) => {
  let params = getRouterParams(event);
  let res = await Article.findOne({ _id: params.id }).populate("topics");
  return new BaseResponse({ data: res });
});

//相似文章-同主题
export let getSameArticleList = defineEventHandler(async (event) => {
  let query = getQuery(event);
  let params = getRouterParams(event);

  let res = await Article.find({
    _id: { $ne: params.id },
    topics: { $in: query.topics?.split(",") },
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
    filter["topics"] = { $in: filter.topics?.split(",") };
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
  if (body.location) {
    weather = await getWeather(body.location?.location)
  }
  let validRes = validContent(body)
  if (validRes !== true) {
    return validRes
  }
  if (body.movie) {
    body.movie.cover = await ArticleService.saveNetworkImg(body.movie?.cover)
  }
  let res = await Article.create({
    ...body,
    weather,
    desc: body.textContent?.slice(0, 50),
  });
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
  let res = await Article.updateOne(
    { _id: body._id },
    {
      ...body,
      desc: body.textContent?.slice(0, 50),
      updateTime: new Date().getTime(),
    }
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