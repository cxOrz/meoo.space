---
slug: jtable-edit-cell
title: JavaSwing修改JTable单元格数据
authors: mcx
tags: [Java, 大一]
---

网上看了好多教程都好复杂，用到DefaultTableModel类

`DefaultTableModel model =(DefaultTableModel) table.getModel();`

在用到这句类型转换的时候我遇到了异常，又在网上查各种其他的教程最终都嫌太麻烦或者自己不会搞而放弃，最后自己试着用代码补全看看JTable类有哪些方法找到了解决方案。如下：

`public void setValueAt(Object aValue,int row,int column)`

```java
    table.setValueAt("666",2,3);//修改第3行，第4列为666
    table.repaint();
```

简单的两行解决了修改单元格数据的问题。修改，再重绘就完了！
