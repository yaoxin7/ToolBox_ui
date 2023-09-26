<script setup>
import { ref, watch } from 'vue'
import useUserinfoStore from "../../../store/modules/useUserinfoStore.js";
import {ArrowLeftBold, Plus} from "@element-plus/icons-vue";
import {updateUserinfoServer, uploadAvatarServer} from "../../../api/userinfo.js";
import EditPassword from "./components/editPassword.vue";

const userinfoStore = useUserinfoStore()

const formModel = ref({})
const rules = ref({})

const getUserInfo = async () => {
  await userinfoStore.getUserinfo()
  formModel.value = {
    ...userinfoStore.userinfo
  }
  imageUrl.value = userinfoStore.imageUrl
}

getUserInfo()

// 监听表单变化
const isChange = ref(true)

setTimeout(() => {
  watch([formModel, changeImage], () => {
    isChange.value = JSON.stringify(formModel.value) === JSON.stringify(userinfoStore.userinfo) && !changeImage.value
  }, {deep: true})
}, 1000)

// 头像地址
const imageUrl = ref('')
const avatarUploadRef = ref()
const changeImage = ref(false)

// TODO 头像改变时，转换本地图片预览显示
const handleChange = (file) => {
  changeImage.value = true
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
// TODO 上传头像
const uploadAvatar = async (file) => {
  const formData = new FormData()
  formData.append('file', file.file)
  const resp = await uploadAvatarServer(formData);
  formModel.value.avatar = resp.data.data.url
  return resp
}
// TODO 上传头像成功
const onUploadSuccess = async () => {
  await updateUserinfoServer(formModel.value)
  ElMessage.success('保存成功')
}

// TODO 保存修改的个人信息
const saveChange = () => {
  if (changeImage.value) {
    avatarUploadRef.value.submit();
  } else onUploadSuccess()
}
// TODO 取消修改个人信息
const cancelChange = () => {
  getUserInfo()
}

// TODO 修改密码弹窗
const dialogVisible = ref(false)
</script>

<template>

  <el-card
      :body-style="{ padding: '40px 0px 0px 0px', border: '1px solid #dcdfe6'}"
      class="userinfo-base" shadow="never">
    <template #header>
      <div class="title">
        <el-button :icon="ArrowLeftBold" @click="$router.back()" type="info" plain circle></el-button>
        <span> 编辑个人信息</span>
      </div>
    </template>

    <div class="main">
      <el-form class="form_left" :model="formModel" :rules="rules" label-width="50px">
        <el-form-item prop="account_id" label="昵称">
          <el-input v-model="formModel.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="bio" label="介绍">
          <el-input v-model="formModel.bio" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain @click="dialogVisible = true">修改密码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveChange" type="danger" :disabled="isChange" round>保存</el-button>
          <el-button @click="cancelChange" type="info" :disabled="isChange" round>取消</el-button>
        </el-form-item>
      </el-form>

      <el-upload
          :auto-upload="false"
          ref="avatarUploadRef"
          class="avatar-uploader"
          :on-change="handleChange"
          :http-request="uploadAvatar"
          :on-success="onUploadSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar"  alt="error"/>
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>

    <edit-password :dialogVisible="dialogVisible" @update:dialog-visible="dialogVisible=false"></edit-password>
  </el-card>

</template>
<style scoped>
.userinfo-base {
  border: none;
}
.userinfo-base .el-card__header {
  border: none;
}
</style>
<style scoped>
.title {
  font-size: 20px;
}
.userinfo-base {
  width: 100%;
}
.main {
  display: flex;
  justify-content: space-around;
}
/*表单左侧*/
.form_left {
  flex: 0 0 60%;
  max-width: 500px;
}

/*媒体查询 手机端适配*/
@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
  }
  .main .form_left {
    width: 100%;
  }
  .main .avatar-uploader {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .main .avatar-uploader .avatar {
    width: 100%;
    height: 100%;
  }
  .main .avatar-uploader .el-upload {
    width: 100%;
  }
  .main .avatar-uploader .el-icon {
    width: 100%;
    height: 100%;
  }
}
</style>

<style>

/*右侧头像*/
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}


</style>