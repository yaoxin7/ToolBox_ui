<script setup>
import {baseURL} from "../../../../utils/request.js";
import { computed } from 'vue'

const props = defineProps(['url']);
const videoUrl = computed(() => {
  return baseURL + '/upload/' + props.url
})
</script>
<template>
<!--  视频-->
  <div class="video">
    <video :src="videoUrl" controls="controls"></video>
  </div>
</template>

<style scoped>
.video {
  width: 100%;
  height: 100%;
}
.video video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>