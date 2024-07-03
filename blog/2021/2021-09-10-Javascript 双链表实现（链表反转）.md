---
slug: js-linkedlist
title: Javascript 双链表实现
authors: cxOrz
tags: [js]
---

大致思路就是一个个结点操作，交换前后指针的指向，交换 previous 和 next 。

<!--truncate-->

## 代码
```javascript
// 定义结点
class NNode {
  constructor(e) {
    this.element = e
    this.next = null
    this.previous = null
  }
}

// 定义链表
class LinkedList {
  constructor(e) {
    this.head = new NNode(e)
  }
  find (item) {
    let currNode = this.head
    // 也需要判断undefined，以防查无此项
    while (currNode.element != item && currNode) {
      currNode = currNode.next
    }
    return currNode
  }
  insert (element, item) {
    const newNode = new NNode(element)
    const curr = this.find(item)
    newNode.previous = curr
    newNode.next = curr.next
    curr.next = newNode
  }
  remove (item) {
    let curr = this.find(item)
    curr.previous.next = curr.next
    curr.next.previous = curr.previous
    curr = null
  }
  findLast () {
    let curr = this.head
    while (curr.next) {
      curr = curr.next
    }
    return curr
  }
  // 链表反转
  reverse () {
    let curr = this.head
    // 使用 curr 对每一个结点操作
    while (curr) {
      let tmpPrev = curr.previous
      curr.previous = curr.next
      curr.next = tmpPrev

      this.head = curr 
      // 头结点始终设置最前面节点，如果不加这步，结束循环后无法得到头结点的引用。
      // 除非另加if判断到了最后一次循环，把curr赋值给外部变量，循环结束也不会丢失
      curr = curr.previous 
      // 向前移动一个结点。例如刚操作完 A，现在是B-A C-D-E，现在把curr移动到B，准备操作B
      // 下次循环后将变成 C-B-A D-E
    }
    return this.head
  }

  display () {
    let curr = this.head
    while (curr) {
      console.log(curr.element)
      curr = curr.next
    }
  }
}
```

## 测试
```javascript
const la = new LinkedList('A')
la.insert('B', 'A')
la.insert('C', 'B')
la.insert('D', 'C')
la.insert('E', 'D')
la.reverse() // 反转
la.display() // 输出 E D C B A
```
