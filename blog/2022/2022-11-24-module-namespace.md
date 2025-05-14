---
title: TS 中 module 和 namespace
slug: ts-module-namespace
authors: cxOrz
tags: [js]
---

模块和名称空间，实际用起来没什么区别，但是概念上有些不同。

模块的设计理念是分割和组织代码文件，一个文件就是一个module。在一个文件中访问另一个文件必须要加载（import或者require）它。

引用TS官网的一句话：
> It’s important to note that in TypeScript 1.5, the nomenclature has changed. “Internal modules” are now “namespaces”. “External modules” are now simply “modules”

自 TS 1.5 以后，namespace 可以看作是内部模块，modules 就是它原本的意思（外部模块）。命名空间顾名思义，提供了一个空间，在这里面定义的变量、接口、函数等，与其他空间隔离，也就是说他们的名称相同也不会互相影响，就像 Java 中的包。

## 示例

`/// <reference path = "..." />`，这个指令会引入要加载的ts文件，然后就可以使用其中的内容。

下面这些代码，在不同文件里共同定义了一个名称空间 Card，该名称空间下暴露了几个类，分别是 Circle, Triangle, Square。并在名称空间之外，定义了一个 Drawable 接口。

```ts
/// <reference path = "./Shape.ts" />

// Circle.ts
namespace Card {
  export class Circle implements Drawable {
    type = 'Circle';
    constructor(){
      
    }
    draw() {
      console.log('Draw Circle.');
    }
  }
}
```

```ts
// Shape.ts
interface Drawable {
  draw(); // 定义抽象 draw 方法
}

namespace Card {
  export class Triangle implements Drawable {
    // 实现 draw 方法
    draw() {
      console.log('Draw Triangle.');
    }
  }
  export class Square implements Drawable {
    draw() {
      console.log('Draw Square.');
    }
  }
}
```

```ts
/// <reference path="./Circle.ts" />
/// <reference path="./Shape.ts" />

// Test.ts
function testCircle(shape: Card.Circle) {
  shape.draw();
}

function testTriangle(shape: Card.Triangle) {
  shape.draw();
}

function testSquare(shape: Card.Square) {
  shape.draw();
}

testCircle(new Card.Circle());
```