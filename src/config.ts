import chalk from "chalk"
import path from "path"
import * as configJson from "./mconfig.json"
import { WriteWay } from "./constant"
import { checkPathExists, sPrint, writeTo } from "./utils"

enum Methods {
  SET = "set",
  GET = "get",
}

export const config = (args: string[]) => {
  let m = args[0]

  if (!(Object.values(Methods) as string[]).includes(m)) {
    sPrint(`${chalk.redBright("请输入正确的配置项")}`)
    sPrint(`${chalk.grey("eg:")}`)
    sPrint(`${chalk.grey("config set path='/usr'")}`)
    sPrint(`${chalk.grey("config get path")}`)
    return
  }

  switch (m) {
    case Methods.GET:
      if (args.length > 1 && args[1].includes("path")) {
        sPrint(`cache path: ${chalk.green(configJson.dir_path)}`)
      }
      break
    case Methods.SET:
      if (args.length > 1 && args[1].includes("path=")) {
        let pa = args[1].split("path=")[1]
        if (!checkPathExists(pa)) {
          sPrint(`${chalk.redBright("路径不正确，请确认")}`)
          return
        }
        try {
          writeTo(
            path.join(__dirname, "./mconfig.json"),
            pa,
            WriteWay.FIELD,
            "dir_path"
          )
        } catch (error) {
          console.log(error)
        }
      }
      break

    default:
      break
  }
}
