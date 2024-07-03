---
slug: npm-pass-params
title: npm 运行命令传入参数
authors: cxOrz
tags: [js, nodejs]
---

写 Github Action 的 配置文件时遇到个问题，想把 secret 密钥在执行 npm run xxx 的时候传进来，并在nodejs程序中用到这个变量。

## 方法

package.json 部分

```bash
  "scripts": {
    "action": "node ./src/action.js"
  }
```

action.js
```javascript
let username, password
username = process.argv[process.argv.indexOf('--username')+1] // 用户名在 --username 后面
password = process.argv[process.argv.indexOf('--password')+1] // 密码在 --password 后面
console.log(username + ' ' + password) // 输出传入的参数
```

<!--truncate-->

运行

```bash
 npm run action -- --username 111 --password 222
```

## 注意：不要漏掉运行npm命令时中间的 `--` 两个相邻的短杠
