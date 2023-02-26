import { getFiles, echo, hasDocPath } from "./utils"
import * as configJson from "./mconfig.json"
import chalk from "chalk"

export const showFileList = () => {
  if (hasDocPath()) {
    let files = getFiles(configJson.dir_path)
    files.map((k, i) => {
      console.log(`${chalk.gray(` [${i}] `)}${chalk.green(`${k}`)}`)
    })
  }
}
