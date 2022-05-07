---
slug: java-constructor
title: java构造方法用private和public修饰的区别
authors: mcx
tags: [Java, 笔记, 大一]
---

## 示例代码：

> 在这里用private修饰无参数的构造器，用public修饰有参数的构造器。
<!--truncate-->
```java
public class test4
{
    public static void main(String[] args)
    {
        Employee4 employee4=new Employee4();
        Employee4 employee41=new Employee4("132",1);
    }
}
class Employee4
{
    int num;
    String name;
    public Employee4(String n,int nm)
    {
        this.name=n;
        this.num=nm;
    }
    private Employee4(){}
    void method()
    {
        Employee4 e=new Employee4();
    }
}
```
## 分析：

### 用public修饰

用**public**修饰构造器，可以在**其他类**构造该类的对象。

> 在test4类，用Employee4的public构造器成功构造了Employee4类对象。

```java
public class test4
{
    public static void main(String[] args)
    {
        Employee4 employee4=new Employee4();//private修饰的，想在test4类构造一个对象会出错
        Employee4 employee41=new Employee4("132",1);//public修饰的，合法
    }
}
```
### 用private修饰

用**private**修饰的构造器，在**其他类**构造对象时会报错

> 在test4类中用Employee4的private构造器构造一个Employee4类对象，出现了错误。

![在这里插入图片描述](https://img-blog.csdnimg.cn/201912022005265.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)
但是，在自己的类里可以构造：

> Employee4的method方法中，用private修饰的无参构造器，成功构造了该类的对象。

```java
class Employee4
{
    int num;
    String name;
    public Employee4(String n,int m)
    {
        this.name=n;
        this.num=m;
    }
    private Employee4(){}
    void method()
    {
        Employee4 e=new Employee4();
    }
}
```
## 总结：

public允许任何其他类的访问，private只能自己类访问。
