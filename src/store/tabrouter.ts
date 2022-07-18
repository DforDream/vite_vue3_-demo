import { defineStore } from 'pinia';

const route:string[] = [];
const useTabRouter = defineStore('tabrouter', {
  state: () => ({
    route,
  })
})

export default useTabRouter;