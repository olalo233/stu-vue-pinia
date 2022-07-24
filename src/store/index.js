import {defineStore} from 'pinia'


// 导出一个全局store id=main
export default defineStore('main', {
  state: () => {
    // 导出一个属性
    return {
      g_count: 10,
      g_obj: {
        count: 10,
      }
    }
  },
  // 使用getter可以做计算属性
  getters: {
    sumCount: state => {
      return state.g_count + state.g_obj.count
    }
  }
})
