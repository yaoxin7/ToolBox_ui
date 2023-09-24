<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {getArticleDetailServer} from "../../../api/article.js";
import {ArrowLeftBold} from "@element-plus/icons-vue";
import formatDate from "../../../utils/FormatDate.js";
import PicturesComp from "./components/PicturesComp.vue";
import MarkdownComp from "./components/MarkdownComp.vue";
import VideoComp from "./components/VideoComp.vue";
import {getUserinfoByIdServer} from "../../../api/userinfo.js";
import { useRouter } from 'vue-router'
// TODO 获取动态详情
/*{
  "id": "1",
    "title": "小米新科技！",
    "user_id": "1",
    "cover_image_url": "703708a6cc86adbaff52649a90c90419_1692778840442.png",
    "intro": "以全新自研科技，打造小米迄今最薄、最坚固的旗舰折叠屏手机。轻薄机身，震撼影像，徕卡光学全焦段四摄。轻薄机身，强劲续航，双小米澎湃电池、三颗小米澎湃芯片。内外一致双旗舰好屏，强大体验，方方面面。Xiaomi MIX Fold 3轻薄折叠的重磅实力，现在展开。",
    "status": "ArticleStatus{status=0}",
    "create_time": "Wed Aug 23 16:28:16 CST 2023",
    "update_time": "Wed Aug 23 16:28:16 CST 2023",
    "type": "ContentType{type=2}",
    "data_url": "download_1692778884077.png,download1_1692778886370.png"
}*/
const router = useRouter()
const route = useRoute()
const articleId = ref(route.params.id)

const articleDetails = ref({
  id: '',
  title: '',
  user_id: '',
  cover_image_url: '',
  intro: '',
  status: '',
  create_time: '',
  update_time: '',
  type: '',
  data_url: '',
})
const getArticleDetails = async () => {
  const response = await getArticleDetailServer(articleId.value)
  articleDetails.value = response.data.data
  await getArticleAuthor()
}
getArticleDetails()

// TODO 获取作者信息
const articleAuthor = ref({})
const getArticleAuthor = async () => {
  const resp = await getUserinfoByIdServer(articleDetails.value.user_id)
  articleAuthor.value = resp.data.data
}

// TODO 跳转作者信息页
const toUserinfoPage = () => {
  router.push(`/userinfo?user_id=${articleAuthor.value.accountId}`)
}
</script>
<template>
<el-container>
  <el-header class="header" height="40px">
    <div class="back">
      <el-button :icon="ArrowLeftBold" @click="$router.back()" type="info" plain circle></el-button>
    </div>
    <div class="title">
      动态详情
    </div>
  </el-header>

  <el-main>

    <el-container class="article">

      <div class="article-header">
        <div class="header-left">
          <div class="article-title">
            {{ articleDetails.title }}
          </div>

          <div class="update-time">
            更新时间：{{ formatDate(new Date(articleDetails.update_time)) }}
          </div>
        </div>
        <div class="header-right">
          <div class="article-author">
            作者：<el-link underline @click="toUserinfoPage" >{{ articleAuthor.nickname }}</el-link>
          </div>
        </div>
      </div>

      <div class="article-main">
        <div class="article-intro">
          {{ articleDetails.intro }}
        </div>

        <div class="article-content">
          <PicturesComp v-if="articleDetails.type==='ContentType{type=2}'" :urls="articleDetails.data_url.split(',')"></PicturesComp>
          <MarkdownComp v-else-if="articleDetails.type==='ContentType{type=0}'" :url="articleDetails.data_url"></MarkdownComp>
          <VideoComp v-else-if="articleDetails.type==='ContentType{type=3}'" :url="articleDetails.data_url"></VideoComp>
        </div>
      </div>
    </el-container>

  </el-main>
</el-container>
</template>

<style scoped>
.header {
  display: flex;
}
.header > .title {
  margin-left: 10px;
  font-size: 20px;
  line-height: 32px;
}

/* TODO 动态 */
.article {
  display: block;
}

.article .article-header {
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
.article .article-header .article-title {
  font-size: 30px;
}
.article .article-header .update-time {
  line-height: 30px;
  font-size: 14px;
  color: #999;
}
.article .article-header .article-author {
  width: 100px;
  line-height: 30px;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-right: 50px;
  height: 100%;
  font-size: 14px;
  color: #999;
}

.article .article-main .article-intro {
  line-height: 25px;
  font-size: 16px;
  color: #999;
}

.article .article-content {
  margin-top: 50px
}

/* TODO 媒体查询 适配手机*/
@media screen and (max-width: 768px) {
  .article .article-header {
    flex-direction: column;
  }
  .article .article-header .article-title {
    font-size: 20px;
  }
  .article .article-header .update-time {
    font-size: 12px;
  }
  .article .article-header .article-author {
    font-size: 12px;
  }
  .article .article-main .article-intro {
    font-size: 14px;
  }
}
</style>