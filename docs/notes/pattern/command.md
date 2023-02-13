---
title: 命令模式 (Command)
slug: command
sidebar_position: 11
---

## 概念

命令模式是一种行为设计模式，它可将请求转换为一个包含与请求相关的所有信息的独立对象。该转换让你能根据不同的请求将方法参数化、延迟请求执行或将其放入队列中，且能实现可撤销操作。

- 单一职责原则。可以解耦**触发**和**执行**操作的类。
- 开闭原则。可以在不修改已有客户端代码的情况下在程序中创建新的命令。
- 可以实现撤销和恢复功能。
- 可以实现操作的延迟执行。
- 可以将一组简单命令组合成一个复杂命令。
- 代码可能会变得更加复杂，因为在发送者和接收者之间增加了一个全新的层次。

## 示例

下面的示例模拟了一个应用，点击按钮，复制文本到剪贴板的场景：

Command 是抽象命令类，基于该类派生出 CopyCommand 具体类，用于执行复制操作。Application 是发送者类，将复制命令发送给 Button 接收者类，由他执行命令。

```ts
// 抽象命令类
abstract class Command {
  protected editor: Editor;
  protected app: Application;

  constructor(editor: Editor, app: Application) {
    this.editor = editor;
    this.app = app;
  }

  // 抽象执行方法
  abstract execute(): void;
}

// 具体复制命令类，继承了抽象命令类，一定要调用 super 构造器
class CopyCommand extends Command {
  constructor(editor: Editor, app: Application) {
    super(editor, app);
  }

  // 实现执行复制的方法
  public execute(): void {
    const text = this.editor.getSelection();
    this.app.setClipboard(text);
  }
}

// 编辑器类，可以添加、选取、删除文本
class Editor {
  private text: string = '';

  public getSelection(start?: number, stop?: number) {
    return this.text.slice(start, stop);
  }

  public addText(text: string) {
    this.text += text;
  }

  public deleteText(start?: number, stop?: number) {
    this.text.replace(this.text.slice(start, stop), '');
  }
}

// 按钮类（接收者），可以设置、执行命令
class Button {
  private command?: Command;

  public setCommand(command: Command) {
    this.command = command;
  }

  public onClick() {
    this.command?.execute();
  }
}

// 应用类（发送者），将命令委派给接收者 Button 执行
class Application {
  private clipboard: string;
  private button: Button;
  private editor: Editor;

  // 初始化剪贴板、编辑区、按钮
  constructor() {
    this.clipboard = '';
    this.button = new Button();
    this.editor = new Editor();
    this.button.setCommand(new CopyCommand(this.editor, this));
  }

  // 向编辑器中写入文本
  public WriteSomethingInEditor(text: string) {
    this.editor.addText(text);
  }

  // 设置剪贴板内容
  public setClipboard(text: string) {
    this.clipboard = text;
  }

  // 获取剪贴板内容
  public getClipboard() {
    return this.clipboard;
  }

  // 复制按钮点击事件，将设置编辑器中所选文本到剪贴板
  public clickCopy() {
    this.button.onClick();
  }
}

const app = new Application();
// 向编辑框写入文本
app.WriteSomethingInEditor('Something.');
// 点击复制按钮
app.clickCopy();
// 获取剪贴板内容
console.log(app.getClipboard()); // Something.
```