<script setup>
import { ref, watch } from 'vue'
import {changePasswordServer} from "../../../../api/user.js";
import {useRouter} from "vue-router";

const proxy = defineProps({
  dialogVisible: Boolean
})
const emit = defineEmits(['update:dialogVisible'])
const router = useRouter()

const formRef = ref()
const formModel = ref( {
  old_password: '',
  new_password: ''
})
const rule = {
  old_password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'},
  ],
  new_password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'},
  ]
}
const chanPassword = async () => {
  await formRef.value.validate()
  await changePasswordServer(formModel.value)
  emit('update:dialogVisible')
  ElMessage.success('修改成功')
  router.push('/login')
}

watch(() => proxy.dialogVisible, () => {
  formModel.value = {
    old_password: '',
    new_password: ''
  }
})
</script>

<template>
  <el-dialog
      :model-value="dialogVisible"
      title="修改密码"
      width="50%"
      :modal="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
  >
    <el-form ref="formRef" :model="formModel" :rules="rule" label-position="top">
      <el-form-item label="旧密码" prop="old_password">
        <el-input v-model="formModel.old_password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input v-model="formModel.new_password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('update:dialogVisible')" round>取消</el-button>
        <el-button type="danger" @click="chanPassword" round>
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>