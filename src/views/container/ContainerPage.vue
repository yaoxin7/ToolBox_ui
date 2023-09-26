<script setup>

import useUserinfoStore from "../../store/modules/useUserinfoStore.js";
import {ChatRound, Expand, House, Star, User, UserFilled} from '@element-plus/icons-vue'
import {logoutServer} from "../../api/user.js";
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from "vue";
import {ElMessage} from "element-plus";
import NavComp from "./nav/NavComp.vue";
import useUserStore from "../../store/modules/userStore";

const router = useRouter()
const userinfoStore = useUserinfoStore()
const userStroe = useUserStore()

// 获取当前页
const currentRoute = computed(() =>
  '/' + router.currentRoute.value.path.split('/')[1]
)
// 获取用户信息
const getUserInfo = async () => {
  await userinfoStore.refreshUserinfo()
}
getUserInfo()

// 退出登录
const logout = async () => {
  await logoutServer()
  userStroe.removeToken();
  ElMessage.success('已退出登录')
  router.push('/login')
}

// 头像下拉菜单
const onDropdownItem = (item) => {
  if (item === '退出登录') {
    logout()
  } else if (item == '个人信息') {
    router.push('/userinfo')
  }
}

// 判断电脑还是手机，窗口大小，来隐藏侧边栏
const isMobile = ref(false)
const hideAside = () => {
  isMobile.value = window.innerWidth < 768;
}
onMounted(() => {
  hideAside()
  window.addEventListener('resize', hideAside)
})

// 手机端侧边栏
const asideShow = ref(false)
</script>
<template>
  <div class="common-layout">
    <el-container class="main">
<!--      头部-->
      <el-header class="header_b" height="55px">
        <el-row class="header_bar" justify="space-around">
<!--          头部左侧-->
          <el-col :span="5">
            <div class="header_left">
              <el-button class="button"
                         v-if="isMobile"
                         @click="asideShow=true"
                         plain circle size="large"
                         :icon="Expand"></el-button>
              <div class="logo">
                <img src="../../assets/vite.svg" alt="">
              </div>
              <div class="title">ShareBuddy.com</div>
            </div>
          </el-col>
          <el-col :span="14">
<!--            头部右侧-->
            <el-row :gutter="20" justify="end" class="header_right">
              <el-col :span="4">
                <el-dropdown size="large" @command="onDropdownItem">
                  <el-avatar :icon="UserFilled" :src="userinfoStore.imageUrl" :size="40"></el-avatar>
                  <template #dropdown>
                    <el-dropdown-item command="个人信息">个人信息</el-dropdown-item>
                    <el-dropdown-item command="退出登录">退出登录</el-dropdown-item>
                    <el-dropdown-item command="设置">设置</el-dropdown-item>
                  </template>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
<!--        侧边栏-->
        <el-drawer
            v-if="isMobile"
            v-model="asideShow"
            size="70%"
            direction="ltr"
        >
          <NavComp :currentRoute="currentRoute"/>
        </el-drawer>

        <el-aside class="aside" v-else>
          <NavComp :currentRoute="currentRoute"/>
        </el-aside>
<!--        主要内容区域-->
        <el-main class="container_main">
          <router-view v-slot="{ Component }">
            <Transition mode="out-in">
              <keep-alive include="ArticlePage">
                <component :is="Component"></component>
              </keep-alive>
            </Transition>

          </router-view>
        </el-main>


      </el-container>
    </el-container>
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

.main {
  height: 100vh;
  width: 100vw;
}

/*header*/
.header_b {
  background-color: rgb(245, 245, 245);
}

.header_bar {
  margin: 7px auto;
  height: 40px;
}

.header_left {
  display: flex;
}
.logo {
  height: 100%;
}
.logo > img {
  height: 100%;
}
.title {
  margin-left: 15px;
  line-height: 40px;
  font-size: 25px
}

/*头部右侧*/
.header_right {
  height: 100%
}

/*侧边栏*/
ul.el-menu.el-menu--vertical {
  border: none;
}

.aside {
  border-right: 1px solid #CCC;
}

.aside_bar {
  height: 40px;
}

/* 主要内容区域 超出部分添加滚动条 */
.container_main {
  display: flex;
  height: calc(100vh - 55px);
  overflow: auto;
}

/*媒体查询 手机端侧边栏*/
@media screen and (max-width: 768px) {

  .title, .logo {
    display: none;
  }
}
</style>

