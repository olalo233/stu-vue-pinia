<template>
  <div>
    <!-- 使用定义的数据仓库取值 -->
    <h1>store count : {{ store.g_count }}</h1>
  </div>
</template>

<script lang="ts" setup>
// 导入定义的数据仓库
import useMainStore from '../store/index'

const store = useMainStore()

</script>

<style scoped>

</style>