import chalk from "chalk"
import fs from "fs"
import { WriteWay } from "./constant"
import json from "format-json"
import path from "path"
import * as configJson from "./mconfig.json"

export const mconfig = path.join(__dirname, "./mconfig.json")

export const echo = (str: string) => {
  console.log(str)
}

/**
 * 是否为数字
 * @param str
 * @returns
 */
export const isId = (str: string) => (/^[0-9]*$/.test(str) ? true : false)

/**
 * 获取目录文件列表
 * @param _pth
 */
export const getFiles = (_pth: string) => {
  let pa = fs.readdirSync(_pth)
  let _files: CacheFileInfo[] = []
  pa.forEach((e) => {
    let info = fs.statSync(path.join(_pth, e))
    if (info.isDirectory()) {
      getFiles(path.join(_pth, e))
    } else {
      _files.push({
        name: e,
        path: path.join(_pth, e),
        createTime: "",
        updateTime: "",
      })
    }
  })
  return _files
}

/**
 * 检查不同平台路径是否存在
 * @param _pth
 * @returns
 */
export const checkPathExists = (_pth: string) => {
  return fs.existsSync(_pth) ? true : false
}

/**
 * 自定义写入
 * @param _pth 写入路径
 * @param content 文档内容
 * @param way 写入方式
 * @param field json字段
 */
export const writeTo = (
  _pth: string,
  content: string | CacheFileInfo[],
  way = WriteWay.ALL,
  field?: string
) => {
  if (way == WriteWay.ALL) {
  } else if (way == WriteWay.APPEND) {
  } else if (way == WriteWay.FIELD) {
    if (!field) {
      return new Error("未输入修改字段")
    }
    let _temp = JSON.parse(fs.readFileSync(_pth, "utf8"))
    _temp[field] = content
    fs.writeFileSync(_pth, json.plain(_temp), "utf8")
  }
}

/**
 * 是否已设置归档目录
 * @returns
 */
export function hasDocLibraryPath(): boolean {
  if (!configJson.dir_path) {
    echo(chalk.redBright("未设置归档路径"))
    echo(chalk.gray("请先运行：mosa config set path=`自定义目录路径`"))
    echo(chalk.gray("eg：mosa config set path=/Users/doc"))

    return false
  } else {
    return true
  }
}

/**
 * 模糊查询
 * @param arr
 * @param str
 * @returns
 */
export function fuzzyMatch(arr: CacheFileInfo[], str: string): number[] {
  let iArr: number[] = []
  arr.some((k, i) => {
    if (k.name == str) {
      iArr.push(i)
      return true
    }
  })
  if (iArr.length > 0) {
    return iArr
  }
  iArr = []
  arr.map((k, i) => {
    if (k.name.includes(str)) {
      iArr.push(i)
    }
  })
  return iArr
}
