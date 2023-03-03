import chalk from "chalk"
import shell from "shelljs"
import * as configJson from "./mconfig.json"
import { echo } from "./utils"

export function push() {
  //   const { dir_path } = configJson as Config

  if (shell.which("git")) {
    shell.exec(`git add .`)
    shell.exec(`git commit -m 'update doc by mosa'`)
    shell.exec(`git push origin main`)
  }
  echo(chalk.green("oooook!"))
}
