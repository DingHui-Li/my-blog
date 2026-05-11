import config from "~/.config.json";
import OpenAI from "openai";
import Article from "../models/article";

let aiInstance;
let aiProvider;//自动取配置文件ai项第一个配置

function getAiConfig() {
  let aiConfig = config["ai"]
  aiProvider = Object.keys(config['ai'])[0]
  return {
    "SiliconFlow": {
      baseURL: "https://api.siliconflow.cn/v1",
      apiKey: aiConfig["SiliconFlow"]?.key,
      model: "deepseek-ai/DeepSeek-V3",
      visionModel: "Qwen/Qwen3.6-35B-A3B"
    }
  }[aiProvider]
}

function getAiInstance() {
  let aiConf = getAiConfig()
  const openai = new OpenAI(aiConf);
  return openai
}

export function init() {
  try {
    aiInstance = getAiInstance()
  } catch (err) {
    console.log("ai助手初始化错误:")
    console.log(err)
    return
  }
  console.log("ai助手初始化完成-by:" + aiProvider)
}

export async function getReply(article) {
  if (!aiInstance) {
    throw "ai助手未初始化"
  }
  let content = article.textContent
  let time = new Date(article?.createTime || '').toLocaleString()
  if (!article?.createTime) {
    time = new Date().toLocaleString()
  }
  let imgDesc = (await describeImg(article.imgs))?.content
  let prompt = `
  以朋友身份简短评论以下内容；

  【要求】：
  不要忘记你依然是AI;
  不要评价数据库中没有的电影，内容中没有电影则不要提及电影；
  不要在回答中添加图片；
  不要输出说明文字;
  不超过100字；

  【内容】：
  ${article.movie?.title ? ('看完电影《' + article.movie?.title + '》后说：\n') : ""}
  ${content};\n
  包含:${article.imgs?.length}张图片：${JSON.stringify(imgDesc)},
  \n当前时间:${time};`
  const model = getAiConfig()?.model
  const completion = await aiInstance.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model,
  });
  let res = completion.choices[0].message.content
  return {
    model,
    content: res
  }
}

async function describeImg(imgList = []) {
  if (!aiInstance) {
    throw "ai助手未初始化"
  }
  const model = getAiConfig()?.visionModel
  let result = []
  for (let index in imgList) {
    index = Number(index)
    let img = imgList[index]
    const completion = await aiInstance.chat.completions.create({
      messages: [
        {
          role: "user", content: [
            {
              "type": "image_url",
              "image_url": {
                "url": img + '?x-oss-process=image/resize,m_mfit,w_600'
              }
            },
            {
              "type": "text",
              "text": "描述图片"
            }
          ]
        }
      ],
      model,
    });
    let t = {}
    t[`第${index + 1}张`] = completion.choices[0].message.content
    result.push(t)
  }
  return {
    model,
    content: result
  }
}

//分析单条内容情绪
export async function getMood(article) {
  if (!aiInstance) {
    throw "ai助手未初始化"
  }
  let time = new Date(article?.createTime).toLocaleString()
  if (!article?.createTime) {
    time = new Date().toLocaleString()
  }
  let location = '未知地点'
  if (article?.location?.location) {
    location = article.location.city + article.location.name
  }
  let action = article.type == 'moment' ? '内容' : '文章'
  let str = `${time}在${location}发布了${action}：${article.movie?.title ? ('评价电影《' + article.movie.title + '》:') : ''}${article.title || article.textContent},包含${article.imgs?.length || 0}张图片，${article.sounds?.length || 0}段音频。当天天气:${article.weather?.text},${article.weather?.temp}摄氏度\n`
  let prompt = `分析以下内容包含的情感，包含字段：评分（1-10,1为非常消极，10为非常积极）、emoj、关键词、简短描述、情感分析、隐性情绪层、描述的食物。
  【待分析内容】
  ${str}

  【要求】
  内容中没有食物或重点不是食物则忽略food,若有多种则概括成一种；
  emoji匹配的优先级为food > 内容 > 情绪;

  严格按照以下JSON格式输出：
  {
    "score": 9,
    "emoji": "😃",
    "keywords": ["遗憾", "回忆", "爱情"],
    "desc":"一周内情绪如落叶起伏",
    "sentiment": "消极",
    "implicit":"",
    "food":""
  }
  `
  const model = getAiConfig()?.model
  const completion = await aiInstance.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model,
  });
  let res = completion.choices[0].message.content
  try {
    return {
      model,
      mood: JSON.parse(res.replace('```json', '').replace('```', ''))
    }
  } catch {
    return {
      model,
      mood: null
    }
  }
}

