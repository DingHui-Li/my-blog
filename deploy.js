
(async function deploy() {
  const inquirer = require("@inquirer/prompts");
  const client = require("scp2");
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

  let loading;
  if (choosedOpt == 'only') {
    loading = ora(chalk.green("正在node_modules至" + config.deploy.host))
    loading.start()
    await uploadNodeModules()
  } else {
    loading = ora(chalk.green("正在上传打包文件至" + config.deploy.host))
    loading.start()
    await uploadProject()
    if (choosedOpt == 'yes') {
      await uploadNodeModules()
    }
  }
  // runServerCommand(`cd ${config.deploy.path}\n pm2 restart ${config.deploy.name}\n exit\n`)
  loading.stop()
  console.log(chalk.green("上传成功"))


  async function uploadProject() {
    return new Promise(async resolve => {
      if (fs.existsSync('.output/server/node_modules')) {
        fs.rmdirSync('.output/server/node_modules', { recursive: true })
      }
      let dirs = await fs.readdirSync('.output')
      for (const dir of dirs) {
        await uploadFile('.output/' + dir, '/' + dir)
      }
      resolve()
    })
  }
  async function uploadNodeModules() {
    await runServerCommand(`cd ${config.deploy.path}\n rm node_modules.zip\n exit\n`)
    let exist = await fs.existsSync('node_modules.zip')
    if (exist) {
      fs.unlinkSync("./node_modules.zip")
    }
    await compressing.zip.compressDir('node_modules', './node_modules.zip')
    return new Promise(async resolve => {
      await uploadFile('./node_modules.zip')
      await runServerCommand(`unzip -o -q ${config.deploy.path}/node_modules.zip -d ${config.deploy.path}/server\n exit\n`)
      resolve()
    })

  }
  function runServerCommand(command) {
    return new Promise((resolve, reject) => {
      const conn = new ssh2.Client()
      conn.on("ready", () => {
        conn.shell((err, stream) => {
          if (err) throw err;
          stream.on('close', () => {
            console.log('远程命令执行完毕-->', command);
            conn.end();
            resolve()
          }).on('data', (data) => {
            console.log('远程命令输出：\n' + data);
          }).stderr.on('data', (data) => {
            console.log('远程命令错误：\n' + data);
            reject(data)
          });
          stream.end(command);
        });
      }).on("error", err => {
        console.log(err)
      }).connect({
        port: 22,
        ...config.deploy,
        // debug: info => { console.log(info) },
      })
    })
  }

  function uploadFile(path, dir = '') {
    return new Promise(resolve => {
      client.scp(path, {
        port: 22,
        ...config.deploy,
        path: config.deploy.path + dir
      }, async (err) => {
        resolve()
      }
      )
    })
  }
}())