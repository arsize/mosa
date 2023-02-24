import chalk from "chalk"
import * as configJson from "./mconfig.json"
import { getFiles, isId, sPrint } from "./utils"
import fs from "fs"

/**
 * 获取文档内容
 * @param tag
 * @returns
 */
export const cat = (tag: string) => {
  if (isId(tag)) {
    // 通过序列号获取文档内容
    let files = getFiles(configJson.dir_path)
    let fileName = files[parseInt(tag)]
    if (!fileName) {
      sPrint(`${chalk.redBright("找不到该对应序号的文件，请检查")}`)
      return
    }
    let content = fs.readFileSync(configJson.dir_path + "/" + fileName)
    sPrint("---------------")
    sPrint(content.toString() || "no content")
    sPrint("---------------")
  } else {
    // 通过名称获取文档内容
    let fileName = tag
    try {
      let content = fs.readFileSync(configJson.dir_path + "/" + fileName)
      sPrint("---------------")
      sPrint(content?.toString())
      sPrint("---------------")
    } catch (error) {
      sPrint(`${chalk.redBright("找不到该对应名称的文件，请检查")}`)
    }
  }
}
