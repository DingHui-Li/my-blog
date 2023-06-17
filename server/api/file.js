import BaseResponse from "../base/baseResponse";
import OSS from "~/server/utils/aliyun-oss-sdk.js";
import crypto from "crypto";
import ossKey from "~/.osskey.json";

export let uploadFile = defineEventHandler(async (event) => {
  const rawBody = await readMultipartFormData(event);
  let file = rawBody?.find((item) => item.name == "image");
  let imgType = file.type.substring(file.type.indexOf("/") + 1);
  // let filename = new Date().getTime() + "." + imgType;
  let dir = getDir(rawBody);
  let filename = getFileHash(file.data) + "." + imgType;
  const store = new OSS({
    region: "oss-cn-guangzhou",
    accessKeyId: ossKey?.accessKeyId,
    accessKeySecret: ossKey?.accessKeySecret,
    bucket: "blog465467",
  });
  let res = await store.put(dir + filename, file.data);

  return new BaseResponse({ data: res?.url });
});

function getDir(body) {
  try {
    let dir = body?.find((item) => item.name == "dir");
    return dir.data.toString() + "/";
  } catch {
    return "";
  }
}

function getFileHash(buffer) {
  let hash = crypto.createHash("SHA256");
  hash.update(buffer);
  return hash.digest("hex");
}
