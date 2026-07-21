(async function deploy() {
  const inquirer = require("@inquirer/prompts");
  const { Client } = require("node-scp");
  const ssh2 = require("ssh2");
  const ora = (await import("ora")).default;
  const chalk = (await import("chalk")).default;
  const config = require("./.config.json");
  const compressing = require('compressing')
  const fs = require('fs')

  const choosedOpt = await inquirer.select({
    message: "是否上传node_modules",
    choices: [
      {
        name: "不上传",
        value: "no",
      },
      {
        name: "上传",
        value: "yes",
      },
      {
        name: "只上传node_modules",
        value: "only"
      },
    ]
  })

  let scpClient;
  try {
    scpClient = await Client({
      port: 22,
      ...config.deploy,
    });
  } catch (e) {
    console.error(chalk.red("连接服务器失败:"), e);
    return;
  }

  let loading;
  if (choosedOpt == 'only') {
    loading = ora(chalk.green("正在上传 node_modules 至 " + config.deploy.host))
    loading.start()
    await uploadNodeModules()
  } else {
    loading = ora(chalk.green("正在上传打包文件至 " + config.deploy.host))
    loading.start()
    await uploadProject()
    if (choosedOpt == 'yes') {
      await uploadNodeModules()
    }
  }
  
  scpClient.close();
  loading.stop()
  console.log(chalk.green("上传成功"))


  async function uploadProject() {
    if (fs.existsSync('.output/server/node_modules')) {
      fs.rmSync('.output/server/node_modules', { recursive: true, force: true })
    }
    let dirs = fs.readdirSync('.output')
    for (const dir of dirs) {
      await uploadFile('.output/' + dir, '/' + dir)
    }
  }

  async function uploadNodeModules() {
    await runServerCommand(`cd ${config.deploy.path}\n rm -f node_modules.zip\n exit\n`)
    let exist = fs.existsSync('node_modules.zip')
    if (exist) {
      fs.unlinkSync("./node_modules.zip")
    }
    await compressing.zip.compressDir('node_modules', './node_modules.zip')
    await uploadFile('./node_modules.zip')
    await runServerCommand(`unzip -o -q ${config.deploy.path}/node_modules.zip -d ${config.deploy.path}/server\n exit\n`)
    // 安装 puppeteer
    await runServerCommand(`node ${config.deploy.path}/server/node_modules/puppeteer/install.mjs`)
  }

  function runServerCommand(command) {
    return new Promise((resolve, reject) => {
      const conn = new ssh2.Client()
      conn.on("ready", () => {
        conn.shell((err, stream) => {
          if (err) {
            conn.end();
            return reject(err);
          }
          stream.on('close', () => {
            conn.end();
            resolve()
          }).on('data', (data) => {
            // console.log('远程命令输出：\n' + data);
          }).stderr.on('data', (data) => {
            console.log('远程命令错误：\n' + data);
            // reject(data)
          });
          stream.end(command);
        });
      }).on("error", err => {
        console.log(err)
        reject(err)
      }).connect({
        port: 22,
        ...config.deploy,
      })
    })
  }

  async function uploadFile(localPath, remoteDir = '') {
    const remotePath = config.deploy.path + remoteDir;
    const stats = fs.statSync(localPath);
    if (stats.isDirectory()) {
      await scpClient.uploadDir(localPath, remotePath);
    } else {
      await scpClient.uploadFile(localPath, remotePath);
    }
  }
}())
