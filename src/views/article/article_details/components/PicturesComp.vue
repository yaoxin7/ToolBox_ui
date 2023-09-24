<script setup>
  import {baseURL} from "../../../../utils/request.js";

  defineProps({
    urls: {
      type: Array,
      default: () => []
    }
  })
</script>
<template>
  <el-image
      class="image"
      :lazy="true"
      v-for="url in urls"
      :key="url"
      :src="baseURL + '/upload/' + url"
  >

  </el-image>
</template>

<style scoped>
.image {
  width: 100%;
}
</style>