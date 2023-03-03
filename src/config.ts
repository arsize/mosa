import chalk from "chalk"
import path from "path"
import * as configJson from "./mconfig.json"
import { WriteWay } from "./constant"
import shell from "shelljs"
import { checkPathExists, echo, writeTo } from "./utils"

enum Methods {
  SET = "set",
  GET = "get",
}

export const config = (args: string[]) => {
  const m = args[0]

  if (!(Object.values(Methods) as string[]).includes(m)) {
    echo(`${chalk.redBright("请输入正确的配置项")}`)
    echo(`${chalk.grey("eg:")}`)
    echo(`${chalk.grey("config set path='/usr'")}`)
    echo(`${chalk.grey("config get path")}`)
    return
  }

  switch (m) {
    case Methods.GET:
      if (args.length > 1 && args[1].includes("path")) {
        echo(`文档存放路径: ${chalk.green(configJson.dir_path)}`)
        echo(chalk.grey("查询所有文档：mosa list"))
      }
      break
    case Methods.SET:
      if (args.length > 1 && args[1].includes("path=")) {
        const pa = args[1].split("path=")[1]
        if (!checkPathExists(pa)) {
          echo(`${chalk.redBright("路径不正确，请确认")}`)
          return
        }
        try {
          writeTo(
            path.join(__dirname, "./mconfig.json"),
            pa,
            WriteWay.FIELD,
            "dir_path"
          )
          echo(chalk.green("oooook!"))
          echo(
            chalk.grey(
              "tip:如果你想知道文档存放路径，可以执行mosa config get path"
            )
          )
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      } else if (args.length > 1 && args[1].includes("git=")) {
        if (shell.which("git")) {
          const remote = args[1].split("git=")[1]
          // const { dir_path } = configJson as Config
          // shell.cd(dir_path)
          // shell.exec(`git init`)
          // shell.exec(`git remote add origin ${remote}`)
          try {
            writeTo(
              path.join(__dirname, "./mconfig.json"),
              remote,
              WriteWay.FIELD,
              "git"
            )
            echo(chalk.green("oooook!"))
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
          }
        } else {
          echo(chalk.redBright("没有安装git，请先安装git之后再使用"))
          return
        }
      }
      break

    default:
      break
  }
}
