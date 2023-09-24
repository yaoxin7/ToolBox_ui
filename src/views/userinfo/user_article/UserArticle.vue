<script setup>
import {ref} from "vue";
import router from "../../../router/index.js";
import {deleteArticleServer, getUserArticleServer} from "../../../api/article.js";
import ArticleCard from "../../../components/ArticleCard.vue";

const props = defineProps({
  user_id: {
    type: Number,
    required: true
  },
  showEdit: {
    type: Boolean,
    default: false
  }
})
// TODO 用户“动态”请求参数
const params = ref({
  user_id: 1,
  current: 1,
  size: 8,
})
// TODO 用户动态列表
const articleList = ref({
  "records": [
    {
      "id": 1,
      "userId": 1,
      "title": "小米新科技！",
      "coverImageUrl": "703708a6cc86adbaff52649a90c90419_1692778840442.png",
      "intro": "以全新自研科技，打造小米迄今最薄、最坚固的旗舰折叠屏手机。轻薄机身，震撼影像，徕卡光学全焦段四摄。轻薄机身，强劲续航，双小米澎湃电池、三颗小米澎湃芯片。内外一致双旗舰好屏，强大体验，方方面面。Xiaomi MIX Fold 3轻薄折叠的重磅实力，现在展开。",
      "status": null,
      "createTime": "2023-08-23T08:28:16.000+00:00",
      "updateTime": null
    }
  ],
  "total": 1,
  "size": 10,
  "current": 1,
  "orders": [],
  "optimizeCountSql": true,
  "searchCount": true,
  "countId": null,
  "maxLimit": null,
  "pages": 1
})

// TODO 获取用户动态列表
const getArticleList = async () => {
  params.value.user_id = props.user_id
  const res = await getUserArticleServer(params.value)
  articleList.value = res.data.data
}
getArticleList()


// TODO 跳转动态详情页
const toArticleDetails = (id) => {
  router.push(`/article/details/${id}`)
}

// TODO 删除动态
const deleteArticle = async (id) => {
  await ElMessageBox.alert('此操作将永久删除该动态, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteArticleServer(id)
  ElMessage.success('删除成功')
  getArticleList()
}
// TODO 跳转编辑动态
const toEditArticle = (id) => {
}
// TODO 处理点击
const handleCommand = (command) => {
  const [type, item] = command
  switch (type) {
    case 'delete':
      deleteArticle(item.id)
      break
    case 'edit':
      toEditArticle(item.id)
      break
    case 'detail':
      toArticleDetails(item.id)
      break
  }
}

// TODO 展开全部
const openAll = ref(false)
// 处理分页
const handleCurrentChange = (page) => {
  params.value.current = page
  getArticleList()
}
</script>
<template>
  <el-card class="user_article_base"
    :body-style="{ overflow: 'auto', padding: 0, border: '1px solid #dcdfe6' }"
    shadow="never"
  >
    <template #header>
      <div class="title">
        <span>动态</span>
        <el-button type="info" plain round @click="openAll=!openAll">{{ openAll ? '收起' : '展开'}}</el-button>
      </div>
    </template>

    <div class="main">
      <div class="card-box" :class=" openAll ? 'wrap':'' ">
        <ArticleCard
          v-for="card_info in articleList.records"
          shadow="hover"
          :key="card_info.id"
          :card_info="card_info"
          :body-style="{ padding: '0px' }"
          >

            <el-dropdown @command="handleCommand" v-if="showEdit">
              <el-link :underline="false">操作</el-link>

              <template #dropdown>
                <el-dropdown-menu >
                  <el-dropdown-item :command="['delete', card_info]">删除</el-dropdown-item>
                  <el-dropdown-item :command="['edit', card_info]">编辑</el-dropdown-item>
                  <el-dropdown-item :command="['detail', card_info]">详情</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-link :underline="false" v-else @click="toArticleDetails(card_info.id)" class="button">了解详情</el-link>

        </ArticleCard>
      </div>


    </div>
    <el-pagination
        v-if="openAll"
        @current-change="handleCurrentChange"
        class="page"
        layout="prev, pager, next"
        :default-current-page="articleList.current"
        :total="articleList.total"
        :page-size="articleList.size"
    />
  </el-card>
</template>
<style>
.user_article_base {
  border: none;
}
.user_article_base .el-card__header {
  border: none;
}
</style>
<style scoped>

.wrap {
  flex-wrap: wrap;
}
.title {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}

.card-box {
  display: flex;
}
/*“动态”卡片样式*/
.card-item {
  margin: 20px 10px;
  width: 250px;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}
.article-title {
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.image {
  height: 250px;
  width: 100%;
  object-fit: cover;
  display: block;
}

/*TODO 动态卡片过渡动画*/
.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/*TODO 分页样式*/
.page {
  justify-content: center;
}

/*TODO 媒体查询 手机端适配*/
@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
  }
  .page {
    margin-top: 20px;
  }
}
</style>