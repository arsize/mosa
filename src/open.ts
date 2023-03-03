import * as configJson from "./mconfig.json"
import shell from "shelljs"
import path from "path"
import { isId, writeTo, echo, fuzzyMatch } from "./utils"
import { WriteWay } from "./constant"
import chalk from "chalk"

/**
 * 打开文档
 * @param tag
 */
export function openFile(tag: string) {
  let { open, files } = configJson as Config

  if (isId(tag)) {
    let index = parseInt(tag)
    if (index >= files.length) {
      echo(chalk.redBright("请输入正确的文件编号"))
      return
    }
    let _pth = files[index].path
    _openWay(open, _pth)
  } else {
    let iArr: number[]
    iArr = fuzzyMatch(files, tag)

    if (iArr.length == 0) {
      echo(chalk.redBright("找不到该文件，请确认"))
      return
    }
    if (iArr.length == 1) {
      let _pth = files[iArr[0]].path
      _openWay(open, _pth)
      return
    }
    if (iArr.length > 1) {
      iArr.map((k) => {
        echo(`${chalk.gray(`[${k}]`)} ${chalk.green(files[k].name)}`)
      })
    }
  }
}

function _openWay(open: string, _pth: string) {
  if (open) {
    switch (open) {
      case "vscode":
        shell.exec(`code ${path.join(_pth)}`)
        break

      default:
        break
    }
  } else {
    if (shell.which("code")) {
      writeTo(
        path.join(__dirname, "./mconfig.json"),
        "vscode",
        WriteWay.FIELD,
        "open"
      )
      shell.exec(`code ${path.join(_pth)}`)
    }
  }

  echo(chalk.green("oooook!"))
}
