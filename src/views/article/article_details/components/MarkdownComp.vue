<script setup>
import 'github-markdown-css'
import {computed, ref} from 'vue'
import {marked} from "marked";
import {getMarkdownContentServer} from "../../../../api/article.js";
import toText from "../../../../utils/ToText.js";

const props = defineProps(['url'])
const content = ref('# Hello World');
const getMarkdownContent = async () => {
  const resp = await getMarkdownContentServer(props.url)
  content.value = await toText(resp.data)

}
getMarkdownContent()

const html = computed(() => {
  return marked(content.value)
})
</script>
<template>
  <div class="markdown">
    <div v-html="html" class="markdown-body"></div>
  </div>
</template>