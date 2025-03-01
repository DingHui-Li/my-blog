## myblog

基于 Nuxt3 全栈框架构建的个人博客系统，采用一体化全栈架构与现代化简约 UI 设计，集成文章管理、响应式布局及 AI 评论功能，实现高效开发与优雅呈现。

## 构建

开发环境：node18

- 1.安装依赖：npm install
- 2.开发：npm run dev
- 3.打包：npm run build
- 4.部署：npm run deploy

##### 配置文件说明：

复制一份 .config.json.example 文件，并去掉 .example 后缀。配置项说明：
{
"oss": 阿里云 OSS-存储图片等静态资源,
"mongodb":,mongodb 数据库相关配置，
"qweather":查询天气 api，
"TOTP":后台登录密钥,
"amap": 高德地图 api,
"ai":硅基流动平台 api,
"deploy":部署到的服务器配置
}
