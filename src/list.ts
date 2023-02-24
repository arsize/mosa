import { getFiles, sPrint } from "./utils"
import * as configJson from "./mconfig.json"
import chalk from "chalk"
import shell from "shelljs"
import path from "path"

export const showFileList = () => {
  if (!configJson.dir_path) {
    shell.mkdir("mdoc")
    sPrint(`${chalk.green("默认在当前目录生成doc文件夹:mdoc")}`)
    sPrint(`${chalk.green("正在配置...")}`)
    let pwd = shell.pwd().toString()
    shell.exec(`mosa config set path=${pwd}/mdoc`, { silent: true })
    sPrint(`${chalk.green("初始化完成")}`)
    sPrint(`${chalk.yellowBright("稍后请修改您自己的文档库地址")}`)
    sPrint(`${chalk.gray("config set path")}`)
    return
  }
  let files = getFiles(configJson.dir_path)
  files.map((k, i) => {
    console.log(`${chalk.gray(` [${i}] `)}${chalk.green(`${k}`)}`)
  })
}
