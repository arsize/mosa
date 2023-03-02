import { echo, getFiles, hasDocLibraryPath, mconfig, writeTo } from "./utils"
import * as configJson from "./mconfig.json"
import { WriteWay } from "./constant"
import chalk from "chalk"

export const updateCache = () => {
  if (hasDocLibraryPath()) {
    let _temp = configJson as Config
    let _pth = _temp.dir_path
    let files = getFiles(_pth)
    _temp.files.length = 0
    files.map((k) => {
      _temp.files.push(k)
    })
    writeTo(mconfig, _temp.files, WriteWay.FIELD, "files")
    echo(chalk.green("oooook!"))
  }
}
