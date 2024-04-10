import OSS from "ali-oss";
import crypto from "crypto";
import config from "~/.config.json";

export function uploadImg(path, data) {
  return new Promise(async resolve => {
    const ossKey = config['oss']
    const store = new OSS({
      debugger: true,
      region: "oss-cn-guangzhou",
      accessKeyId: ossKey?.accessKeyId,
      accessKeySecret: ossKey?.accessKeySecret,
      bucket: "blog465467",
    });
    let res = await store.put(path, data);
    resolve(res?.url)
  })
}

export function getFileHash(buffer) {
  let hash = crypto.createHash("SHA256");
  hash.update(buffer);
  return hash.digest("hex");
}