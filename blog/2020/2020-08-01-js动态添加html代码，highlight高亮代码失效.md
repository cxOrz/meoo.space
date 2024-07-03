---
slug: highlightjs-notwork
title: highlight.js 高亮代码失效
authors: cxOrz
tags: [js]
---

> 因为hljs.initHighlightingOnLoad()只在初始化时高亮一次，所以动态添加的话，调用这个函数多少次都没用的。

啥都不用管，先用js动态添加你的HTML代码，动态添加完HTML后，直接一行代码就可以搞定。

```javascript
hljs.highlightBlock(document.getElementById("codes"));
```

顾名思义，highlightBlock就是高亮某个块，所以直接用来高亮包含代码的那个块就可以了，双引号里的codes是在html文档中需要高亮的代码的标签id。
