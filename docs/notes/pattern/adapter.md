---
title: 适配器模式 (Adapter)
slug: adapter
sidebar_position: 6
---

## 概念

适配器模式是一种结构性设计模式，能够使不兼容的对象相互合作。可以担任两个对象之间的封装器，将一个对象的调用转换为另一个对象可识别的调用。

适配器模式允许你创建一个中间层类， 其可作为代码与遗留类、 第三方类或提供怪异接口的类之间的转换器。

特点：
- 单一职责原则，可以将接口或数据转换代码从程序主要业务逻辑中分离。
- 开闭原则，只要客户端代码通过客户端接口与适配器进行交互，你就能在不修改现有客户端代码的情况下在程序中添加新类型的适配器。
- 代码整体复杂度增加，因为需要新增一系列接口和类。有时直接更改服务类使其与其他代码兼容会更简单。

## 示例

客户端要通过标准 Requestable 接口规范来请求，像 `request('Hi')` 这样调用。但一个重要的功能，调用方式并不规范，已经过时，但又不好重写，需要传两个参数 `request('Hi', '')` 这样来调用，这时就需要适配器来解决。

```ts
interface Requestable {
  request(str: string): void;
}

// 适配器遵循客户端要求的接口，将其转换为符合遗留类要求的调用方式，对遗留类的函数进行调用。
class Adapter implements Requestable {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  // 符合规范的调用，内部转为符合遗留标准的调用
  public request(str: string): void {
    this.adaptee.wierdRequest(str, '');
  }
}

// 遗留的功能类
class Adaptee {
  public wierdRequest(str1: string, str2: string) {
    console.log(str1 + str2);
  }
}

// 客户端代码，只会调 request('Hi') 这样，不会传两个参数
function clientCode(target: Requestable) {
  target.request('Hi');
}

clientCode(new Adapter(new Adaptee()));
```