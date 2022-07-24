<template>
  <div>
    <!-- 使用定义的数据仓库取值 -->
    <h1>store count : {{ store.g_count }}</h1>
    <!--  修改store中的值，这样是响应式的，修改了值上面的h1中也会同步修改。  -->
    <button @click="handleClick">count++</button>
    <button @click="handleClickPatch"> patch count +5</button>
    <!--  引入结构出的值，看响应式和非响应式的写法  -->
    <h1>响应式取值{{ g_obj.count }}</h1>
    <button @click="handleClick1">count++</button>
    <button @click="handleClickPatch1"> patch count +10</button>
    <button @click="handleState">替换state</button>
    <button @click="resetState">重置store</button>
    <h1> 两个count的和: {{ store.sumCount }} | {{ sumCount }} </h1>
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

// 结构 store ，这样是响应式的。结构使用也是可以的
let {g_obj, sumCount} = storeToRefs(store)

// 对于响应式的结构，可以使用 x.value 的形式获取其值。这样就可以响应式的修改
function handleClick1() {
  if (g_obj.value.count > 15) {
    g_obj.value = {count: 10}
    return
  }
  g_obj.value.count++
}

// 直接修改 state, 使用 $patch。 这样可以方便的在同一次渲染中修改多个值
function handleClickPatch() {
  store.$patch({
    g_count: store.g_count + 5
  })
}

// 使用回调函数修改 store
function handleClickPatch1() {
  store.$patch((state) => {
    state.g_count += 10
    state.g_obj.count += 10
  })
}

// 替换 state
function handleState() {
  store.$state = {
    g_count: 100,
    g_obj: {count: 100},
  }
}

// 重置 state， 使用这个函数可以把 store 中的值设置成我们在 store中声明的值
function resetState() {
  store.$reset()
}

// 监听
store.$subscribe((mutation, state) => {
  function printEvents(event) {
    console.log(
        event.oldValue,
        event.newValue,
        // 变化的对象中的键
        event.key,
        // 变化的对象
        event.target,
        // 从对象中用键取到的是旧值
        event.target[event.key]
    )
  }

  // mutation 中 多个会是数组
  if (Array.isArray(mutation.events)) {
    for (const event of mutation.events) {
      printEvents(event)
    }
  } else {
    const event = mutation.events
    printEvents(event)
  }
  console.log('mutation： ', mutation)
  console.log('state: ', state)
})

</script>

<style scoped>

</style>