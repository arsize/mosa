import chalk from "chalk"
import shell from "shelljs"
import { echo } from "./utils"

export function pull() {
  if (shell.which("git")) {
    shell.exec(`git pull origin main`)
  }
  echo(chalk.green("oooook!"))
}
