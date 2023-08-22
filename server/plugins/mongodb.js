import mongoose from "mongoose";
import config from "~/.config.json";

export default defineNitroPlugin((nitroApp) => {
  const dbConfig = config['mongodb'];
  const dburl = `mongodb://${dbConfig.name}:${dbConfig.password}@${dbConfig.ip}:${dbConfig.port}?authMechanism=DEFAULT`;

  // 链接MongoDB数据库
  const db = mongoose.connect(dburl, { dbName: dbConfig.dbname });
  // 链接成功
  mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success");
  });
  // 链接失败
  mongoose.connection.on("error", function () {
    console.log("MongoDB connected error");
  });
  // 断开了
  mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected");
  });
});
