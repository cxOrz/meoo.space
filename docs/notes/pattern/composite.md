---
title: 组合模式 (Composite)
slug: composite
sidebar_position: 7
---

## 概念

组合模式是一种结构型设计模式，它可以将对象组合成树状结构，并且能像使用独立对象一样使用它们。组合模式可以通过将同一抽象或接口类型的实例放入树状结构的行为方法来识别出。

- 你可以利用多态和递归机制更方便地使用复杂树结构。
- 开闭原则。无需更改现有代码，就可以在应用中添加新元素，使其成为对象树的一部分。
- 对于功能差异较大的类，提供公共接口或许会有困难。在特定情况下，需要过度一般化组件接口，使其变得令人难以理解。

## 示例

`Graphic` 接口定义了一些图形应有的基础函数，**绘制** 和 **是否含有子项**，`Dot` 类和 `Composite` 类都实现该图形接口，`Composite` 类另外实现了添加和删除子项的函数，保存一个 children 数组，子项可以是简单的 `Dot` 对象，也可以是复杂的 `Composite` 对象，由此可以形成一个树状的结构。

客户端代码通过 `Graphic` 接口，来调用抽象的不具体的函数。

```ts
// 接口定义了图形应有的一些函数功能，画、有无子项
interface Graphic {
  draw(): void;
  isComposite(): boolean;
}

/**
 * 该类代表了组合对象的末端，末端没有子项。
 * 通常是该类完成实际的工作，组合对象只负责把工作委派给他们。
 * 点类实现了图形接口，实现具体的画、有无子项函数
 */
class Dot implements Graphic {
  protected x = 0;
  protected y = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public draw(): void {
    console.log('.', this.x, this.y);
  }

  // 可提供这个方法，让客户端代码确定某组件是否可以有子组件
  public isComposite(): boolean {
    return false;
  }
}

/**
 * 组合类实现了图形接口，它可以添加删除子项（简单项、复杂组合）
 * 它把实际工作委派给子项，然后再收集汇总他们的结果
 */
class Composite implements Graphic {
  private children: Graphic[] = [];

  public add(graphic: Graphic) {
    this.children.push(graphic);
  }
  public remove(graphic: Graphic) {
    this.children.splice(this.children.indexOf(graphic), 1);
  }
  public isComposite() {
    return true;
  }
  // 递归遍历子项，收集汇总它们的结果
  public getChildren() {
    const arr: any[] = [];
    this.children.forEach((v) => {
      if (v instanceof Composite) {
        arr.push(v.getChildren());
      } else {
        arr.push(v);
      }
    });
    return arr;
  }
  // 将子项所有结果收集汇总，并把最终结果输出
  draw(): void {
    console.log(this.getChildren());
  }
}

// 客户端代码，通过基础接口，就可以与所有的简单项、复杂组合进行交互
function ClientCode(graphic: Graphic) {
  graphic.draw();
}

const composite = new Composite();
const dot1 = new Dot(1, 1);
const dot2 = new Dot(2, 2);
const comp1 = new Composite();
comp1.add(dot1);
composite.add(comp1);
composite.add(dot2);

// [ [ Dot { x: 1, y: 1 } ], Dot { x: 2, y: 2 } ]
ClientCode(composite);

```