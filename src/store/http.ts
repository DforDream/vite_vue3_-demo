import { defineStore } from 'pinia';
const useHttp = defineStore('http', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    changeIsLoading(bol: boolean) {
      this.isLoading = bol
    }
  }
})

export default useHttp;