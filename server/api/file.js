import request from 'request'
import BaseResponse from "../base/baseResponse";
import * as FileService from '../services/file'


export let uploadFile = defineEventHandler(async (event) => {
  const rawBody = await readMultipartFormData(event);
  let file = rawBody?.find((item) => item.name == "image");
  let imgType = file.type.substring(file.type.indexOf("/") + 1);
  // let filename = new Date().getTime() + "." + imgType;
  let dir = getDir(rawBody);
  let filename = FileService.getFileHash(file.data) + "." + imgType;
  let url = await FileService.uploadImg(dir + filename, file.data)
  return new BaseResponse({ data: url });
});

function getDir(body) {
  try {
    let dir = body?.find((item) => item.name == "dir");
    return dir.data.toString() + "/";
  } catch {
    return "";
  }
}

export let downloadFileBase64 = defineEventHandler(async (event) => {
  let query = getQuery(event)

  let base64 = await new Promise((resolve) => {
    let req = request(query.url, {
      method: "GET",
      headers: {
        "response-type": "blob"
      }
    })
    let chunks = []
    req.on('error', err => {
      resolve('')
    })
    req.on('data', chunk => {
      chunks.push(chunk)
    })
    req.on('end', async (res) => {
      try {
        let buffer = Buffer.concat(chunks);
        resolve(buffer.toString('base64'))
      } catch (err) {
        resolve('')
      }
    })
  })
  return new BaseResponse({ data: base64 });
});
