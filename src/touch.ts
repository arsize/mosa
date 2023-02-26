import { hasDocPath } from "./utils"
import * as configJson from "./mconfig.json"
import shell, { echo } from "shelljs"
import path from "path"
import chalk from "chalk"

/**
 * 新建文档
 * @param name
 */
export function touch(name: string) {
  if (!hasDocPath()) {
    return
  }
  if (name.indexOf(".") == -1) {
    name = `${name}.md`
  }
  shell.touch(path.join(configJson.dir_path, `/${name}`))
  echo(chalk.green("oooook!"))
}