//分析博客所有数据,输出用户画像
export async function analyOfAllData() {
  if (!aiInstance) {
    throw "ai助手未初始化"
  }

  let list = await Article.find().select({ type: 1, movie: 1, createTime: 1, title: 1, imgs: 1, sounds: 1, textContent: 1, location: 1 })
  let str = ""
  list.forEach(item => {
    item.location = item.location?.location || ""
    let time = new Date(item.createTime).toLocaleString()
    let location = JSON.stringify(item.location)
    let action = item.type == 'moment' ? '内容' : '文章'
    str += `${time}在${location}发布了${action}：${item.movie?.title ? ('评价电影《' + item.movie.title + '》:') : ''}${item.title || item.textContent},包含${item.imgs?.length || 0}张图片，${item.sounds?.length || 0}段音频。\n`
  })

  let prompt = `从地理位置和时间分布两方面进行轨迹分析;从天、季节、年等维度对时间进行分析;从多维度进行内容主题分类;从职业背景、性格特征、生活方式等维度分析用户画像;分析出关键事件与转折点;给出一个全面的概述，并指出可能的趋势或转折点;最后用一句话进行总结;禁止横向表格形式的内容输出;按照以上要求分析以下内容:\n${str}`
  // let prompt = `分析以下内容:\n${str}`
  const model = getAiConfig()?.model
  const completion = await aiInstance.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model,
  });
  let res = completion.choices[0].message.content
  return {
    model,
    content: res
  }
}

//分析近一周的情绪
export async function analyMoodByNearWeek() {
  let startTime = new Date().getTime() - 86400000 * 7
  let list = await Article.find({ createTime: { $gte: startTime } }).select({ type: 1, movie: 1, createTime: 1, title: 1, imgs: 1, sounds: 1, textContent: 1, location: 1, weather: 1 })
  let str = ""
  list.forEach(item => {
    item.location = item.location?.location || ""
    let time = new Date(item.createTime).toLocaleString()
    let location = JSON.stringify(item.location)
    let action = item.type == 'moment' ? '内容' : '文章'
    str += `${time}在${location}发布了${action}：${item.movie?.title ? ('评价电影《' + item.movie.title + '》:') : ''}${item.title || item.textContent},包含${item.imgs?.length || 0}张图片，${item.sounds?.length || 0}段音频。当天天气:${item.weather?.text},${item.weather?.temp}摄氏度\n`
  })
  let prompt = `分析以下近一周内容的心情并转换为JSON格式，包含字段：整体评分（1-100，情绪积极度）、emoj、中性情绪占比、积极情绪占比、消极情绪占比、关键词、简短描述、情感分析（中性/积极/消极）、趋势、趋势数据(1-100)、隐性情绪层。示例：
  {
    "score": 90,
    "emoji": 😃,
    "neutral":34,
    "positive":34,
    "negative":32,
    "keywords": ["遗憾", "回忆", "爱情"],
    "desc":"一周内情绪如落叶起伏",
    "sentiment": "消极",
    "trend":"从阴郁的缅怀到节后的空茫，中期在电影世界暂避风雨，结尾以AI交互与生活探索完成轻柔反弹。昼夜温差达12℃的天气映射着心的剧烈震颤。",
    "trendData":[20,50,50,23,67,34,80],
    "implicit":""
  },其中emoji为对应评分的描述，不局限于人物表情，但须为单个;不要输出其他分析内容;
  待分析内容：\n${str}`
  const model = getAiConfig()?.model
  const completion = await aiInstance.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model,
  });
  let res = completion.choices[0].message.content
  return {
    model,
    content: res
  }
}