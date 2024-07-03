---
slug: reactrouter-flickering
title: react-router v6 路由跳转时页面闪烁
authors: cxOrz
tags: [react]
---

安装react-router-dom的时候版本已经变成6.0.2了，没注意到，结果在写项目时候怪怪的，以往的写法都不对了，照着仓库的例子学了学发现跳转时闪屏。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter,Route, Routes } from 'react-router-dom';
import User from './pages/User/User';
import Main from './pages/Main/Main'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="user" element={<User />}/>
          <Route path="*" element={<Main />}/>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

官方仓库的教程只写了 `<Router></Router>`，虽然比#号看起来舒服，但是一跳转就闪。

使用 `<HashRouter></HashRouter>` 就不闪屏了。
