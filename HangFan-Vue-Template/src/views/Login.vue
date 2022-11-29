<template>
  <div class="login-container">
    <Atropos :alwaysActive="false" :activeOffset="100">
      <div class="login-form-container">
        <img
          data-atropos-offset="20"
          src="@/assets/logo.png"
          alt="logo"
          class="logo"
          style="margin-bottom: 30px"
        />
        <img
          src="@/assets/no-left.png"
          alt=""
          class="pass_img no-left"
          v-show="!passWord"
        />
        <img
          src="@/assets/password-right.png"
          alt=""
          class="pass_img pass-right"
          v-show="passWord"
        />
        <img
          src="@/assets/password-left.png"
          alt=""
          class="pass_img pass-left"
          v-show="passWord"
        />
        <img
          src="@/assets/no-right.png"
          alt=""
          class="pass_img no-right"
          v-show="!passWord"
        />
        <el-form
          ref="ruleFormRef"
          :model="userInfo"
          :rules="rules"
          class="login-form"
          label-position="left"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model.trim="userInfo.userName"
              class="login-form-input"
              clearable
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item class="login-form-password" label="密码" prop="userPwd">
            <el-input
              v-model="userInfo.userPwd"
              class="login-form-input"
              clearable
              show-password
              @blur="passWord = false"
              @focus="passWord = true"
              prefix-icon="View"
              type="password"
            />
          </el-form-item>

          <el-button
            data-atropos-offset="10"
            class="login-form-btn-login"
            type="primary"
            @click="handleLogin(ruleFormRef)"
            >登录
          </el-button>
        </el-form>
      </div>
    </Atropos>
    <div class="footer">
      Copyright © 2021-present Fanhang Zhang | 由HangFan-Vue驱动
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import storage from '@/utils/storage'
import { useUserStore } from '@/store/user'
import Atropos from 'atropos/vue'
const userStore = useUserStore()
const router = useRouter()
// 定义表单绑定的ref
const ruleFormRef = ref()
// 是否正在输入密码
let passWord = $ref(false)
// 用户信息
const userInfo = reactive({
  userName: 'admin',
  userPwd: '123456',
})
// 表单校验规则
const rules = $ref({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

// 登录逻辑
const handleLogin = (formEl) => {
  formEl.validate(async (valid) => {
    if (valid) {
      // 存储用户信息
      userStore.saveUserInfo({
        userName: 'admin',
        userEmail: 'admin@zfhblog.top',
      })
      //  保存登录状态
      storage.setItem('isLogin', true)
      router.push('/')
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d5a74;

  .login-form-container {
    position: relative;
    width: 500px;
    height: 400px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 0 10px 3px #c7c9cb4d;

    .pass_img {
      width: 100px;
      height: 100px;
      position: absolute;
      border-radius: 10px;
    }

    .pass_img.no-left,
    .pass_img.pass-left {
      left: 0;
      bottom: 0;
    }

    .pass_img.no-right,
    .pass_img.pass-right {
      right: 0;
      bottom: 0;
    }

    .logo {
      width: 100px;
      margin-top: 30px;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &-logo {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        margin-right: 10px;
      }

      &-input {
        width: 219px;
      }

      &-password {
        position: relative;
        left: 7px;
      }

      &-btn-login {
        margin-top: 20px;
        width: 70%;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 20px;
    font-size: 14px;
    color: #fff;
  }
}
</style>
