---
slug: reactrouter-auth-route
title: react-router v6 路由拦截/路由鉴权
authors: cxOrz
tags: [react]
---

一个很常见的需求：有些路由，需要登录才能访问，不登陆的情况下访问它就跳转到登录页面。这里就用 Context 来写个路由鉴权的小例子。

> react-router v6稳定版出来了，有许多改变，以前拦截路由的方式也用不成了。在世界之外遨游了好久终于找到了一篇文章，学废了！整理学习一下分享出来。

<!--truncate-->

index.js 如下，路由写在了这里面：
```javascript
import { AuthProvider, RequireAuth } from './Auth.js'
ReactDOM.render(
   <HashRouter>
     <AuthProvider>
       <Routes>
         <Route path="/" element={<App />}> // 嵌套路由
           <Route path="user" element={<User />} />
           <Route path="upload" element={
             <RequireAuth> // 封装的拦截组件，已登录则返回它children组件，未登录则导航到登录页
               <MovieUpload /> // 需要登录才能使用的组件
             </RequireAuth>
           }
           />
         </Route>
       </Routes>
     </AuthProvider>
   </HashRouter>,
document.getElementById('root')
);
```

Auth.js 如下，封装路由守卫需要的函数、组件：
```javascript
import React, { useState, createContext, useContext } from "react";
import { Navigate } from 'react-router';

const AuthContext = createContext();

/**
 * 自定义hook，函数返回 Context 值，包括 authed状态、login、logout函数来修改authed状态
 */
function useAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    }
  };
}

// 将context值传递给了Context Provider，并返回该组件用于广播context值
export function AuthProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// 返回 Context 值
export default function AuthConsumer() {
  return useContext(AuthContext);
}

/**
 * @description
 * 封装拦截组件,如果已登录，返回包括的children组件；
 * 未登录，返回 <Navigate to="/user" /> 组件跳转到登录页面。
 * 
 * @example
 * <RequireAuth>
 *   <ComponentNeedAuth />
 * </RequireAuth>
 */
export function RequireAuth({ children }) {
  const { authed } = AuthConsumer();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/user" replace />
  );
}
```

需要做的就是在 User 组件中，在登录成功的时候执行Auth.js 中由 useAuth 函数返回的 login 函数，将authed状态改为true；退出登录时，执行logout函数，将authed状态改为false。
```javascript
import React from 'react'
import Auth from './Auth.js'

export default function User() {
  const { login, logout } = Auth() // Auth() 返回当前的 context 值
  								  // 它是export default的 AuthConsumer函数
  return (
    <div>
       <Button onClick={() => login() }>登录</Button> // 执行login，authed值修改为true
       <Button onClick={()=> logout() }>登出</Button> // 执行logout，authed值修改为false
       // authed 是一个state，在Auth.js中的useAuth函数里
    </div>
  )
}
```
至此，路由守卫就实现了。在配置路由的 index.js 中，用封装的 Provider 组件包裹整个路由，并在设置element时，使用拦截组件包裹住需要权限的组件。剩下就是在登录和注销处，执行login和logout来修改authed状态，以让拦截组件判断是否跳转到登录页。
