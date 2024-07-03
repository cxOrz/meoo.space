---
slug: reactrouter-protected-route
title: react-router v6 简单路由拦截跳转到登录
authors: cxOrz
tags: [react]
---

非常简单的路由拦截，使用localstorage储存登录状态，写一个拦截组件，由他根据登录状态来判断是否跳转到登录。

<!--truncate-->

```javascript
import React from 'react'
import { Navigate } from 'react-router-dom'

// RequireAuth 组件相当于一个拦截器，是否返回被拦截的组件要听他的
function RequireAuth({ children }) {
  const authed = localStorage.getItem('login')

  return authed === 'true' ? ( // 判断 localstorage 中登录状态是否为 true
    children
  ) : (
    <Navigate to="/user" replace /> // 跳转到登录
  );
}

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}> // 路由嵌套
        <Route path="user" element={<User />} />
        <Route path="upload" element={
          <RequireAuth> // 拦截组件
            <MovieUpload /> // 被拦截组件
          </RequireAuth>
        }
        />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);

```
一个非常基础的路由拦截就实现了。
