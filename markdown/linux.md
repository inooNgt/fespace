# Some Operations on Linux

### scp（secure copy）跨机远程拷贝

scp 用于在 Linux 下进行远程拷贝文件的命令，和它类似的命令有 cp，不过 cp 只是在本机进行拷贝不能跨服务器，而且 scp 传输是加密的。

#### 命令格式

一、scp [参数][原路径] [目标路径]

-   -1 强制 scp 命令使用协议 ssh1
-   -2 强制 scp 命令使用协议 ssh2
-   -4 强制 scp 命令只使用 IPv4 寻址
-   -6 强制 scp 命令只使用 IPv6 寻址
-   -B 使用批处理模式（传输过程中不询问传输口令或短语）
-   -C 允许压缩。（将-C 标志传递给 ssh，从而打开压缩功能）
-   -p 留原文件的修改时间，访问时间和访问权限。
-   -q 不显示传输进度条。
-   -r 递归复制整个目录。
-   -v 详细方式显示输出。scp 和 ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。
-   -c cipher 以 cipher 将数据传输进行加密，这个选项将直接传递给 ssh。
-   -F ssh_config 指定一个替代的 ssh 配置文件，此参数直接传递给 ssh。
-   -i identity_file 从指定文件中读取传输时使用的密钥文件，此参数直接传递给 ssh。
-   -l limit 限定用户所能使用的带宽，以 Kbit/s 为单位。
-   -o ssh_option 如果习惯于使用 ssh_config(5)中的参数传递方式，
-   -P port 注意是大写的 P, port 是指定数据传输用到的端口号
-   -S program 指定加密传输时所使用的程序。此程序必须能够理解 ssh(1)的选项。

#### 命令参数

#### 例子

复制文件

```shell
scp local_file remote_username@remote_ip:remote_folder
scp local_file remote_username@remote_ip:remote_file
scp local_file remote_ip:remote_folder
scp local_file remote_ip:remote_file
```

###二、 ufw 防火墙配置

Ubuntu 附带一个名为 UFW（简单防火墙）的防火墙配置工具。UFW 是管理 iptables 防火墙规则的一个用户友好的前端，它的主要目标是使管理 iptables 更容易，或者如其名所说，简单。
默认情况下，UFW 将阻止所有传入连接并允许所有出站连接。 这意味着任何试图访问您的服务器的用户都将无法连接，除非您专门打开该端口，而服务器上运行的所有应用程序和服务都将能够访问外部世界。

#### 操作

1. 查看 ufw 状态

```shell
sudo ufw status verbose
```

2. 允许 SSH 连接

```shell
sudo ufw allow ssh
```

3. 允许端口连接

```shell
sudo ufw allow  80/tcp
```

4. 允许特定的 IP 地址

```shell
sudo ufw allow from 55.56.57.58
```

5. 拒绝连接

```shell
  sudo ufw deny from 33.34.35.0/34
```

6. 删除规则

```shell
  sudo ufw status somenumbered
```

###三、按装 tar.gz 源码包

```shell
wget https://www.xxx.com/download/somepackge.tar.gz
tar -zxvf somepackge.tar.gz
cd somepackge
./config
make
make install
```

### 四、ps（Process Status） 进程查看器

ps 命令用来列出系统中当前运行的那些进程。ps 命令列出的是当前那些进程的快照，就是执行 ps 命令的那个时刻的那些进程。

linux 上进程有 5 种状态:

1. 运行(正在运行或在运行队列中等待)
2. 中断(休眠中, 受阻, 在等待某个条件的形成或接受到信号)
3. 不可中断(收到信号不唤醒和不可运行, 进程必须等待直到有中断发生)
4. 僵死(进程已终止, 但进程描述符存在, 直到父进程调用 wait4()系统调用后释放)
5. 停止(进程收到 SIGSTOP, SIGTSTP, SIGTTIN, SIGTTOU 信号后停止运行运行)

#### 命令参数

-   a 显示所有进程
-   -a 显示同一终端下的所有程序
-   -A 显示所有进程
-   c 显示进程的真实名称
-   -N 反向选择
-   -e 等于“-A”
-   e 显示环境变量
-   f 显示程序间的关系
-   -H 显示树状结构
-   r 显示当前终端的进程
-   T 显示当前终端的所有程序
-   u 指定用户的所有进程
-   -au 显示较详细的资讯
-   -aux 显示所有包含其他使用者的行程
-   -C<命令> 列出指定命令的状况
-   –lines<行数> 每页显示的行数
-   –width<字符数> 每页显示的字符数
-   –help 显示帮助信息
-   –version 显示版本显示

#### 查看所有进程信息

```shell
ps -A
```

#### 与 grep 命令配合查看特定进程

grep (Global Regular Expression Print)命令是查找，是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。

```shell
ps -ef |grep nginx
```

中间的|是管道命令 是指 ps 命令与 grep 同时执行

### 杀死进程

```
kill pid
```
