---
title: 工厂方法模式 (Factory Method)
slug: factory-method
sidebar_position: 2
---


## 概念

工厂方法模式是一种创建型设计模式，在父类中提供一个创建对象的方法，允许子类决定实例化对象的类型。

客户端将由不同工厂创建的所有产品都视为抽象的，客户端知道所有产品都提供的交付方法，但是并不关心其具体实现方式。也就是说，产品要有统一的接口，让客户知道怎么用，但不需要知道所调用方法的内部逻辑。如果某一天需要添加新的产品，不需要破坏原有代码，写新的工厂类来创建新产品即可，产品仍然是遵循统一的接口，对客户来说，使用并没有变化。

优点：
1. 可以避免创建者和具体产品之间的紧密耦合。
2. 单一职责原则。可以将产品创建代码放在程序的单一位置，从而使得代码更容易维护。
3. 开闭原则。无需更改现有客户端代码，你就可以在程序中引入新的产品类型。

缺点：
1. 应用工厂方法模式需要引入许多新的子类，代码可能会因此变得更复杂。

## 示例
以下代码有两个重点，分别是工厂和产品。

定义了一个 Creator 抽象类，包含了抽象工厂方法，和一些业务代码；具体的 ConcreteCreatorA 和 ConcreteCreatorB 继承该抽象类，实现各自具体的工厂方法用于创建不同产品。

定义了一个 Product 接口，制定了产品的特征；规定产品有一个 operation() 函数；具体的产品 ConcreteProductA 和 ConcreteProductB 实现了该接口，各自的 operation() 内部代码都不相同。

```ts
// Product 产品接口，定义了产品具有 operation 特征
// ConcreteProductA ConcreteProductB 实现 Product 接口，是具体的产品实体类。
interface Product {
  operation(): string;
}

class ConcreteProductA implements Product {
  public operation(): string {
    return '[Result of ConcreteProductA]';
  }
}

class ConcreteProductB implements Product {
  public operation(): string {
    return '[Result of ConcreteProductB]';
  }
}

/**
 * 虽然名字叫创建者，但是它的主要责任并不是创建产品，
 * 通常它包含一些依赖于 Product 对象的核心业务逻辑，Product 对象由工厂方法返回。
 * 子类可以通过重写工厂方法、返回不同类型的 Product，间接地改变业务逻辑。
 */
abstract class Creator {
  public abstract factoryMethod(): Product;

  public someOperation() {
    const product = this.factoryMethod();
    console.log('Do something, ' + product.operation());
  }
}

class ConcreteCreatorA extends Creator {
  public factoryMethod(): ConcreteProductA {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  public factoryMethod(): ConcreteProductB {
    return new ConcreteProductB();
  }
}

/**
 * 客户端代码，无需了解 Creator 类的内部逻辑，直接无脑调用 someOperation 函数；
 * 该函数写在了 Creator 类中，其业务逻辑依赖于工厂方法创建的 Product 对象；
 */
function ClientCode(creator: Creator) {
  creator.someOperation();
}

ClientCode(new ConcreteCreatorA());
ClientCode(new ConcreteCreatorB());
```

输出结果：
```
Do something, [Result of ConcreteProductA]
Do something, [Result of ConcreteProductB]
```