import { echo, isId } from "./utils"
import * as configJson from "./mconfig.json"
import chalk from "chalk"
import shell from "shelljs"
import path from "path"
import { updateCache } from "./cache"

export function ReName(args: string[]) {
  if (args.length < 2) {
    echo(chalk.redBright("请输入正确的参数"))
    echo(chalk.gray("eg: mosa rname 0 newfile"))
    return
  }
  const { files, dir_path } = configJson as Config
  const tag = args[0]
  let newName = args[1]

  if (isId(newName)) {
    echo(chalk.redBright("文件名不能为纯数字"))
    return
  }

  if (isId(tag)) {
    const index = parseInt(tag)
    if (newName == files[index].name) {
      echo(chalk.redBright("当前目录已存在该名称的文件"))
      return
    }
    if (index >= files.length) {
      echo(chalk.redBright("请输入正确的文件编号"))
      return
    }
    if (newName.indexOf(".") == -1) {
      const ext = files[index].name.split(".")[1]
      newName = `${newName}.${ext}`
    }

    shell.cp("-R", files[index].path, path.join(dir_path, `/${newName}`))
    shell.rm("-rf", files[index].path)
    updateCache()
  } else {
    //文件名修改
    let index: number | undefined
    files.some((k, i) => {
      if (k.name == tag) {
        index = i
        return true
      }
    })

    if (index == undefined) {
      echo(chalk.redBright("找不到该文件，请确认"))
      return
    }
    if (newName == files[index].name) {
      echo(chalk.redBright("当前目录已存在该名称的文件"))
      return
    }
    if (newName.indexOf(".") == -1) {
      const ext = files[index].name.split(".")[1]
      newName = `${newName}.${ext}`
    }
    shell.cp("-R", files[index].path, path.join(dir_path, `/${newName}`))
    shell.rm("-rf", files[index].path)
    updateCache()
  }
}
