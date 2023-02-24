# mosa

用于命令行的交互式备忘单工具.🪵

### 安装

```
npm install mem -g
```

### 如何使用

- mem config set path="/Usr/doc" 配置文档存放目录
- mem config get path 展示当前文档目录
- mem config set git="git@github.com:arsize/mosa.git" 配置 git 远端地址
- mem ls 展示文档列表
- mem ls -t 根据新建时间排序展示文档列表
- mem cat 10 选择 id 为 10 的文档，执行 cat 命令显示
- mem -s "title" 在目录中查询标题为 title 的文档
- mem cat -s "title" 查询并显示标题为 title 的文档内容
- mem rm 10 删除 id 为 10 的文档
- mem rm -s "title" 查询并删除标题为 title 的文档
- mem touch a.md 在目录中新建 a.md 文档
- mem vi a.md 新建并编辑 a.md 文档
- mem doc upload 如果配置了 git，则上传目录下的文档到仓库
- mem code "title" vscode 新窗口打开标题为 title 的文档

### 演示

```shell
$ mem cat -s "mysql"

//备忘command
mysql> show databases; --查看当前用户下的所有数据库
mysql> create database [if not exists] 数据库名; --创建数据库
mysql> use test; --选择进入test数据库
mysql> show create database 数据库名\G --查看建数据库语句
mysql> select database(); --查看当前所在数据库位置
mysql> drop database [if exists] 数据库名; --删除一个数据库
mysql> show tables; --查看当前库下的所有表格
mysql> desc tb1; --查看tb1的表结构。
mysql> show create table 表名\G --查看表的建表语句。
mysql> create table demo( --创建demo表格

```

```dart
$ mem cat -s "flutterIconButton"

//备忘代码块
IconButton(
    onPressed: () {},
    icon: const Icon(Icons.cached),
)
```

```shell
$ mem gpt "你是真的chatgpt吗"

"是的，我是来自openAI的chatgpt"

```
