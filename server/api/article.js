import BaseResponse from "../base/baseResponse";
import parseQuery from "../utils/parseQuery";
import Article from "../models/article";

//查询列表
export let getArticleList = defineEventHandler(async (event) => {
  let query = getQuery(event);
  let { pagation, filter } = parseQuery(query);
  if (filter.topic) {
    filter.topics = { $in: filter.topic };
    delete filter.topic;
  }
  let res = await Article.find(filter)
    .select({ htmlContent: 0, })
    .skip((pagation.page - 1) * pagation.size)
    .limit(pagation.size)
    .sort({ updateTime: -1 })
    .populate("topics");
  let total = await Article.find(filter).count();
  return new BaseResponse({
    data: {
      list: res,
      ...pagation,
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
  let query = getQuery(event);

  let filter = {
    $text: { $search: query.keyword },
  };
  if (query.topics) {
    filter["topics"] = { $in: query.topics?.split(",") };
  }
  let res = await Article.find(filter)
    .limit(20)
    .populate("topics");
  return new BaseResponse({ data: res });
});

//添加
export let addArticle = defineEventHandler(async (event) => {
  const body = await readBody(event);
  let validRes = validContent(body)
  if (validRes !== true) {
    return validRes
  }
  let res = await Article.create({
    ...body,
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