# mosa

用于命令行的交互式备忘单工具.🪵

tips:暂时主要只支持 mac，其他系统未测试，后续再支持

### 解决什么问题

1. 在任意终端目录下，能统一快速便捷的操作同一个文档库中的文件，省去了频繁 cd 和敲长长命令的流程
2. 各平台命令不太一样，如 win 的 powershell，linux 的 bash 等，用 mosa 可以统一文件操作体验
3. 文件查找过程不经过遍历，而是直接查本地缓存列表，优化了文档库查找文件速度
4. mosa cat 命令不仅能直接在终端展示文件内容，还能根据文件名模糊查询，不记得具体文件名？它会提示你
5. 不用脱离工作环境去打开其他备忘软件，vscode 用户直接 command + j 在终端快速查询

### 后续功能

- [ ] 多平台兼容
- [ ] 对 git 多版本的处理
- [ ] 更统一和友好的提示
- [ ] open 命令对 vim，sublime 等软件的支持
- [ ] 减少配置操作
- [ ] 集成一些常用工具

### 安装

```
npm install mosa -g
```

### 如何使用

### 演示

```shell
$ mosa config set path=/Users/arsize/Documents/doc
//手动设置一个文档存放路径
```

```shell
$ mosa config get path
//查看文档存放路径
```

```shell
$ mosa cache //同步缓存记录和目录下真实文件
oooook!

```

```shell
$ mosa cat mysql

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

```shell
$ mosa ls
 [0] bb.md
 [1] github-action配置流程.md
 [2] mysql.md
 [3] xxx.md
 [4] 软链接.md

```

```shell
$ mosa c 4 //4为文件对应编号

---------------
创建软链接
ln -s [源文件或目标] [目标文件或目录]
ln -s /Users/xxx/settings.xml ~/.m2/settings.xml

删除软链接
rm -rf [目标文件]
注意：settings.xml 后面不要加 “/”，否则会把原文件也删除

修改软链接
ln -snf [源文件或目录] [目标文件或目录]

---------------

```

```shell
$ mosa d -f xxx.md //-f 为强制性删除，会真实删除文件
? 确定删除该文档吗? Yes
success!

```

```shell
$ mosa d 0 //不加-f不会真实删除文件，0为文件编号
? 确定删除该文档吗? Yes
success!

```

```shell
$ mosa rname mysql.md mysql命令 //修改文件名
oooook!
```

```shell
$ mosa rna 2 mysql命令 //也可用对应编号修改文件名
oooook!
```

```shell
$ mosa open 2 //vscode 新窗口打开编号2的文件（暂时只支持vscode，sublime）
oooook!
```

```shell
$ mosa open mysql //打开文件名为mysql的文件
oooook!
```
