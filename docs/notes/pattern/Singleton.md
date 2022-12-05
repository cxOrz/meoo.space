---
title: 单例模式 (Singleton Pattern)
slug: singleton
sidebar_position: 1
---

## 概念

单例模式提供方法，返回相同的缓存实例对象。

定义一个 Singleton 类，它应该具备以下特征：

- 实例对象私有，不可被直接访问
- 实现静态公有的 `getInstance()` 方法获取实例对象
- 类不可使用 `new` 来实例化


## 示例

单例模式示例代码如下：

```ts
class Singleton {
  private static instance: Singleton;

  // 私有构造函数，不可用 new 实例化
  private constructor() { }

  public static getInstance(): Singleton {
    if (!this.instance) {
      this.instance = new Singleton();
    }

    return Singleton.instance;
  }

  // 单例也有一些业务逻辑，在实例上执行
  public printHello() {
    console.log('Hello');
  }
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
s1.printHello(); // Hello
s1 === s2; // true
```

可以出 `s1` 和 `s2` 引用的是同一个实例对象。