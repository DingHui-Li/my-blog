import * as AiService from '../services/AIAssistant'

export default defineNitroPlugin((nitroApp) => {
  AiService.init()
});