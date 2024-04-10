import request from 'request'
import * as FileService from './file'

export function saveNetworkImg(url = "") {
  return new Promise((resolve) => {
    if (!url) {
      return resolve("")
    }
    if (url?.includes('blog465467.oss-cn-guangzhou.aliyuncs.com')) {
      return resolve(url)
    }
    let req = request({
      url,
      method: "GET",
      headers: {
        "response-type": "blob"
      }
    })
    let chunks = []
    req.on('error', err => {
      resolve(url)
    })
    req.on('data', chunk => {
      chunks.push(chunk)
    })
    req.on('end', async () => {
      try {
        let buffer = Buffer.concat(chunks);
        let fileName = FileService.getFileHash(buffer) + '.jpg'
        url = await FileService.uploadImg('/movie/' + fileName, buffer)
        resolve(url)
      } catch (err) {
        resolve(url)
      }
    })
  })
}