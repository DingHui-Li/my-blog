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


