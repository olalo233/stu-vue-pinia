<template>
  <div>
    <!-- 使用定义的数据仓库取值 -->
    <h1>store count : {{ store.g_count }}</h1>
    <!--  修改store中的值，这样是响应式的，修改了值上面的h1中也会同步修改。  -->
    <button @click="handleClick">count++</button>
    <!--  引入结构出的值，看响应式和非响应式的写法  -->
    <h1>响应式取值{{ g_obj.count }}</h1>
    <button @click="handleClick1">count++</button>
  </div>
</template>

<script lang="ts" setup>
// 导入定义的数据仓库
import useMainStore from '../store/index'
import {storeToRefs} from 'pinia';

const store = useMainStore()

// 声明点击加1函数
function handleClick() {
  store.g_count++
}

// 解构 store， 这样是非响应式的。其值会一直位置我们取出的值
// let {g_count} = store

// 结构 store ，这样是响应式的。
let {g_obj} = storeToRefs(store)

// 对于响应式的结构，可以使用 x.value 的形式获取其值。这样就可以响应式的修改
function handleClick1() {
  if (g_obj.value.count > 15) {
    g_obj.value = {count: 10}
    return
  }
  g_obj.value.count++
}
</script>

<style scoped>

</style>