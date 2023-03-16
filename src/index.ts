import { program } from "commander"
import { showFileList } from "./list"
import { cat } from "./cat"
import { del } from "./del"
import { config } from "./config"
import inquirer from "inquirer"
import { touch } from "./touch"
import { hasDocLibraryPath } from "./utils"
import { openFile } from "./open"
import { updateCache } from "./cache"
import { ReName } from "./rname"
import { push } from "./push"
import { pull } from "./pull"

program.version("1.0.17", "-v, --version")

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
  .description("get|set|open")
  .action((args?: string[]) => {
    if (args) config(args)
  })

program
  .command("del")
  .alias("d")
  .option("-f,--force", "强行从文件夹删除")
  .argument("<tag>", "文档编号")
  .description("删除文档")
  .action(async (index: string, cmd) => {
    if (!hasDocLibraryPath()) {
      return
    }
    let type = false
    if (cmd.force) {
      type = true
    }

    const ans = await inquirer.prompt([
      {
        type: "confirm",
        name: "isDel",
        message: "确定删除该文档吗?",
        default: true,
      },
    ])
    ans ? del(index, type) : null
  })

program
  .command("touch")
  .alias("t")
  .argument("<name>", "文档名称")
  .description("新建文档")
  .action((name) => {
    touch(name)
  })

program
  .command("open")
  .alias("o")
  .argument("<name>", "文档名称")
  .description("打开文档")
  .action((name) => {
    openFile(name)
  })
program
  .command("rname")
  .alias("rna")
  .description("修改文件名")
  .argument("<args...>")
  .action((args: string[]) => {
    ReName(args)
  })

program
  .command("cache")
  .description("更新缓存")
  .action(() => {
    updateCache()
  })
program
  .command("push")
  .description("推送git")
  .action(() => {
    push()
  })
program
  .command("pull")
  .description("拉取git")
  .action(() => {
    pull()
  })

program.parse(process.argv)
