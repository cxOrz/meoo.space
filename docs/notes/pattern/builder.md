---
title: 生成器模式 (Builder)
slug: builder
sidebar_position: 4
---

## 概念

生成器模式也叫建造者模式，这种模式可以分步骤创建复杂对象。该模式允许你使用相同的创建代码生成不同类型和形式的对象。

- 你可以分步创建对象
- 生成不同形式的产品时，可以复用相同的制造代码
- 单一职责原则，你可以将复杂构造代码从产品的业务逻辑中分离出来
- 由于该模式需要新增多个类，因此代码整体复杂程度会有所增加

## 示例

下列代码，根据 `Builder` 生成器接口，实现了 `CarBuilder` 来造车，`CarBuilder` 提供了造车的一系列步骤函数，并提供自己的 `getCar()` 方法来获取结果产品。

可选的主管类 `Director` 用来指导造车，它提供一个 `makeCar(builder: Builder)` 方法来按照一定工艺流程来调用一系列造车函数。

在造完车之后，调用汽车生成器的 `getCar()` 方法获取成品。

```ts
// 生成器接口指定了创建产品对象不同部分的一系列方法
interface Builder {
  setEngine(engine: string): void;
  setGPS(gps: string): void;
  setWheels(wheels: string): void;
  reset(): void;
}

// 特定生成器类根据生成器接口，实现一系列创建产品的步骤方法。
// 可以根据该接口，实现多个不同的生成器变体，例如 TruckBuilder、BusBuilder
class CarBuilder implements Builder {
  private car;

  // 一个生成器实例，应该包含一个空的产品对象，未来用于进一步的组合
  constructor() {
    this.car = new Car();
  }

  reset(): void {
    this.car = new Car();
  }
  setEngine(engine: string): void {
    this.car.addItem(engine);
  }
  setGPS(gps: string): void {
    this.car.addItem(gps);
  }
  setWheels(wheels: string): void {
    this.car.addItem(wheels);
  }

  /**
   * 具体的生成器提供自己的方法来获取结果，因为不同类型的生成器可能创建出完全
   * 不同的产品而且不实现同一接口，因此这种方法不能被声明在基础生成器接口中。
   * 通常，在把结果返回给客户端之后，生成器实例会准备进行下一个产品的创建。
   * 这就是为什么一般要在 getProduct 函数的末尾调用 reset 函数。
   * 但这种做法并不是强制的，也可以在合适的时间，在客户端或者主管类代码来一次 reset 调用。
   */
  getCar() {
    const result = this.car;
    this.reset();
    return result;
  }
}

// 最好只在创建产品很复杂而且需要大量配置的时候用生成器模式。
class Car {
  private items: any[] = [];

  public addItem(item: any) {
    this.items.push(item);
  }

  public listParts() {
    return this.items;
  }
}

/**
 * 主管只负责按照特定顺序执行生成步骤。其在根据特定步骤或配置来生成产品时
 * 会很有帮助。由于客户端可以直接控制生成器，所以严格意义上来说，主管类并
 * 不是必需的。
 */
class Director {
  makeCar(builder: Builder) {
    builder.setEngine('Engine');
    builder.setGPS('GPS');
    builder.setWheels('Wheels');
  }
}

function ClientCode() {
  // 主管类指导造车
  const director = new Director();
  const carBuilder = new CarBuilder();
  director.makeCar(carBuilder);
  console.log(carBuilder.getCar().listParts()); // ['Engine', 'GPS', 'Wheels']

  // 再造一辆，不用主管类
  carBuilder.setEngine('SuperEngine');
  carBuilder.setWheels('AntiBullet');
  console.log(carBuilder.getCar().listParts()); // ['SuperEngine', 'AntiBullet']
}

ClientCode();
```