import { program } from "commander"
import { showFileList } from "./list"
import { cat } from "./cat"
import { del } from "./del"
import { config } from "./config"
import inquirer from "inquirer"

program
  .command("list")
  .alias("ls")
  .description("展示列表")
  .action(() => showFileList())

program
  .command("cat")
  .alias("c")
  .argument("<tag>", "文档编号")
  .description("展示内容")
  .action((index: string) => cat(index))

program
  .command("config")
  .argument("<args...>")
  .description("get|set path配置存放目录")
  .action((args?: string[]) => {
    if (args) config(args)
  })

program
  .command("del")
  .alias("d")
  .description("删除文档")
  .action(async (index: string) => {
    let ans = await inquirer.prompt([
      {
        type: "confirm",
        name: "isDel",
        message: "确定删除该文档吗?",
        default: true,
      },
    ])
    ans ? del(index) : null
  })

program.parse(process.argv)
