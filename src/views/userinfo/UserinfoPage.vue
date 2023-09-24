<script setup>
import { ref, computed } from 'vue'
import UserArticle from './user_article/UserArticle.vue'
import {useRoute} from "vue-router";
import useUserinfoStore from "../../store/modules/useUserinfoStore.js";
import ShowUserinfo from "./show_userinfo/ShowUserinfo.vue";
import {getUserinfoByIdServer} from "../../api/userinfo.js";
import {baseURL} from "../../utils/request.js";
import {ArrowLeftBold} from "@element-plus/icons-vue";

const route = useRoute()
const userinfoStore = useUserinfoStore()

const userid = ref(1)
const isShow = ref(false)
const showEdit = ref(false)
const userinfo = ref({})
const getUserId = async () => {
  isShow.value = false
  if (route.query.user_id) {
    userid.value = +route.query.user_id
  } else {
    showEdit.value = true
    await userinfoStore.getUserinfo()
    userid.value = userinfoStore.userinfo.accountId
  }
  isShow.value = true
}
const getUserinfo = async () => {
  await getUserId()
  const res = await getUserinfoByIdServer(userid.value)
  userinfo.value = res.data.data
}
getUserinfo()

const imageUrl = computed(() => {
  if (userinfo.value.avatar) {
    return baseURL + '/upload/' + userinfo.value.avatar
  } else {
    return ''
  }
})
</script>

<template>
  <el-container>
    <el-header class="header" :style="{ padding: 0 }">
      <div class="back">
        <el-button v-if="! showEdit" :icon="ArrowLeftBold" @click="$router.back()" type="info" plain circle></el-button>
      </div>
      <div class="title">
        {{ userinfo.nickname }}的主页
      </div>
    </el-header>

    <el-main :style="{ padding: 0 }" v-if="isShow" v-loading="! isShow">

      <ShowUserinfo
          :imageUrl="imageUrl"
          :userinfo="userinfo"
          ref="userinfoRef"
          :user_id="userid"
          :showEdit="showEdit"
      ></ShowUserinfo>

      <div class="space"></div>

      <UserArticle :showEdit="showEdit" :userinfo="userinfo" :user_id="userid"></UserArticle>

    </el-main>
  </el-container>
</template>

<style scoped>
.header {
  display: flex;
}
.header .back {
  margin-right: 20px;
}
.title {
  font-size: 20px;
  line-height: 32px;
}
.space {
  height: 100px;
}
</style>