
(async function deploy() {
  const client = require("scp2")
  const ssh2 = require("ssh2")
  const ora = (await import("ora")).default
  const chalk = (await import("chalk")).default
  const config = require("./.config.json")

  const loading = ora(chalk.green("正在上传打包文件至" + config.server.host))
  loading.start()
  client.scp(config.server.from, {
    port: 22,
    ...config.server,
    path: config.server.to
  }, err => {
    loading.stop()
    if (!err) {
      console.log(chalk.green("上传成功"))
      const conn = new ssh2.Client()
      conn.on("ready", () => {
        conn.shell((err, stream) => {
          if (err) throw err;
          stream.on('close', () => {
            console.log('远程命令执行完毕');
            conn.end();
          }).on('data', (data) => {
            console.log('远程命令输出：\n' + data);
          }).stderr.on('data', (data) => {
            console.log('远程命令错误：\n' + data);
          });
          stream.end(config.server.command);
        });
      }).connect({
        port: 22,
        ...config.server,
      })

    } else {
      console.log(chalk.red(err))
    }
  })
}())