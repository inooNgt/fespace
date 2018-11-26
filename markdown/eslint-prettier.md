Eslint 和 Prettier 配置自动格式化代码

Eslint 可以提供代码检查，而 Prettier 能够统一团队代码风格，两者结合在一起会事半功倍。

#### 安装依赖

```
npm install prettier babel-eslint eslint eslint-config-prettier eslint-plugin-flowtype eslint-plugin-prettier eslint-plugin-import  --save-dev
```

-   eslint-config-prettier 可以取消 eslint 和 prettier 冲突的配置项，采用 prettier 风格
-   eslint-plugin-prettier 可以将 prettier 的格式化规则作为 eslint 的检查规则

#### 相关配置文件

新建 Eslint 和 Prettier 的配置件：

```
touch .eslintrc
touch .prettierrc
```

在.eslintrc 写入一下内容:

```
{
    "parser": "babel-eslint",
    "extends": [
        "prettier",
        "prettier/flowtype" // if you are using flow
    ],
    "rules": {
        "indent": ["error", 2],
        "prettier/prettier": "error"
    },
    "plugins": [
        /* Flow type linting rules for ESLint. */
        "flowtype",
        "prettier"
    ]
}
```

eslint 规则是完全可配置的，其级别为：

-   "off" 或 0 - 关闭规则
-   "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
-   "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

更多配置项见 https://cn.eslint.org/docs/user-guide/configuring

在.prettierrc 写入以下内容:

```
{
    "tabWidth": 2,
    "singleQuote": true
}
```

更多配置项见 https://prettier.io/docs/en/configuration.html

#### 开发工具的配置

例如，将以下配置加入配置文件：

```
    {
        "editor.formatOnSave": true,
        "prettier.disableLanguages": ["js"],
        "eslint.autoFixOnSave": true,
        "eslint.alwaysShowStatus": true
    }
```

#### 使用 Husky + Lint-Staged 在代码提交前自定检查并修正代码

-   由于 husky 在 .git/hooks 中写入了 pre-commit 钩子，该钩子在 git commit 执行时被触发
-   lint-staged 利用配置的文件过滤路径，对暂存区文件一个个进行匹配，匹配成功时，运行 eslint –fix 并自动将修改添加到暂存区

```
yarn add  precommit husky --dev
```

在 package.json 添加配置

```
	"scripts": {
        "precommit": "lint-staged" //husky 在 .git/hooks 中写入了 钩子
    },
    "lint-staged": {
        "src/**/*.js": [
            "prettier --write",
            "git add"
        ]
    },
```
