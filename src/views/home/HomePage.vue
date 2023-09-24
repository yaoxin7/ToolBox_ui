<script setup>
import {Plus, Setting, Star, User} from "@element-plus/icons-vue";
import { ref, watch, computed } from "vue";
import SettingComp from "./comp/SettingComp.vue";
import useConfig  from '../../store/modules/config'

const config = useConfig()

const backgroundUrl = ref(config.config.backgroundUrl)
const icon = ref(config.config.icon)
watch(() => backgroundUrl.value, () => {
  config.setBackgroundUrl(backgroundUrl.value)
})

// TODO 跳转网址
const goLink = (link) => {
  window.open(link)
}

// TODO 编辑模式
const isEdit = ref(false)
// TODO 添加图标
const addDialog = ref(false)
const addIcon = () => {
  addDialog.value = true
}
// TODO add回调
const onSubmit = (e) => {
  if (e) icon.value.push({
    ...e
  })
  addDialog.value = false
}
// TODO 删除图标
const onRemove = (e) => {
  icon.value.splice(e, 1)
}

// TODO 设置背景
const showEditBackground = ref(false)

const background = computed(() => {
  if (!backgroundUrl.value) return {}
  return {
    backgroundImage: `url(${backgroundUrl.value})`
  }
})
</script>
<template>
  <div class="base" :style="background">

    <div class="float_box">
      <div class="header">
        <el-space>
          <el-link v-if="!isEdit" :icon="Setting" @click="isEdit=true">编辑</el-link>
          <el-link v-else :icon="Setting" @click="isEdit=false">退出</el-link>
          <el-link :icon="Star" :underline="true" @click="$router.push('/article')">文章</el-link>
          <el-link :icon="User" :underline="true" @click="$router.push('/userinfo')">账户</el-link>
        </el-space>
      </div>
      <div class="icon_box">
        <transition-group name="icon">
          <div class="icon"
               :key="item.name"
               v-for="(item, index) in icon"
               @click="isEdit ? onRemove(index) : goLink(item.link)"
          >
            {{ item.name }}
          </div>
          <div class="icon" :key="'Edit'" v-if="isEdit" @click="addIcon"><Plus/></div>
          <div class="icon" :key="'Background'" v-if="isEdit" @click="showEditBackground=true">背景</div>
        </transition-group>
      </div>
    </div>
    <SettingComp :visible="addDialog" :model-value="addDialog" @update:model-value="addDialog=false" title="添加" @update:submit="onSubmit"></SettingComp>
    <el-dialog v-model="showEditBackground" title="设置背景">
      <el-form label-position="top">
        <el-form-item label="背景图片地址">
          <el-input v-model="backgroundUrl" placeholder="请输入背景图片地址"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>

.base {
  background: linear-gradient(to right, rgb(53, 92, 125), rgb(108, 91, 123), rgb(192, 108, 132));
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
}

 /*背景毛玻璃*/
.base .float_box {
  margin: auto;
  width: 780px;
  height: 600px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

/*头部*/
.header {
  height: 40px;
  background-color: rgb(0, 0, 0, 0.7);
  border-radius: 10px 10px 0 0;
  color: #fff;
  line-height: 40px;
  padding:0 20px;
}

/*图标箱子 780px*/
.icon_box {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  overflow: hidden;
}

/*图标 156px * 5*/
.icon {
  flex: 0 0 70px;
  width: 70px;
  margin: 43px;
  height: 70px;
  background-color: #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}

.icon:hover {
  transform: scale(1.1);
}
/*图标transition过渡动画*/
.icon-enter-active, .icon-leave-active {
  transition: all 0.3s;
}
.icon-enter, .icon-leave-to {
  opacity: 0;
  transform: translateX(100px);
}



@media screen and (max-width: 780px) {
  .base .float_box {
    max-width: 90%;
  }
}
</style>