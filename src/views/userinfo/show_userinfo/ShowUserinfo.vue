<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  showEdit: {
    type: Boolean,
    default: false
  },
  userinfo: {
    type: Object,
    default: () => {}
  },
  imageUrl: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <el-card
      :body-style="{ padding: '30px 0px'}"
      shadow="never"
      class="show_userinfo_base">
    <template #header>
      <div class="title">
        <span>社交信息</span>
        <el-button
            v-if="showEdit"
            @click="$router.push('/userinfo/edit')"
            type="info" plain round>编辑</el-button>
      </div>
    </template>

    <div class="main">

      <div class="left">
        <div class="avatar">
          <el-avatar :size="200" :src="imageUrl"></el-avatar>
        </div>
        <div class="nickname">
          <span>{{ userinfo.nickname }}</span>
        </div>
      </div>

      <div class="right">
        <div class="userinfo">
          <el-descriptions>
            <el-descriptions-item label="账号">{{ userinfo.id }}</el-descriptions-item>
            <el-descriptions-item label="昵称">{{ userinfo.nickname }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">XXX@qq.com</el-descriptions-item>
            <el-descriptions-item label="签名">{{ userinfo.bio }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

    </div>
  </el-card>
</template>

<style>
.show_userinfo_base {
  border: none;
}
.show_userinfo_base .el-card__header {
  border: none;
}
</style>

<style scoped>

.title {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}

.main {
  display: flex;
}

.main .left {
  width: 300px;
}
.main .left .avatar {
  display: flex;
  justify-content: center;
}
.main .left .nickname {
  font-size: 20px;
  text-align: center;
}

.main .right {
  flex: 1;
  margin-left: 20px;
  display: flex;
}
.main .right .userinfo {
  width: 100%;
  margin: auto;
}

/*媒体查询 手机端适配*/
@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
  }
  .main .left {
    width: 100%;
  }
  .main .right{
    margin-left: 0;
    margin-top: 50px;
  }
}
</style>