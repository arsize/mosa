import chalk from "chalk"
import shell from "shelljs"
import * as configJson from "./mconfig.json"
import { echo, hasDocLibraryPath, hasGitPath } from "./utils"

export function pull() {
  if (hasDocLibraryPath() && hasGitPath()) {
    const { dir_path } = configJson as Config
    if (shell.which("git")) {
      shell.cd(dir_path)
      shell.exec(`git pull origin main`)
    } else {
      echo(chalk.redBright("没有安装git，请先安装git之后再使用"))
      return
    }
    echo(chalk.green("oooook!"))
  }
}
