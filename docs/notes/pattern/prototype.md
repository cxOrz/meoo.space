---
title: 原型模式 (Prototype)
slug: prototype
sidebar_position: 5
---

## 概念

原型模式是一种创建型设计模式，使你能够复制已有对象，而又无需使代码依赖它们所属的类。

它将克隆过程委派给被克隆的实际对象，这样可以解决一些私有变量无法被外部访问就无法在外部复制的问题，让自身提供克隆方法来复制自己，特征是一个类包含 `clone` 或者 `copy` 函数，来复制一份自身对象。

## 示例

下面是一个 Prototype 类，里面有 clone 函数，会复制一份自身对象并返回。一般也可以，定义一个 Cloneable 接口，接口里仅包含一个 clone 函数的定义，让其他类来实现这个接口。

```ts
class Prototype {
  public primitive: any;
  public component: object | null = null;
  public circularReference: ComponentWithBackReference | null = null;

  /**
   * 像实现一个深拷贝，把自身的成员变量都给拷贝一遍，考虑基本类型、引用类型、
   * 循环引用的情况、日期类型、正则对象等等
   */
  public clone(): this {
    const clone = Object.create(this);
    // 假设 component 对象只有一层，可以这样拷贝
    clone.component = Object.create(this.component);
    // 处理循环引用，先用扩展运算符把基本类型的成员复制出来，再单独处理 prototype
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };
    return clone;
  }
}

// 循环引用的类，prototype 里有它，它里面有 prototype
class ComponentWithBackReference {
  public prototype: Prototype;

  constructor(proto: Prototype) {
    this.prototype = proto;
  }
}

```