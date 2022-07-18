import { defineStore } from 'pinia'

const useStore = defineStore('store', {
  state: () => ({
    count: 1,
    name: 'haha',
  }),
  /* 方法 actions 要写在getters前，否则将读取不到actions内的方法 */
  actions: {
    addCount() {
      this.count++
    }
  },
  /* 计算属性 */
  getters: {
    doubleCount: (state) => state.count * 2,
    countTo: (state) => ((num: number): number => {
      return state.count * num
    })
  },
})

export default useStore