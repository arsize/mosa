import chalk from "chalk"
import * as configJson from "./mconfig.json"
import {
  isId,
  echo,
  hasDocLibraryPath,
  checkPathExists,
  fuzzyMatch,
} from "./utils"
import shell from "shelljs"

/**
 * 获取文档内容
 * @param tag
 * @returns
 */
export const cat = (tag: string) => {
  if (!hasDocLibraryPath()) {
    return
  }
  let { files } = configJson as Config
  if (isId(tag)) {
    let index = parseInt(tag)
    if (index >= files.length) {
      echo(`${chalk.redBright("找不到该对应序号的文件，请确认")}`)
      return
    }
    let _pth = files[index]?.path
    if (!checkPathExists(_pth)) {
      echo(`${chalk.redBright("找不到该文件，请确认")}`)
      return
    }
    let content = shell.cat(_pth)
    echo("---------------")
    content.toString() == "" ? echo("空") : echo(content.toString())
    echo("---------------")
  } else {
    let iArr: number[]
    iArr = fuzzyMatch(files, tag)

    if (iArr.length == 0) {
      echo(chalk.redBright("找不到该文件，请确认"))
      return
    }
    if (iArr.length == 1) {
      let _pth = files[iArr[0]].path
      let content = shell.cat(_pth)
      echo("---------------")
      content.toString() == "" ? echo("空") : echo(content.toString())
      echo("---------------")
      return
    }
    if (iArr.length > 1) {
      iArr.map((k) => {
        echo(`${chalk.gray(`[${k}]`)} ${chalk.green(files[k].name)}`)
      })
    }
  }
}
