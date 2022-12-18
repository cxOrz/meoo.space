---
title: 抽象工厂模式 (Abstract Factory)
slug: abstract-factory
sidebar_position: 3
---

## 概念

抽象工厂模式是一种创建型设计模式，它能创建一系列相关的对象，而无需指定其具体类。

优点：
1. 你可以确保同一工厂生成的产品相互匹配。
2. 你可以避免客户端和具体产品代码的耦合。
3. 单一职责原则。 你可以将产品生成代码抽取到同一位置， 使得代码易于维护。
4. 开闭原则。 向应用程序中引入新产品变体时， 你无需修改客户端代码。

缺点：
1. 由于采用该模式需要向应用中引入众多接口和类， 代码可能会比之前更加复杂。

## 示例

抽象工厂模式的特点是，定义一个抽象工厂类或者接口，由此定义了规范的工厂方法（造桌子、造椅子），将此规范应用于具体的工厂类，例如现代风格工厂和复古风格工厂，生产出不同风格的桌子椅子，他们具有相同的规范，能坐、能放东西。想创建新的风格家具，只需要编写新风格的工厂类并实现抽象工厂接口，不用改动任何已有代码。

抽象工厂，构造方法返回的是抽象的产品。客户端代码，也是与抽象的产品进行交互，无需知道其内部细节，只需要知道椅子可以 `sitOn`，桌子可以 `putSomething` 。

```ts
interface AbstractFactory {
  createChair(): AbstractChair;
  createDesk(): AbstractDesk;
}

interface AbstractChair {
  type: string;
  sitOn(): void;
}

interface AbstractDesk {
  type: string;
  putSomething(): void;
  mixedFurniture(chair: AbstractChair): void;
}

class MordernChair implements AbstractChair {
  type = 'MordernChair';
  sitOn() {
    console.log('Sitting on Mordern chair.');
  }
}

class ClassicChair implements AbstractChair {
  type = 'ClassicChair';
  sitOn() {
    console.log('Sitting on Classic chair.');
  }
}

class MordernDesk implements AbstractDesk {
  type = 'MordernDesk';
  putSomething() {
    console.log('Put something on Mordern desk.');
  }
  mixedFurniture(chair: AbstractChair): void {
    console.log(`Combo taste: ${chair.type} ${this.type}`);
  }
}
class ClassicDesk implements AbstractDesk {
  type = 'ClassicDesk';
  putSomething() {
    console.log('Put something on Classic desk.');
  }
  mixedFurniture(chair: AbstractChair): void {
    console.log(`Combo taste: ${chair.type} ${this.type}`);
  }
}

class MordernStyleFactory implements AbstractFactory {
  createChair(): AbstractChair {
    return new MordernChair();
  }
  createDesk(): AbstractDesk {
    return new MordernDesk();
  }
}

class ClassicStyleFactory implements AbstractFactory {
  createChair(): AbstractChair {
    return new ClassicChair();
  }
  createDesk(): AbstractDesk {
    return new ClassicDesk();
  }
}

// 客户端代码通过抽象类型与工厂和产品进行交互，这使得耦合度很低
function ClientCode(factory: AbstractFactory) {
  // 根据传入的工厂，创建对应风格的家具
  const chair = factory.createChair();
  const desk = factory.createDesk();
  chair.sitOn();
  // 桌椅混合套餐
  desk.mixedFurniture(chair);
}

// 现代风格工厂
ClientCode(new MordernStyleFactory());
```