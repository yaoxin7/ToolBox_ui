<script setup>
import {Edit, Search} from "@element-plus/icons-vue";
import router from "../../router/index.js";
import { ref, onActivated } from 'vue'
import {getArticleListServer} from "../../api/article.js";
import {baseURL} from "../../utils/request.js";
import  formatDate  from '../../utils/FormatDate.js'
import ArticleCard from "../../components/ArticleCard.vue";

const params = ref({
  current: 1,
  size: 12,
  search: ''
})
// 动态列表
const articleList = ref({
  records: [],
  total: 0,
  size: 0,
  current: 1
})

const showLoading = ref(false)
const getArticleList = async () => {
  showLoading.value = true
  const res = await getArticleListServer(params.value)
  articleList.value = res.data.data
  showLoading.value = false
}

// TODO 页面激活时重新获取动态列表
onActivated(() => {
  getArticleList()
});

// TODO 跳转页码
const handleCurrentChange = (page) => {
  params.value.current = page
  getArticleList()
}
// TODO 跳转到动态详情页
const toArticleDetails = (id) => {
  router.push(`/article/details/${id}`)
}

// TODO 搜索
const onSearch = () => {
  getArticleList()
}

</script>
<template>
  <el-container>

    <el-header :style="{ padding: 0 }" height="40px" class="article_header">
      <div class="header_left">
        <div class="title">动态</div>
        <div class="button">
          <el-button round :icon="Edit" type="danger" @click="router.push('/article/edit')">发动态</el-button>
        </div>
      </div>
      <div class="search">
        <el-input
            v-model="params.search"
            placeholder="请输入内容"
            class="input-with-select"
            @keydown.enter="onSearch"
            clearable
        >
          <template #append>
            <el-button @click="onSearch" :icon="Search" />
          </template>
        </el-input>
      </div>
    </el-header>

    <el-main :style="{ padding: 0 }" class="article_main" v-loading="showLoading">

      <div class="card-box">
        <TransitionGroup>
          <ArticleCard
           v-for="card_info in articleList.records"
           :card_info="card_info"
           :key="card_info.id">
            <el-link :underline="false" @click="toArticleDetails(card_info.id)" class="button">了解详情</el-link>
          </ArticleCard>
        </TransitionGroup>

      </div>

      <el-pagination
          class="page"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :default-current-page="articleList.current"
          :total="articleList.total"
          :page-size="articleList.size"
      />

    </el-main>

  </el-container>
</template>

<style scoped>
.article_header {
  display: flex;
  justify-content: space-between;
}
.header_left {
  display: flex;
}
.article_header .title {
  line-height: 40px;
  font-size: 25px;
}
.article_header .button {
  margin-top: 4px;
  margin-left: 15px
}
.article_header .search {
  margin-top: 4px;
  margin-right: 15px
}

/* TODO 内容区 “动态”卡片*/
.article_main > .card-box{
  display: flex;
  flex-wrap: wrap;
}
/* TODO 动态卡片过渡样式*/
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s;
}


/*“动态”卡片样式*/

.button {
  padding: 0;
  min-height: auto;
}

/* TODO 分页 */
.page {
  justify-content: center;
}

/*TODO 媒体查询 手机端适配*/
@media screen and (max-width: 768px) {
  .article_header {
    flex-direction: column;
    height: 80px;
    margin-bottom: 10px;
  }
  .page {
    margin-top: 20px;
  }
}
</style>