---
title: 装饰模式 (Decorator)
slug: decorator
sidebar_position: 8
---

## 概念

装饰模式是一种结构型设计模式，通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。

- 无需创建新子类即可扩展对象的行为。
- 可以在运行时添加或删除对象的功能。
- 可以用多个装饰封装对象来组合几种行为。
- 单一职责原则。可以将实现了许多不同行为的一个大类拆分为多个较小的类。

## 示例

写了一个数据读写的例子，定义一个 `DataSource` 接口规定读写操作。`StringDataSource` 类实现了该接口，可以读写字符串；定义装饰基类 `DataSourceDecorator` ，对将读写操作直接委派给被封装组件。

具体装饰类要继承装饰基类，然后扩展或改造读写方法，例如 `EncryptionDecorator` 类是加解密装饰类，基于装饰基类，改造了读写函数使之可以加密写入、解密读取。`CompressDecorator` 类同理，它封装了解压缩操作。

```ts
interface DataSource {
  writeData(data: string): void;
  readData(): string;
}

// 字符串内容读写类，实现了读写接口
class StringDataSource implements DataSource {
  private content: string;

  constructor(content?: string) {
    this.content = content || '';
  }

  writeData(data: string): void {
    this.content = data;
    console.log(`Written ${data}.`);
  }

  readData(): string {
    return this.content;
  }
}

// 装饰基类
class DataSourceDecorator implements DataSource {
  // 被封装的组件
  protected source: DataSource;

  constructor(dataSource: DataSource) {
    this.source = dataSource;
  }

  // 装饰基类会直接将所有工作分派给被封装组件。具体装饰中则可以新增一些
  // 额外的行为。
  writeData(data: string): void {
    this.source.writeData(data);
  }
  readData(): string {
    return this.source.readData();
  }
}

// 加解密装饰类，继承装饰基类，对读写数据函数进行了可加解密的改造
class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    let chars = [];
    for (let i = 0; i < data.length; i++) {
      chars.push(String.fromCharCode(data.charCodeAt(i) * (i + 1)));
    }
    super.writeData(String.fromCharCode(6159) + chars.join(''));
  }

  readData(): string {
    let str = super.readData();
    if (str.startsWith(String.fromCharCode(6159))) {
      let chars = [];
      for (let i = 1; i < str.length; i++) {
        chars.push(String.fromCharCode(str.charCodeAt(i) / i));
      }
      return chars.join('');
    }
    return str;
  }
}

// 解压缩装饰类，继承装饰基类，对读写数据函数进行了可解压缩改造
class CompressDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    super.writeData(`Compressed: ${data}`);
  }
  readData(): string {
    return `Uncompressed: ${super.readData()}`;
  }
}

// 字符串数据的读写
const strData = new StringDataSource('abcde');
strData.writeData('Hello'); // 写入
console.log(strData.readData()); // 读取

// 字符串数据的加解密读写，用加解密装饰对象包裹了字符串数据对象
const enc = new EncryptionDecorator(strData);
// 这里的加密写入，就是先加密，然后将加密好的内容委派由装饰基类 super.writeData() 处理，
// 基类该函数又将内容传给被封装的对象 source.writeData() 来处理
enc.writeData('Some secret.'); // 加密写入
console.log(enc.readData()); // 解密读取
```

输出：

```
Written Hello.
Hello

Written ᠏SÞŇƔ ʲ˃̘ЂϲӼȨ.
Some secret.
```