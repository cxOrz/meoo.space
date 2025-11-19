---
slug: ai-garbled-characters
title: Codex 生成代码中文乱码
description: 在 Windows 使用 Codex / Gemini CLI 时，读取和生成代码时，遇到中文出现乱码，安装使用 PowerShell 7 以上的版本 + 配置 AI 提示，告诉它在文本输出前使用 'chcp 65001'。
keywords: [AI,codex,gemini]
authors: cxOrz
tags: [ai]
---

## 解决方式
- 使用 PowerShell 7 以上版本
- 配置 `AGENTS.md` / `GEMINI.md`，告诉 AI 如何避免中文乱码

### Gemini

GEMINI 的配置为 `GEMINI.md`，通常在 `C:\Users\YourName\.gemini` 文件夹下创建。

```markdown
## Gemini Added Memories
- Always use 'chcp 65001' before running shell commands that produce text output on Windows to ensure UTF-8 encoding and avoid garbled characters.

```

### Codex

CODEX 的配置为 `AGENTS.md`，需配置在使用的项目目录下。

```markdown
## Content input and output
- Always use 'chcp 65001' before running shell commands that produce text output on Windows to ensure UTF-8 encoding and avoid garbled characters.

```

其他 AI 工具处理方式也类似。