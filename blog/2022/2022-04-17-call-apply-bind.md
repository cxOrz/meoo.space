---
title: 函数 call, apply, bind 的异同
slug: js-call-bind-apply
authors: cxOrz
tags: [js]
---

> 每一个函数都有这三个方法，平时也不怎么能用到，整的时间长不看真容易迷糊...

```javascript
function Fn(){}
```

函数 Fn，可调用 `Fn.call()`, `Fn.apply()`, `Fn.bind()`，下面细说。

```javascript
const person = {
  name: 'Lee',
  say: function (greet) {
    console.log(`${greet}, I'm ${this.name}`)
  }
}
const dog = { name: 'coco' }

person.say('hi') // hi, I'm Lee

person.say.apply(dog, ['woof']) // woof, I'm coco

person.say.call(dog, 'woof') // woof, I'm coco

let person_dog = person.say.bind(dog, 'woof')
person_dog() // woof, I'm coco
```

## 相同之处

将调用此函数的 Fn 的 this 指向传入的第一个参数。

## 不同之处

1. call 和 apply 立即执行，bind 返回绑定过的函数，需要手动执行。
2. call 和 bind 传入参数列表，而 apply 则是要求传入一个参数数组