---
title: 迭代器模式 (Iterator)
slug: iterator
sidebar_position: 10
---

## 概念

迭代器模式是一种行为设计模式，可以在不暴露集合底层表现形式（列表、栈和树等）的情况下遍历集合中所有的元素。

- 单一职责原则。通过将体积庞大的遍历算法代码抽取为独立的类，可对客户端代码和集合进行整理。
- 开闭原则。可实现新型的集合和迭代器并将其传递给现有代码，无需修改现有代码。
- 可以并行遍历同一集合，因为每个迭代器对象都包含其自身的遍历状态。
- 可以暂停遍历并在需要时继续。
- 如果你的程序只与简单的集合进行交互，应用该模式可能会矫枉过正。
- 对于某些集合，使用迭代器可能比直接遍历的效率低。

## 示例

举例说明，以下代码对微信好友进行遍历。定义了两个接口 SocialNetwork、ProfileIterator<T\> 和两个类 Wechat、WechatIterator。

Wechat 类要实现 SocialNetwork 接口，来实现创建微信迭代器的工厂方法，并储存好友列表、提供增加好友和获取好友的方法。

WeChatIterator 类要实现 ProfileIterator<T\> 接口，来实现一些具体的微信迭代器方法，用来迭代好友列表。

```ts
// 声明用于生成迭代器的工厂方法
interface SocialNetwork {
  createFriendsIterator(): ProfileIterator<string | null>;
}

// 声明迭代器接口
interface ProfileIterator<T> {
  // 返回当前项，并向后移一位
  next(): T;
  // 返回当前项
  current(): T;
}

// 实现生成迭代器的工厂方法，和一些 Wechat 类自有的方法
class Wechat implements SocialNetwork {
  private friendList: string[] = [];

  createFriendsIterator(): ProfileIterator<string | null> {
    // 迭代器指向本实例
    return new WeChatIterator(this);
  }

  public addFriend(friend: string) {
    this.friendList.push(friend);
  }

  public getFriendList() {
    return this.friendList;
  }
}

// 实现具体的微信好友迭代器类
class WeChatIterator implements ProfileIterator<string | null> {
  private wechat: Wechat; // 微信实例
  private position = 0; // 记录当前迭代到的位置

  constructor(weChat: Wechat) {
    this.wechat = weChat;
  }

  // 返回当前项，并后移一位；若已经遍历完，没有数据了，返回 null
  next(): string | null {
    return this.wechat.getFriendList()[this.position++] || null;
  }

  current(): string {
    return this.wechat.getFriendList()[this.position];
  }
}

const wechat = new Wechat();
wechat.addFriend('Lee');
wechat.addFriend('Tom');
wechat.addFriend('Bella');

const iterator = wechat.createFriendsIterator();

let curr;
while ((curr = iterator.next())) {
  console.log(curr);
}
```

输出：
```
Lee
Tom
Bella
```