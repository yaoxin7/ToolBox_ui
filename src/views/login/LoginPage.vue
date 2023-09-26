<script setup>
import { ref, watch } from 'vue'
import { Link } from '@element-plus/icons-vue'
import { loginServer, registerServer } from '../../api/user.js'
import useUserStore from "../../store/modules/userStore.js";
import router from "../../router/index.js";

const userStore = useUserStore()


// 登录&注册
const isLogin = ref(true)

watch(isLogin, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

const formRef = ref() /*表单对象*/
// 登录表单
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 校验
const rule = {
  username: [
    {required: true, message: '用户名不能为空', trigger: 'blur'},
    {min: 5, max: 10, message: '用户名必须为5-10为的字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'},
    {
      validator: (rule, value, callback) => {
        if (value === formModel.value) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  repassword: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'},
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}


// 登录按钮
const onLogin = async () => {
  await formRef.value.validate()
  const res = await loginServer(formModel.value)
  userStore.setToken(res.data.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}

// 注册按钮
const onReg = async () => {
  await formRef.value.validate()
  await registerServer(formModel.value)
  ElMessage.success('注册成功')
  isLogin.value = true
}
</script>

<template>
  <div class="login_base">
    <div class="box">
<!--      logo-->
      <div class="logo">
        <img src="../../assets/vite.svg" alt="">
      </div>

<!--      标题-->
      <div v-if="isLogin" class="span">登录 Tool Box</div>
      <div v-else class="span">注册 Tool Box</div>

<!--      登录表单-->
      <transition mode="out-in">
        <div v-if="isLogin" class="form" :style="{boxShadow: 'var(--el-box-shadow-lighter)'}">
          <el-form
              ref="formRef"
              size="large"
              :model="formModel"
              :rules="rule"
              label-position="top" >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formModel.username" @keydown.enter="onLogin" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" @keydown.enter="onLogin" prop="password">
              <el-input type="password" v-model="formModel.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" @click="onLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <!--      注册表单-->
        <div v-else class="form" :style="{boxShadow: 'var(--el-box-shadow-lighter)'}">
          <el-form
              ref="formRef"
              size="large"
              :model="formModel"
              :rules="rule"
              label-position="top" >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formModel.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="formModel.password" @keydown.enter="onReg" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
              <el-input type="password" v-model="formModel.repassword" @keydown.enter="onReg" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" @click="onReg">
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>

<!--      切换登录&注册-->
      <div class="reg" :style="{boxShadow: 'var(--el-box-shadow-lighter)'}">
        <el-link v-if="isLogin" @click="isLogin = false" :icon="Link" :underline="false">前往注册</el-link>
        <el-link v-else @click="isLogin = true" :icon="Link" :underline="false">前往登录</el-link>
      </div>
    </div>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.login_base {
  width: 100vw;
  height: 100vh;
}
.box {
  margin: 0 auto;
  width: 400px;
}
.box > .span {
  text-align: center;
  font-size: 25px;
}
.box > .logo {
  height: 100px;
  display: flex;
}
.box > .logo > img {
  margin: auto;
  height: 50%;
}
.box > .form, .reg{
  margin-top: 20px;
  padding: 20px;
  border-radius: 7px;
}
.box > .reg {

  text-align: center;
}

/* 适应手机设备 */
@media screen and (max-width: 500px) {
  .box {
    width: 90%;
  }
}
</style>