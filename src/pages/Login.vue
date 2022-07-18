<template>
  <div class="login">
    <div class="left">
      <a-image width="720px" height="900px" :src="loginImg" :preview="false" />
    </div>
    <div class="mian">
      <div class="logo">
        <a-image :src="logo" width="226px" height="40px" :preview="false"></a-image>
      </div>
      <a-form :model="userState" @finish="onSubmit">
        <a-form-item name="username" :rules="[{ required: true, message: '用户名不能为空' }]">
          <a-input placeholder="请输入工号" v-model:value="userState.username">
            <template #prefix>
              <a-image width="18px" height="18px" :preview="false" :src="icon_user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '密码不能为空' }]">
          <a-input-password placeholder="请输入密码" v-model:value="userState.password" :visibilityToggle="false">
            <template #prefix>
              <a-image width="18px" height="18px" :preview="false" :src="icon_password" />
            </template>
          </a-input-password>
        </a-form-item>
        <!-- <a-form-item>
          <a-input placeholder="请输入验证码" class="verification_input">
            <template #prefix>
              <a-image width="18px" height="18px" :preview="false" :src="icon_verification" />
            </template>
          </a-input>
          <div class="verification"></div>
        </a-form-item> -->
        <a-form-item>
          <a-button block type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import loginImg from "@/assets/login.png";
import logo from "@/assets/logo.png";
import icon_user from "@/assets/icon_user.png";
import icon_password from "@/assets/icon_password.png";
// import icon_verification from "@/assets/icon_verification.png";
import { USER_LOGIN, USER_INFO } from "@/http/api";
import request from "@/http";
import { message } from "ant-design-vue";
import { Base64 } from 'js-base64'
import useUser from '@/store/user';

interface User {
  username: string;
  password: string;
}

const userState = reactive<User>({
  username: "",
  password: "",
});
const user = useUser()

const router = useRouter();
const onSubmit = () => {
  request
    .post({
      url: USER_LOGIN,
      data: userState,
    })
    .then((res: any) => {
      if (res.data.code === 200) {
        localStorage.setItem(
          "token",
          res.data.data.tokenHead + res.data.data.token
        );
        request
          .get({
            url: USER_INFO,
          })
          .then((res: any) => {
            if (res.data.code === 200) {
              localStorage.setItem("user", Base64.encode(res.data.data.roles));
              if (user.allUser.includes(`${Base64.encode(res.data.data.nickName)}`)) {
                localStorage.setItem("userName", Base64.encode(res.data.data.username));
                message.success({
                  content: "登录成功 " + res.data.data.roles,
                  style: {
                    marginTop: '150px'
                  }
                });
              } else {
                localStorage.setItem("nickName", Base64.encode(res.data.data.nickName));
                message.success({
                  content: "登录成功 " + res.data.data.roles + " " + res.data.data.nickName,
                  style: {
                    marginTop: '150px'
                  }
                });
              }
              router.push("/");
              userState.username = "";
              userState.password = "";
            }
          });
      } else {
        message.error(res.data.message);
      }
    });
};
</script>

<style scoped lang="less">
.login {
  display: flex;
  width: 100%;
  height: 100%;
  background: #f2f3f5;
  overflow: hidden;

  .left {
    flex: 1;
    // min-width: 720px;
    position: relative;
    display: flex;
    justify-content: center;

    :deep(.ant-image) {
      display: flex;
      align-content: center;
    }
  }

  .mian {
    min-width: 480px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      :deep(.ant-image) {
        margin-top: 224px;
      }
    }

    :deep(.ant-form) {
      width: 320px;
      margin-top: 41px;

      .ant-form-item {
        height: 40px;
        margin-bottom: 20px;

        .ant-image {
          margin-top: -8px;
          margin-right: 10px;
          padding: 0;
        }

        .ant-input-affix-wrapper {
          padding: 0;
          padding-left: 15px;

          &:hover {
            border-color: #4064F2;
          }
        }

        .ant-input-affix-wrapper-focused {
          border-color: #4064F2;
        }

        .ant-input {
          padding: 0;
          height: 38px;

          &::placeholder {
            color: #adb1c7;
          }
        }

        .verification_input {
          width: 218px;
          vertical-align: middle;
        }

        .verification {
          margin-left: 10px;
          display: inline-block;
          vertical-align: middle;
          width: 92px;
          height: 42px;
          background: #f2f3f5;
        }

        .ant-btn {
          height: 40px;
          font-size: 14px;
          font-family: "MicrosoftYaHei";
        }

        .ant-form-item-explain-error {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
