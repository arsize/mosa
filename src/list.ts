import { echo, hasDocLibraryPath } from "./utils"
import * as configJson from "./mconfig.json"
import chalk from "chalk"

export function showFileList() {
  if (hasDocLibraryPath()) {
    let filesCache = (configJson as Config).files
    if (filesCache.length > 0) {
      filesCache.map((k: CacheFileInfo, i: number) => {
        echo(`${chalk.gray(` [${i}] `)}${chalk.green(`${k.name}`)}`)
      })
    } else {
      echo(`${chalk.redBright("没有找到文件，尝试: mosa cache 一下")}`)
    }
  }
}
