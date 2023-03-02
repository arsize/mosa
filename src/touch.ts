import { hasDocLibraryPath, writeTo, mconfig, isId } from "./utils"
import shell, { echo } from "shelljs"
import path from "path"
import chalk from "chalk"
import * as configJson from "./mconfig.json"
import { WriteWay } from "./constant"

/**
 * 新建文档
 * @param name
 */
export function touch(name: string) {
  if (!hasDocLibraryPath()) {
    return
  }
  if (isId(name)) {
    echo(chalk.redBright("新建文件名不能为纯数字"))
    return
  }
  if (name.indexOf(".") == -1) {
    name = `${name}.md`
  }

  let _pth = path.join(configJson.dir_path, `/${name}`)

  let fileCache: CacheFileInfo = {
    name: name,
    path: _pth,
    createTime: "",
    updateTime: "",
  }

  let _temp = configJson as Config
  _temp.files.push(fileCache)

  writeTo(mconfig, _temp.files, WriteWay.FIELD, "files")

  shell.touch(_pth)
  echo(chalk.green("oooook!"))
}
