---
slug: vue3-readonly
title: Vue3 之 readonly
authors: cxOrz
tags: [vue]
---

## readonly

>取得一个对象（反应性或普通）或ref并返回一个只读代理。访问的任何嵌套属性也将是只读的。  
传入普通对象等返回只读代理。  
传入普通数值或字符串不能变成只读，例如 readonly('abc')

<!--truncate-->

```javascript
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 反应性跟踪
  console.log(copy.count)
})

// 改变 original 会触发观察copy的watcher执行其函数回调
original.count++

// 改变 copy 将会失败并且在控制台返回一个警告
copy.count++ // warning!
```

## readonly 在 Provide/inject 中的使用

示例代码：
```html
<!--Book.vue-->
<template>
</template>

<script>
import { provide, reactive, readonly, ref } from "vue";
import MyBook from "./MyBook.vue";
export default {
  components: { MyBook },
  name: "Book",
  setup(props) {
    const readers = ref(0);
    const location = reactive({
      longitude: 153,
      latitude: 8,
    });
    const updatelocation = () => {
      location.longitude = 123;
      location.latitude = 456;
    };
    provide("readers", readonly(readers));//readers设为只读
    provide("updatelocation", updatelocation);
    provide("location", readonly(location));//location设为只读
    return { readers, location ,updatelocation};
  }
};
</script>

<style>
</style>
```

```html
<!--MyBook.vue-->
<template>
<div>
  <button @click="test">test</button>
<!--直接用test函数修改来自父组件的readers，控制台出现警告 -->
  <button @click="updatelocation">updatelocation</button>
<!-- 调用来自父组件的updatelocation,修改location对象，允许修改，无警告-->
</div>
</template>
<script>
import { inject} from 'vue';
export default {
    name:'MyBook',
    setup()
    {
        const readers=inject('readers');
        const updatelocation=inject('updatelocation');
        return{updatelocation,readers}
    },
    methods:
    {
        test()
        {
            this.readers=66;//直接修改来自父组件注入的readers，控制台出现警告
        }
    }
}
</script>

<style>
</style>
```

综上：

在调用父组件方法修改readonly的对象时，没问题。

直接在子组件修改父组件对象就会出现警告。
