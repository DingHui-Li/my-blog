import config from "~/.config.json";
import OpenAI from "openai";

let aiInstance;

function getAiConfig(key) {
  let aiConfig = config["ai"]
  return {
    "DeepSeek": {
      baseURL: 'https://api.deepseek.com',
      apiKey: aiConfig["DeepSeek"]?.key,
      model: "deepseek-chat"
    }
  }[key]
}

function getAiInstance() {
  let aiConf = getAiConfig("DeepSeek")
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
  console.log("ai助手初始化完成")
}

export async function getReply(content) {
  if (!aiInstance) {
    throw "ai助手未初始化"
  }
  let msg = `以朋友身份简短的回复以下内容:${content}`
  const model = getAiConfig("DeepSeek")?.model
  console.log(msg)
  const completion = await aiInstance.chat.completions.create({
    messages: [{ role: "system", content: msg }],
    model,
  });
  let res = completion.choices[0].message.content
  console.log(res)
  return {
    model,
    content: res
  }
}
export async function getMovieEvaluate(movieName) {
  if (!aiInstance) {
    throw "ai助手未初始化"
  }
  let msg = `请简短评价电影,100字以内:${movieName}`
  const model = getAiConfig("DeepSeek")?.model
  console.log(msg)
  const completion = await aiInstance.chat.completions.create({
    messages: [{ role: "system", content: msg }],
    model,
  });
  let res = completion.choices[0].message.content
  console.log(res)
  return {
    model,
    content: res
  }
}