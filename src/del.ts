import { checkPathExists, isId, mconfig, writeTo, echo } from "./utils"
import * as configJson from "./mconfig.json"
import { WriteWay } from "./constant"
import shell from "shelljs"
import chalk from "chalk"

export const del = (tag: string, type = false) => {
  let config = configJson as Config
  if (isId(tag)) {
    let index = parseInt(tag)
    if (index >= config.files.length) {
      echo(chalk.redBright("请输入正确的文件编号"))
      return
    }
    if (type) {
      if (checkPathExists(config.files[index].path)) {
        shell.rm(config.files[index].path)
      } else {
        echo(chalk.redBright("找不到该文件，请确认"))
        return
      }
    }
    config.files.splice(index, 1)
    writeTo(mconfig, config.files, WriteWay.FIELD, "files")

    echo("success!")
  } else {
    let index: number | undefined
    config.files.some((k, i) => {
      if (k.name == tag) {
        index = i
        return true
      }
    })
    if (index == undefined) {
      echo(chalk.redBright("找不到该文件，请确认"))
      return
    }

    if (type) {
      if (checkPathExists(config.files[index]?.path)) {
        shell.rm(config.files[index].path)
      } else {
        echo(chalk.redBright("不存在这个文件，请检查目录"))
        return
      }
    }
    config.files.splice(index, 1)
    writeTo(mconfig, config.files, WriteWay.FIELD, "files")
    echo("success!")
  }
}
