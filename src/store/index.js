import {defineStore} from 'pinia'


// 导出一个全局store id=main
export default defineStore('main', {
  state: () => {
    // 导出一个属性
    return {
      g_count: 10,
      g_obj: {
        count: 10,
      },
      time: 0,
    }
  },
  // 使用getter可以做计算属性
  getters: {
    sumCount: state => {
      return state.g_count + state.g_obj.count
    }
  },
  // 同步或者异步的方法都可以声明
  actions: {
    // 这里的函数也可以直接声明 async 的
    getTime() {
      // 从国家授时中心获取当前时间
      return fetch('https://www.tsa.cn/api/time/getCurrentTime')
        .then(resp => {
          if (resp.ok) {
            console.log(resp.body)
            return resp.json()
          }
        }).then(json => {
          console.log('get time ok : ', json)
          // 刷新 state中的时间
          this.time = json || 0
          // 返回时间
          return json
        }).catch(err => console.error(err))
    }
  }
})
