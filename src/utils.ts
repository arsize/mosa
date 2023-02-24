import chalk from "chalk"
import fs from "fs"
import { WriteWay } from "./constant"
import json from "format-json"

export const sPrint = (str: string) => {
  console.log(str)
}

export const isId = (str: string) => (/^[0-9]*$/.test(str) ? true : false)

/**
 * 获取目录文件列表
 * @param _pth
 */
export const getFiles = (_pth: string) => {
  let pa = fs.readdirSync(_pth)
  let _files: string[] = []
  pa.forEach((e) => {
    let info = fs.statSync(`${_pth}/${e}`)
    if (info.isDirectory()) {
      getFiles(`${_pth}/${e}`)
    } else {
      _files.push(e)
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
  content: string,
  way = WriteWay.ALL,
  field?: string
) => {
  if (way == WriteWay.ALL) {
  } else if (way == WriteWay.APPEND) {
  } else if (way == WriteWay.FIELD) {
    if (!field) {
      return new Error("未输入修改字段")
    }
    let _temp: Config = JSON.parse(fs.readFileSync(_pth).toString())
    _temp[field] = content
    fs.writeFileSync(_pth, json.plain(_temp), "utf8")
    sPrint("success!")
  }
}
