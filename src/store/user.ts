import { defineStore } from "pinia";
import { Base64 } from "js-base64";
const useUser = defineStore("user", {
  state: () => ({
    allUser: [
      Base64.encode("超级管理员"),
      Base64.encode("查询员"),
      Base64.encode("维护员"),
    ],
    canModifyUser: [Base64.encode("超级管理员"), Base64.encode("维护员")],
    canSeeChartUser: [Base64.encode("超级管理员"), Base64.encode("查询员")],
    // canSeeBomUser: [Base64.encode('超级管理员'),Base64.encode('查询员')]
    userName: '',
  }),
  actions: {
    changeUserName() {
      this.userName = localStorage.getItem("userName")
        ? Base64.decode(`${localStorage.getItem("userName")}`)
        : Base64.decode(`${localStorage.getItem("nickName")}`);
      if (
        !this.allUser.includes(`${localStorage.getItem("nickName")}`) &&
        !localStorage.getItem("userName")
      ) {
        if (this.userName.length > 2) {
          this.userName = this.userName.slice(-2);
        }
      }
    },
  },
});

export default useUser;
