import mongoose from "mongoose";

export default defineNitroPlugin((nitroApp) => {
  const dbConfig = {
    ip: "124.71.61.179", // 服务器ip
    port: "27017", // 端口，一般默认是27017
    dbname: "blog", // 数据库名称
    name: "root", // 数据库用户名
    password: "sad123", // 数据库密码
  };
  const dburl = `mongodb://${dbConfig.name}:${dbConfig.password}@${dbConfig.ip}:${dbConfig.port}?authMechanism=DEFAULT`;

  // 链接MongoDB数据库
  const db = mongoose.connect(dburl, { dbName: dbConfig.dbname });
  // 链接成功
  mongoose.connection.on("connected", function() {
    console.log("MongoDB connected success");
  });
  // 链接失败
  mongoose.connection.on("error", function() {
    console.log("MongoDB connected error");
  });
  // 断开了
  mongoose.connection.on("disconnected", function() {
    console.log("MongoDB connected disconnected");
  });
});
