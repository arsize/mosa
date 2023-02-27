import * as configJson from "./mconfig.json"
import shell from "shelljs"
import path from "path"
import { writeTo } from "./utils"
import { WriteWay } from "./constant"

/**
 * 打开文档
 * @param name
 */
export function openFile(name: string) {
  let _open = configJson.open
  let _path = configJson.dir_path

  let fileName = name.indexOf(".") != -1 ? name : `${name}.md`

  console.log(fileName)
  if (_open) {
    switch (_open) {
      case "vscode":
        shell.exec(`code ${path.join(_path, `/${fileName}`)}`)
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
      shell.exec(`code ${path.join(_path, `/${fileName}`)}`)
    }
  }
}
