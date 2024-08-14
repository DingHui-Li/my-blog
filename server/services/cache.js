import Cache from "../models/cache";

export async function find(key = '', expried = 1000 * 60 * 10) {
  if (!key) return Promise.resolve(null)
  let result = await Cache.find({ key })
  if (result?.length) {
    if (!expried || (new Date().getTime() - result[0].time < expried)) {
      return Promise.resolve(result[0].value)
    }
    return Promise.resolve(result[0].value)
  } else {
    return Promise.resolve(null)
  }
}

export async function update(key, value) {
  return await Cache.updateOne({ key }, { value, time: new Date().getTime() }, { upsert: true })
}