---
title: 外观模式 (Facade)
slug: facade 
sidebar_position: 9
---

## 概念

外观模式，是结构型设计模式，为程序库、框架或者其他复杂类提供一个简单的接口。

- 你可以让自己的代码独立于复杂子系统。
- 外观可能成为与程序中所有类都耦合的上帝对象。

在现实生活中，就像电话订餐服务，你只需要给餐厅打电话，服务员会根据你的要求，进行下单、分派到后厨、记账、打包、派送，一系列复杂的操作是对客户隐藏的，客户不需要知道这么多，只需要告诉她你要吃什么。

## 示例

播放一个视频文件十分复杂，用到很多类，对文件解码、提取音频、计算比特率等等，在每个需要播放视频的地方，如果每个地方都用这么多代码，实在是太复杂了，代码也显得难看。比较好的办法，就是把播放功能的这些逻辑代码都写在一个外观类里，到的时候只需要用外观类就可以了。

```ts
class VideoFile {
  constructor(path: string) {}
  // ...
}
class BitrateCalc {
  // ...
}
class AudioExtract {
  constructor(path: VideoFile) {}
  // ...
}
class MPEGDecoder {
  constructor(path: VideoFile) {}
  // ...
}

// 为了将框架的复杂性隐藏在一个简单接口背后，我们创建了一个外观类，它是在
// 功能性和简洁性之间做出的权衡
class VideoPlayer {
  play(filePath: string) {
    const file = new VideoFile(filePath);
    console.log(new BitrateCalc());
    new AudioExtract(file);
    new MPEGDecoder(file);
    // ...
    // 一堆复杂的处理，播放视频文件
  }
}

function ClientCode(filePath: string) {
  // 只要调用外观类封装好的方法
  new VideoPlayer().play(filePath);
}
```