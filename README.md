# mosa

用于命令行的交互式备忘单工具.🪵

### 安装

```
npm install mosa -g
```

### 如何使用

### 演示

```shell
$ mosa cat -s "mysql"

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
$ mosa cat -s "flutterIconButton"

//备忘代码块
IconButton(
    onPressed: () {},
    icon: const Icon(Icons.cached),
)
```
