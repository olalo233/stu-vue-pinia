<template>
  <div>
    <!-- 使用定义的数据仓库取值 -->
    <h1>store count : {{ store.g_count }}</h1>
    <!--  修改store中的值，这样是响应式的，修改了值上面的h1中也会同步修改。  -->
    <button @click="handleClick">count++</button>
    <!--  引入结构出的值，看响应式和非响应式的写法  -->
    <h1>响应式取值{{ g_count }}</h1>
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
let {g_count} = storeToRefs(store)
</script>

<style scoped>

</style>