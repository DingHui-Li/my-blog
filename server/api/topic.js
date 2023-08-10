import BaseResponse from "../base/baseResponse";
import Topic from "../models/topic";

//查询列表
export let getTopicList = defineEventHandler(async (event) => {
  let list = await Topic.find();
  return new BaseResponse({ data: list });
});

export let getTopic = defineEventHandler(async (event) => {
  let params = getRouterParams(event);
  let res = await Topic.findOne({ _id: params.id });
  return new BaseResponse({ data: res });
});

//添加
export let addTopic = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.name?.trim().length) {
    return new BaseResponse({ code: 100, msg: "主题名不能为空" });
  }
  if (await checkTopicExist(body?.name)) {
    return new BaseResponse({ code: 100, msg: "该主题已存在" });
  }
  delete body._id
  let topic = await Topic.create({
    ...body,
  });
  return new BaseResponse({ data: topic });
});

//修改
export let editTopic = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body?.name?.trim().length) {
    return new BaseResponse({ code: 100, msg: "主题名不能为空" });
  }
  if (await checkTopicExist(body?.name)) {
    return new BaseResponse({ code: 100, msg: "该主题已存在" });
  }
  let topic = await Topic.updateOne({ _id: body._id }, body);
  return new BaseResponse({ data: topic });
});

//删除
export let deleteTopic = defineEventHandler(async (event) => {
  let params = getRouterParams(event);
  let res = await Topic.deleteOne({ _id: params.id });
  return new BaseResponse({ data: res });
});

async function checkTopicExist(name) {
  let res = await Topic.findOne({ name });
  return Boolean(res);
}
