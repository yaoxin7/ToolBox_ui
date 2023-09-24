<script setup>
import { defineProps, ref } from 'vue'
import {uploadAvatarServer} from "../api/userinfo.js";

defineProps({
  fileList: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits([
  'uploadFinish',
  'update:file-list'
])

const uploadRef = ref()
defineExpose({
  uploadRef
})

const handleSuccess = (res) => {
  emits('uploadFinish', res.data )
}

const httpRequest = (file) => {
  const formData = new FormData()
  formData.append('file', file.file)
  return uploadAvatarServer(formData);
}
</script>
<template>
  <el-upload
    ref="uploadRef"
    :auto-upload="false"
    :on-success="handleSuccess"
    :http-request="httpRequest"
  >
    <slot></slot>
  </el-upload>
</template>
