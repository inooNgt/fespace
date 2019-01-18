import React, { Component } from "react";

const article = `<h1 id="some-operations-on-linux">Some Operations on Linux</h1>
<h3 id="scp-secure-copy-">scp（secure copy）跨机远程拷贝</h3>
<p>scp 用于在 Linux 下进行远程拷贝文件的命令，和它类似的命令有 cp，不过 cp 只是在本机进行拷贝不能跨服务器，而且 scp 传输是加密的。</p>
<h4 id="-">命令格式</h4>
<p>一、scp [参数][原路径] [目标路径]</p>
<ul>
<li>-1 强制 scp 命令使用协议 ssh1</li>
<li>-2 强制 scp 命令使用协议 ssh2</li>
<li>-4 强制 scp 命令只使用 IPv4 寻址</li>
<li>-6 强制 scp 命令只使用 IPv6 寻址</li>
<li>-B 使用批处理模式（传输过程中不询问传输口令或短语）</li>
<li>-C 允许压缩。（将-C 标志传递给 ssh，从而打开压缩功能）</li>
<li>-p 留原文件的修改时间，访问时间和访问权限。</li>
<li>-q 不显示传输进度条。</li>
<li>-r 递归复制整个目录。</li>
<li>-v 详细方式显示输出。scp 和 ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。</li>
<li>-c cipher 以 cipher 将数据传输进行加密，这个选项将直接传递给 ssh。</li>
<li>-F ssh_config 指定一个替代的 ssh 配置文件，此参数直接传递给 ssh。</li>
<li>-i identity_file 从指定文件中读取传输时使用的密钥文件，此参数直接传递给 ssh。</li>
<li>-l limit 限定用户所能使用的带宽，以 Kbit/s 为单位。</li>
<li>-o ssh_option 如果习惯于使用 ssh_config(5)中的参数传递方式，</li>
<li>-P port 注意是大写的 P, port 是指定数据传输用到的端口号</li>
<li>-S program 指定加密传输时所使用的程序。此程序必须能够理解 ssh(1)的选项。</li>
</ul>
<h4 id="-">命令参数</h4>
<h4 id="-">例子</h4>
<p>复制文件</p>
<pre><code className="lang-shell">scp local_file remote_username<span class="hljs-meta">@remote</span><span class="hljs-string">_ip:</span>remote_folder
scp local_file remote_username<span class="hljs-meta">@remote</span><span class="hljs-string">_ip:</span>remote_file
scp local_file <span class="hljs-string">remote_ip:</span>remote_folder
scp local_file <span class="hljs-string">remote_ip:</span>remote_file
</code></pre>
<p>###二、 ufw 防火墙配置</p>
<p>Ubuntu 附带一个名为 UFW（简单防火墙）的防火墙配置工具。UFW 是管理 iptables 防火墙规则的一个用户友好的前端，它的主要目标是使管理 iptables 更容易，或者如其名所说，简单。
默认情况下，UFW 将阻止所有传入连接并允许所有出站连接。 这意味着任何试图访问您的服务器的用户都将无法连接，除非您专门打开该端口，而服务器上运行的所有应用程序和服务都将能够访问外部世界。</p>
<h4 id="-">操作</h4>
<ol>
<li>查看 ufw 状态</li>
</ol>
<pre><code class="lang-shell">sudo ufw <span class="hljs-built_in">status</span> <span class="hljs-built_in">verbose</span>
</code></pre>
<ol start="2">
<li>允许 SSH 连接</li>
</ol>
<pre><code class="lang-shell"><span class="hljs-attribute">sudo ufw allow ssh</span>
</code></pre>
<ol start="3">
<li>允许端口连接</li>
</ol>
<pre><code class="lang-shell">sudo ufw allow  <span class="hljs-number">80</span>/tcp
</code></pre>
<ol start="4">
<li>允许特定的 IP 地址</li>
</ol>
<pre><code class="lang-shell"><span class="hljs-selector-tag">sudo</span> <span class="hljs-selector-tag">ufw</span> <span class="hljs-selector-tag">allow</span> <span class="hljs-selector-tag">from</span> 55<span class="hljs-selector-class">.56</span><span class="hljs-selector-class">.57</span><span class="hljs-selector-class">.58</span>
</code></pre>
<ol start="5">
<li>拒绝连接</li>
</ol>
<pre><code class="lang-shell">  sudo ufw deny from <span class="hljs-number">33.34</span><span class="hljs-number">.35</span><span class="hljs-number">.0</span>/<span class="hljs-number">34</span>
</code></pre>
<ol start="6">
<li>删除规则</li>
</ol>
<pre><code class="lang-shell"><span class="hljs-attribute">  sudo ufw status somenumbered</span>
</code></pre>
<p>###三、按装 tar.gz 源码包</p>
<pre><code class="lang-shell">wget http<span class="hljs-variable">s:</span>//www.xxx.<span class="hljs-keyword">com</span>/download/somepackge.tar.gz
tar -zxvf somepackge.tar.gz
<span class="hljs-keyword">cd</span> somepackge
./config
<span class="hljs-keyword">make</span>
<span class="hljs-keyword">make</span> install
</code></pre>
<h3 id="-ps-process-status-">四、ps（Process Status） 进程查看器</h3>
<p>ps 命令用来列出系统中当前运行的那些进程。ps 命令列出的是当前那些进程的快照，就是执行 ps 命令的那个时刻的那些进程。</p>
<p>linux 上进程有 5 种状态:</p>
<ol>
<li>运行(正在运行或在运行队列中等待)</li>
<li>中断(休眠中, 受阻, 在等待某个条件的形成或接受到信号)</li>
<li>不可中断(收到信号不唤醒和不可运行, 进程必须等待直到有中断发生)</li>
<li>僵死(进程已终止, 但进程描述符存在, 直到父进程调用 wait4()系统调用后释放)</li>
<li>停止(进程收到 SIGSTOP, SIGTSTP, SIGTTIN, SIGTTOU 信号后停止运行运行)</li>
</ol>
<h4 id="-">命令参数</h4>
<ul>
<li>a 显示所有进程</li>
<li>-a 显示同一终端下的所有程序</li>
<li>-A 显示所有进程</li>
<li>c 显示进程的真实名称</li>
<li>-N 反向选择</li>
<li>-e 等于“-A”</li>
<li>e 显示环境变量</li>
<li>f 显示程序间的关系</li>
<li>-H 显示树状结构</li>
<li>r 显示当前终端的进程</li>
<li>T 显示当前终端的所有程序</li>
<li>u 指定用户的所有进程</li>
<li>-au 显示较详细的资讯</li>
<li>-aux 显示所有包含其他使用者的行程</li>
<li>-C&lt;命令&gt; 列出指定命令的状况</li>
<li>–lines&lt;行数&gt; 每页显示的行数</li>
<li>–width&lt;字符数&gt; 每页显示的字符数</li>
<li>–help 显示帮助信息</li>
<li>–version 显示版本显示</li>
</ul>
<h4 id="-">查看所有进程信息</h4>
<pre><code class="lang-shell">ps -<span class="hljs-keyword">A</span>
</code></pre>
<h4 id="-grep-">与 grep 命令配合查看特定进程</h4>
<p>grep (Global Regular Expression Print)命令是查找，是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。</p>
<pre><code class="lang-shell"><span class="hljs-keyword">ps</span> -ef |<span class="hljs-keyword">grep</span> nginx
</code></pre>
<p>中间的|是管道命令 是指 ps 命令与 grep 同时执行</p>
<h3 id="-">杀死进程</h3>
<pre><code><span class="hljs-built_in">kill</span> pid
</code></pre>`;

class Index extends Component {
    constructor(props) {
        super(props);
    }
    rawMarkup() {
        return { __html: article };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.rawMarkup()} />;
    }
}

export default Index;
