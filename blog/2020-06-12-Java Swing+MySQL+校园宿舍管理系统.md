---
slug: swing-mysql-domitorymanage
title: JavaSwing+MySQL+校园宿舍管理系统
authors: mcx
tags: [Java, 大一]
---

## 设计与实现

校园宿舍管理系统主要分为三类用户，**系统管理员**、**宿舍管理员**和**学生**。主要功能需求如下。

**系统管理员功能需求**：

（1）宿舍管理员管理：能够添加管理员用户、删除管理员用户信息、查找管理员信息、修改管理员信息。

（2）学生信息管理：能够添加学生信息、删除学生信息、查找学生信息、修改学生信息。

（3）宿舍楼信息管理：能够添加宿舍楼信息、删除宿舍楼信息、查找宿舍楼信息、修改宿舍楼信息。

（4）宿舍信息管理：能够添加宿舍信息、删除宿舍信息、查找宿舍信息、修改宿舍信息。

（5）学生住宿管理：能够给学生分配宿舍、能够给学生调换宿舍、能够删除学生住宿信息。

（6）学生缺寝管理：学生缺寝时，能够记录学生缺寝记录，如果缺寝信息有误，学生申诉后能够修改缺寝信息、删除缺寝信息、查询学生缺寝信息。

（8）系统登录退出：能够正常登陆、退出系统。

<!--truncate-->

**宿舍管理员功能需求**：

（1）学生缺寝管理：学生缺寝时，能够记录学生缺寝记录，如果缺寝信息有误，学生申诉后能够修改缺寝信息、删除缺寝信息、查询学生缺寝信息。

（2）系统登录退出：能够正常登陆、退出系统。

**学生功能需求**：

（1）能查看个人缺寝信息。

（2）能进行系统登录、退出。

**Mysql的表结构：**

apart表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613004218723.png)
admin表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613004240486.png)
building表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613004326693.png)
stu表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613004349267.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)

**图片展示:**

> 部分图片如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615175054837.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615175150992.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061517523228.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615175311635.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615175336155.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)

> 本项目使用了Github开源的swing主题WEBLAF，异步加载的话登录界面主题会乱掉，所以没有异步加载，需要先加载完主题才能显示出登陆界面，运行后需要等一两秒出现。

## 代码

[代码在此](https://github.com/cxOrz/cxOrz.github.io/releases/download/Java/JavaDepartment.zip)
