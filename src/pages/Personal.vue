<template>
  <div class="personal">
    <h2>个人中心</h2>
    <div class="main">
      <div class="user">{{ user.userName }}</div>
      <div class="personal_message">
        <p>姓名: {{ username }}</p>
        <p>工号: {{ usernumber }}</p>
        <p>部门: ***</p>
        <p>职位: ***</p>
        <p>密码: <span @click="showChangePassword = true">修改</span> </p>
      </div>
      <div class="change_password" v-if="showChangePassword">
        <div class="title">
          <p>修改密码</p>
          <img :src="icon_close" alt="" @click="closeForm" />
        </div>
        <a-form :model="changePasword" @finish="onSubmit" hideRequiredMark>
          <template v-for="item in formState">
            <a-form-item :name="item.name" :label="item.label" :rules="item.rules">
              <a-input v-model:value="(changePasword as any)[item.name]" :placeholder="item.placeholder"
                :type="item.isSeeWord ? 'text' : 'password'">
                <template #prefix>
                  <img v-if="!item.isSeeWord" @click="item.isSeeWord = !item.isSeeWord" :src="icon_close_eyes" alt="">
                  <img v-else @click="item.isSeeWord = !item.isSeeWord" :src="icon_see_word" alt="">
                </template>
              </a-input>
            </a-form-item>
          </template>
          <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="isSubmit">确认</a-button>
            <a-button class="cancel" @click="closeForm">取消</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import icon_close from '@/assets/icon_close.png'
import icon_close_eyes from '@/assets/icon_close_eyes.png'
import icon_see_word from '@/assets/icon_see_word.png'
import useUser from '@/store/user';
import { message } from 'ant-design-vue';
import { CHANGE_PASSWORD, USER_LOGIN_OUT, USER_INFO } from '@/http/api'
import request from '@/http'
interface ChangePassword {
  oldPassword: string
  newPassword: string
  newPassword2: string
}
const router = useRouter();
const user = useUser();
const showChangePassword = ref(false);
const username = ref('')
const usernumber = ref('')
const response: any = ref()
const isSubmit = ref(false)
const formState = reactive([
  {
    name: 'oldPassword',
    label: '原密码',
    rules: [{
      required: true,
      trigger: 'blur',
      message: '请输入旧密码',
    }],
    placeholder: '请输入原密码',
    isSeeWord: false
  },
  {
    name: 'newPassword',
    label: '新密码',
    rules: [{
      pattern: '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*.`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,18}$',
      message: '密码至少8-18位数，包含数字、字母和特殊符号',
    }, {
      required: true,
      message: '请输入新密码',
    }],
    placeholder: '8-18位含数字、字母和特殊符号的密码',
    isSeeWord: false
  },
  {
    name: 'newPassword2',
    label: '确认密码',
    rules: [{
      pattern: '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*.`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,18}$',
      message: '密码至少8-18位数，包含数字、字母和特殊符号',
    }, {
      required: true,
      message: '请输入新密码',
    }],
    placeholder: '再次输入新密码',
    isSeeWord: false
  }
])

user.changeUserName()
const changePasword = reactive<ChangePassword>({
  oldPassword: '',
  newPassword: '',
  newPassword2: ''
})

const closeForm = () => {
  showChangePassword.value = false;
  changePasword.oldPassword = ''
  changePasword.newPassword = ''
  changePasword.newPassword2 = ''
}
request
  .get({
    url: USER_INFO,
  }).then((res: any) => {
    response.value = res
    username.value = res.data.data.nickName
    usernumber.value = res.data.data.username
  })

const onSubmit = () => {
  isSubmit.value = true
  if (changePasword.newPassword !== changePasword.newPassword2) {
    message.error('两次输入的新密码不一致')
  } else {
    if (response.value.data.code === 200) {
      request.post({
        url: CHANGE_PASSWORD,
        data: {
          ...changePasword,
          username: response.value.data.data.username
        }
      }).then((res: any) => {
        if (res.data.code === 200) {
          message.success({
            content: '密码修改成功,3秒后将跳转到登录页面',
            class: 'recalculate-success',
            style: {
              marginTop: '50px',
            }
          })
          setTimeout(() => {
            request.post({
              url: USER_LOGIN_OUT
            }).then((res: any) => {
              if (res.data.code === 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('userName');
                localStorage.removeItem('nickName');
                router.push('/login')
              }
            })
          }, 3000)
        } else {
          message.error(res.data.message)
        }
        isSubmit.value = false
      })
    }
  }
}
</script>

<style scoped lang='less'>
.personal {
  padding: 40px 30px;

  h2 {
    font-size: 14px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #191B28;
    line-height: 20px;
  }

  .main {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .user {
      text-align: center;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #4064F2;
      font-size: 18px;
      color: #fff;
      line-height: 80px;
    }

    .personal_message {
      display: flex;
      margin-top: 40px;
      margin-bottom: 80px;

      p {
        margin-right: 80px;

        span {
          color: #4064F2;
          cursor: pointer;
        }
      }
    }

    .change_password {
      transition: all 0.5s;
      width: 557px;
      box-shadow: 0px 4px 16px 0px rgba(228, 229, 236, 0.8);
      border-radius: 4px;
      border: 1px solid #E4E5EC;

      .title {
        position: relative;
        background: #F7F8FA;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #191B28;
        line-height: 44px;
        padding: 0 20px;

        img {
          position: absolute;
          width: 27px;
          height: 27px;
          cursor: pointer;
          right: 20px;
          top: 9px;
        }
      }

      :deep(.ant-form) {
        padding: 40px 80px 16px 66px;

        .ant-input-affix-wrapper {
          width: 320px;
          height: 36px;
          float: right;
          padding-right: 10px;
        }

        .ant-input-affix-wrapper:hover {
          border-color: #4064F2;
        }

        .ant-input-affix-wrapper-focused {
          border-color: #4064F2;
        }

        .ant-form-item-label {
          width: 72px;
        }

        .ant-input-prefix {
          img {
            width: 20px;
            height: 20px;
          }

          cursor: pointer;
          position: absolute;
          z-index: 999;
          right: 3px;
          top: 7px;
          // right: 10px;
        }

        .ant-form-item-explain-error {
          margin-left: 16px;
          font-size: 12px;
        }

        .ant-btn-primary {
          margin-left: 89px;
        }

        .cancel {
          border: none;
          width: 60px;
          height: 32px;
          background: #F2F3F5;
          border-radius: 2px;
          margin-left: 10px;
          font-family: MicrosoftYaHei;
          color: #6F738D;
        }
      }
    }
  }
}
</style>

<style lang="less">
.recalculate-success {
  .ant-message-notice-content {
    background-color: rgba(64, 100, 242, .08);
    border-radius: 4px;
  }

  .anticon {
    color: #4064F2;
  }
}
</style>

