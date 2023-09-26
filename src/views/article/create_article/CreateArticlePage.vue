<script setup>
import { ref } from 'vue'
import {Plus} from "@element-plus/icons-vue";
import {baseURL} from "../../../utils/request.js";
import { ArrowLeftBold } from "@element-plus/icons-vue"
import { publishArticleServer } from "../../../api/article.js";
import {useRouter} from "vue-router";

const router = useRouter()
const uploadFileRef = ref();
const formModel = ref({
  title: '',
  cover_image_url: '',
  intro: '',
  status: '',
  type: '',
  data_url: [],
})
const rules = []
// MARKDOWN(0), TEXT(1), PICTURES(2), VIDEO(3)
const selectOptions = [
  {label: '文章', value: 'TEXT'},
  {label: '图片', value: 'PICTURES'},
  {label: '视频', value: 'VIDEO'},
  {label: 'markdown', value: 'MARKDOWN'}
]

const fileList = ref(formModel.value.data_url.map(url => {
  return {
    name: url,
    url: baseURL + '/upload/' + url
  }
}))

// 提交动态
const submitServer = async () => {
  const data = {
    ...formModel.value,
    data_url: formModel.value.data_url.join(',')
  }
  await publishArticleServer(data)
  ElMessage.success('发布成功')
  router.back()
}
// 保存状态
const submitStatus = (status) => {
  formModel.value.status = status
  submitServer()
}
</script>
<template>
  <el-container>
    <el-header class="header">
      <div class="back">
        <el-button :icon="ArrowLeftBold" @click="$router.back()" type="info" plain circle></el-button>
      </div>
      <div class="title">
        {{ formModel.id ? '修改动态' : '创建动态' }}
      </div>
    </el-header>

    <el-main>
      <el-form class="main_form" :model="formModel" :rules="rules" label-position="top">
        <!--标题-->
        <el-form-item label="标题" prop="title">
          <el-input v-model="formModel.title"></el-input>
        </el-form-item>
        <!--封面图片-->
        <el-form-item label="封面图片">
          <UploadComp
              @upload-finish="formModel.cover_image_url=$event.data.url"
              :auto-upload="true"
              class="avatar-uploader"
          >
            <img v-if="formModel.cover_image_url" :src="baseURL + '/upload/' + formModel.cover_image_url" class="avatar"  alt="error"/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </UploadComp>
        </el-form-item>
        <!--简介-->
        <el-form-item label="简介" prop="intro">
          <el-input v-model="formModel.intro" type="textarea"></el-input>
        </el-form-item>
        <!--“动态”类型-->
        <el-form-item label="类型">
          <el-select v-model="formModel.type" placeholder="Select">
            <el-option
                v-for="item in selectOptions"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 上传文件--图片 -->
        <el-form-item v-if="formModel.type==='PICTURES'" label="上传图片">
          <UploadComp
              ref="uploadFileRef"
              :auto-upload="true"
              v-model:file-list="fileList"
              @upload-finish="formModel.data_url.push($event.data.url)"
              list-type="picture-card"
          >
            <el-icon><Plus /></el-icon>
          </UploadComp>
        </el-form-item>
        <!-- 上传文件--视频&markdown -->
        <el-form-item v-else label="上传文件">
          <UploadComp
              ref="uploadFileRef"
              :auto-upload="true"
              @upload-finish="formModel.data_url.push($event.data.url)">
            <el-button type="primary">选择文件</el-button>
          </UploadComp>
        </el-form-item>
        <!--提交按钮-->
        <el-form-item>
          <el-button type="primary" @click="submitStatus('PUBLISHED')" round>提交</el-button>
          <el-button type="info" round @click="submitStatus('DRAFT')">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<style scoped>
.main_form {
  min-width: 500px;
  max-width: 700px;
}

.header {
  display: flex;
}
.header > .title {
  margin-left: 10px;
  font-size: 20px;
  line-height: 32px;
}

.input_url {
  margin-left: 50px;
  width: 300px;
  justify-items: end;
}

/*TODO 媒体查询 手机端适配*/
@media screen and (max-width: 768px) {
  .main_form {
    min-width: 0;
    max-width: 100%;
  }
  .input_url {
    margin-left: 0;
    width: 100%;
  }
}
</style>

<style>
.el-form-item__content {
  display: flex;
  align-items: flex-start;
}
/*封面图片*/
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


