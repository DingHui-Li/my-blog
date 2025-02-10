import { useScheduler } from "#scheduler"
import * as cacheService from '../services/cache'
import * as AiService from '../services/AIAssistant'

export default defineNitroPlugin(() => {
  const scheduler = useScheduler();

  scheduler.run(async () => {
    let res = await AiService.analyOfAllData()
    res.time = new Date().getTime()
    if (res.content) {
      await cacheService.update("aiAnalyMyBlog", res)
    }
  }).cron("0 4 1 * *", "Asia/Shanghai");
  scheduler.run(async () => {
    let res = await AiService.analyMoodByNearWeek()
    res.time = new Date().getTime()
    if (res.content) {
      await cacheService.update("aiAnalyMoodByNearWeek", res)
    }
  }).cron("0 1 * * *", "Asia/Shanghai");
})