<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <a-image width="220px" height="60px" :src="home_logo" :preview="false" />
      </div>
      <a-menu mode="horizontal" @click="goToPage" :selectedKeys="tabrouter.route">
        <a-menu-item key="/query_material">物料查询</a-menu-item>
        <a-menu-item key="/query_bom">BOM查询</a-menu-item>
        <a-menu-item key="/management">后台管理</a-menu-item>
      </a-menu>
      <div class="right">
        <a-image :src="notice" width="18px" height="18px" :preview="false"></a-image>
        <a-popover trigger="click" placement="bottomLeft">
          <template #content>
            <p @click="toPersonal">个人中心</p>
            <p class="login_out" @click="loginOut">退出</p>
          </template>
          <div class="user">{{ user.userName }}</div>
        </a-popover>
      </div>
    </div>
    <div class="mian">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import home_logo from "@/assets/home_logo.png";
import notice from "@/assets/notice.png";
import { MenuProps, message } from "ant-design-vue";
import useTabRouter from '@/store/tabrouter';
import request from '@/http';
import { USER_LOGIN_OUT } from '@/http/api'
import useUser from '@/store/user';

const router = useRouter();
const tabrouter = useTabRouter();
const user = useUser();

user.changeUserName()
tabrouter.route = [`${router.currentRoute.value.fullPath}`]
const goToPage: MenuProps["onClick"] = ({ key }) => {
  tabrouter.route = [`${key}`]
  router.push(`${key}`)
};
const toPersonal = () => {
  router.push('/personal')
}
const loginOut = () => {
  request.post({
    url: USER_LOGIN_OUT
  }).then((res: any) => {
    if (res.data.code === 200) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('nickName');
      message.success('退出成功')
      router.push('/login')
    }
  })
}
</script>

<style scoped lang="less">
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 1px 8px 0px #e4e5ec;
    min-width: 1200px;

    .logo {
      :deep(.ant-image) {
        cursor: pointer;
        min-width: 220px;
      }
    }

    :deep(.ant-menu) {
      line-height: 60px;

      .ant-menu-item:hover {
        &::after {
          border-bottom-color: #4064F2;
        }

        .ant-menu-title-content {
          color: #4064F2 !important;
        }
      }

      // transform: translateX(-50%);
      .ant-menu-item-selected {
        color: #4064F2;

        &::after {
          border-bottom-color: #4064F2;
        }
      }
    }

    .right {
      align-self: center;

      :deep(.ant-image) {
        cursor: pointer;
        margin-right: 26px;
        vertical-align: middle;
      }

      .user {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        width: 36px;
        height: 36px;
        background: #4064F2;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 36px;
        font-family: "MicrosoftYaHei";
        margin-right: 20px;
      }
    }
  }

  .mian {
    flex: 1;
    min-width: 1200px;
    overflow: hidden;
  }
}
</style>

<style lang="less">
.ant-popover {
  .ant-popover-inner-content {
    padding: 0;
  }
  .ant-popover-arrow {
    display: none;
  }
  p {
    cursor: pointer;
    font-family: 'MicrosoftYaHei';
    padding: 0 30px;
    text-align: center;
    line-height: 40px;
    color: #191B28;
    &:hover {
      background: #F7F8FA;
      color: #4064F2;
    }
  }
}
</style>
