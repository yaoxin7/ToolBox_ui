<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  visible: Boolean,
  icon: {
    type: Object,
    default: () => ({})
  },
  title: String
})

const form = ref({
  name: props.icon.name || '',
  link: props.icon.link || ''
})
watch(() => props.visible, () => {
  form.value = {
    name: props.icon.name || '',
    link: props.icon.link || ''
  }
})

const emits = defineEmits(['update:submit', 'update:model-value'])

</script>
<template>
  <el-dialog :title="title" :show-close="false">
    <el-form>
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.link" placeholder="请输入URL"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="emits('update:submit', form)">确认</el-button>
        <el-button type="info" @click="emits('update:submit')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>