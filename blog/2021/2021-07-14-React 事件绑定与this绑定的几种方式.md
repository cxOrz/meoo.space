---
slug: react-eventbind
title: React 事件绑定/this绑定的几种方式
authors: cxOrz
tags: [react]
---

## MDN中 Function.prototype.bind()
bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

先引入一个例子：

```javascript
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

let unboundGetX = module.getX;
console.log(unboundGetX()); // 该函数在全局范围内被调用
// 输出: undefined

unboundGetX = unboundGetX.bind(module);
console.log(unboundGetX());
// 输出: 42
```

<!--truncate-->

一个 module 对象中包含一个变量`x`和一个方法`getX`。将 module 中的`getX`方法赋值给一个外面声明的变量 `unboundGetX` ，此时 `unboundGetX` 仅仅和`getX`有关系，`unboundGetX`中的`this`指向 undefined ，输出 unboundGetX() 为undefined。
后面使用bind()方法将`unboundGetX`中的`this`指向了 module ，作为新函数返回并赋值给`unboundGetX`，此时`unboundGetX`中的`this`就指向了 module 。最后输出 unboundGetX() 的结果为 42 .

**一般在哪里调用，它的this就指向哪里。在对象、class等花括号外的，严格模式下this为undefined，非严格模式指向window对象。**

在这个例子告诉我们，绑定this的重要性，接下来看看常见的绑定this的方式，以免绑定事件报错 undefined。

## 为事件方法绑定this的四种常见方式
①【推荐】在constructor中绑定：

```javascript
class App extends React.Component{
  x='Its me.'
 
  constructor(props){
    super(props);
    this.Log = this.Log.bind(this)// 在constructor中绑定this
  }
  
  Log() {
    console.log(this.x)
  }
  
  render() {
    return (
      <button onClick={this.Log}></button>// 事件绑定
    );
  }
}
```
②【推荐】class fields实验性语法，定义时使用箭头函数：
```javascript
class App extends React.Component{
  x='Its me.'
 
  constructor(props){
    super(props);
  }
  
  Log = ()=>{ // 使用箭头函数来定义函数
    console.log(this.x)
  }
  
  render() {
    return (
      <button onClick={this.Log}></button> // 事件绑定
    );
  }
}
```
③【不建议】在render中绑定事件时使用bind()绑定this：
```javascript
class App extends React.Component{
  x='Its me.'
 
  constructor(props){
    super(props);
  }
  
  Log() {
    console.log(this.x)
  }
  
  render() {
    return (
      <button onClick={this.Log.bind(this)}></button> // 事件绑定
    );
  }
}
```
④【不建议】在render中绑定事件时使用箭头函数 ( )=>{ } 绑定this：
```javascript
class App extends React.Component{
  x='Its me.'
 
  constructor(props){
    super(props);
  }
  
  Log() {
    console.log(this.x)
  }
  
  render() {
    return (
      <button onClick={ ()=>{this.Log()} }></button> // 事件绑定
    );
  }
}
```
`onClick = {this.Log}` ，实际上onClick是个变量，若不将this绑定到对象，将对象中的Log赋值给了onClick,此时触发点击事件时，onClick中的this为undefined(class中为严格模式)，出错。所以函数中如果使用了this，一定要将this绑定到对象，否则在事件绑定时会丢失函数中this的指向。

以上是常见的四种方法，**通常建议在constructor中绑定或使用 class fields 语法来避免性能问题。在render中每次渲染都会绑定一次，有可能影响性能**
