<script setup>
import {ChatRound, House, Star, User} from "@element-plus/icons-vue";

defineProps({
  currentRoute: {
    type: String,
    required: true
  }
})
</script>
<template>
  <el-menu
      :default-active="currentRoute"
      text-color="#333"
      active-text-color="#ffd04d"
      router
  >
    <div class="aside_bar"></div>
    <el-menu-item index="/home">
      <el-icon><House /></el-icon>
      <template #title>回到首页</template>
    </el-menu-item>
    <el-menu-item index="/article">
      <el-icon><Star /></el-icon>
      <template #title>发现动态</template>
    </el-menu-item>
    <el-menu-item index="/chat">
      <el-icon><ChatRound /></el-icon>
      <template #title>查看消息</template>
    </el-menu-item>
    <el-menu-item index="/userinfo">
      <el-icon><User/></el-icon>
      <template #title>我的账户</template>
    </el-menu-item>
  </el-menu>
</template>
