---
slug: react-no-sourcemap
title: React构建时不生成sourcemap
authors: cxOrz
tags: [frontend, react]
---

生产模式构建静态网页时，默认会生成 .map 文件，比较大，并且部署后通过浏览器访问可以在控制台看到开发时的源代码，虽说是方便调试，但是都构建 Production Build 了还能被查看代码总让人心里不太舒服。

## 配置

可以通过配置 .env 文件，将 GENERATE_SOURCEMAP 设为 false 即可不生成 sourcemap 文件。

创建 `.env` 文件，并在文件中添加这行代码
```javascript
GENERATE_SOURCEMAP = false
```
<!--truncate-->
## 更多

列几个常用的，见下表

|变量|生效的模式|描述|
|-|-|-|
|BROWSER|开发|设置启动的浏览器，其值请查看 [这里](https://github.com/sindresorhus/open#app)|
|HOST|开发|自定义开发服务器的主机地址，例如 HOST=127.0.0.1|
|PORT|开发|设置开发服务器运行的端口，例如 PORT=8080|
|HTTPS|开发|当 HTTPS=true 时，开发服务器将以https模式运行|
|BUILD_PATH|生产|设置build文件夹路径，相对于项目根目录|