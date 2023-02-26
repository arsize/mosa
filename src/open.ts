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
  if (_open) {
    switch (_open) {
      case "vscode":
        shell.exec(`code ${path.join(_path, `/${name}`)}`)
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
      shell.exec(`code ${path.join(_path, `/${name}`)}`)
    }
  }
}
