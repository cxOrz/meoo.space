---
title: 从 JavaScript 到 TypeScript
slug: js-to-ts
authors: cxOrz
tags: [js]
---

:::info
本栏笔记参考[TypeScript文档](https://www.typescriptlang.org/docs/handbook)撰写，目前尚无中文翻译，看起来费劲，在这里对其中的要点进行提取，融入自己的理解和示例代码，以中文的笔记形式记录下来。
:::

本文对 TypeScript 进行简要的概述，重点介绍它的类型系统。

## 类型推断
在声明变量并给他赋值时，会把该值的类型作为该变量的类型。
当鼠标放在 `words` 上时，IDE会提示它是string类型。
```typescript
let words = 'hello'
```

## 定义类型
默认会推断类型，可以这样创建一个 `user` 对象，它的 `name` 属性为字符串类型，`id` 属性为数字类型。
```typescript
const user = {
  name: 'Lee',
  id: 0
}
```

### 显式描述类型
`interface` 事先定义好一个“形”，创建符合这个形的对象 `user` 时，会把 `user` 和 `User` 定义的属性进行匹配，比较其类型是否相符。以下代码，若缺少定义的属性，会被警告；若类型不匹配，也会被警告。
```ts
interface User {
  name: string;
  id: number;
}
const user: User = {
  name: '',
  id: 1
}
```
可以将接口声明和类一起使用，
```ts
interface User {
  name: string;
  id: number;
}
class Teacher {
  name: string;
  id: number;
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
const user: User = new Teacher("Murphy", 1);
```
也可以用来注释参数，也可以用来注释返回值的类型
```ts
function getUserUser(): User {
  return
}
function deleteUser(user: User) {
}
```
JavaScript 中的原始类型：`boolean`、`bigint`、`null`、`number`、`string`、`symbol` 和 `undefined`，你可以在接口中使用它们。TypeScript 对这些类型进行了扩展，例如`any`、`unknown`、`never` 和 `void`。

定义类型有两种方式，你应该优先选择用 `interface`，必要时再使用 `type`。

## 组合类型
可以通过组合简单类型来创建复杂类型。有两种流行的方法可以做到这一点：使用联合类型和泛型。

### 联合类型
使用联合类型，你可以定义一个可能会是很多种类型其中之一的类型，例如你可以定义一个 MyBool 其值可能是 `true` 或 `false`。
```ts
type MyBool = true | false
```
比较常用的联合类型用法：定义一个可能出现的值的集合，一个字符串集合或数值集合。
```ts
type WindowStates = 'open' | 'closed'
type LockStatus = 'locked' | 'unlocked'
type FanSpeed = 1 | 2 | 3 | 4 | 5 | 6
```
也可以用来定义多种类型的参数，传给函数。例如以下函数，可以接受一个字符串，也可以接受字符串数组
```ts
function handle(obj: string | string[]) { }
```

### 泛型
`type` 就像C语言里的 `typedef`。第三行定义了一个类型：对象数组，对象必须有字符串类型的 name 属性
```ts
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```
定义自己的泛型类型，类比一下 Array\<T\>
```ts
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
```

## 结构类型系统
TypeScript的核心原则之一，就是类型检查，实际上是检查“形”里定义的值。在结构类型系统中，如果两个对象有相同的“形”，那么他俩就会被认定是同一类型。
```ts
interface Point {
  x: number;
  y: number;
}
function logPoint(p: Point) {
  console.log(p.x, p.y);
}
const point = { x: 12, y: 26 };
const point1 = {x: 1, y: 2, z: new String('3'), n: 4}
logPoint(point); // 输出：12,26
logPoint(point1); // 输出：1,2
```

从上面的代码可以看到，point 是一个拥有 `x` 和 `y` 属性的对象，它从没声明过自己是 Point 类型，但是它通过了类型检查，因为他们有相同的“形”。这个机制用 shape-matching 描述起来更贴切。

shape-matching 匹配只需要是这个对象属性的子集，就匹配通过。即 {'{定义类型属性}'} ∈ {'{对象所有属性}'}，在这个例子中就是参数 p 至少包含 x 和 y ，如果有其他属性 z 或者更多也不影响。此规则在类对象上也不例外。