<script setup>
import formatDate from '../utils/FormatDate';
import  toServerURL  from '../utils/ToServerURL'

const props = defineProps({
  card_info: {
    default: {
      id: 1,
      userId: 1,
      title: '',
      coverImageUrl: '',
      intro: '',
      status: 'PUBLISHED',
      createTime: null,
      updateTime: null
    }
  }
})



</script>

<template>
  <div class="box">
    <el-card
        shadow="hover"
        class="card-item" 
        :body-style="{ padding: '0px' }">

        <el-image 
            class="image" 
            :src="toServerURL(card_info.coverImageUrl)"
            fit="cover" >
        </el-image>

        <div style="padding: 9px">
            <div class="article-title">{{ card_info.title }}</div>
            <span></span>
            <div class="bottom">
              <time class="time">{{ formatDate(new Date(card_info.createTime))}}</time>
              <slot>
                  <el-button>button</el-button>
              </slot>
            </div>
        </div>
    </el-card>
  </div>
    
</template>

<style scoped>
.box {
  margin:20px 0px;
  display: flex;
  width: 100%;
  flex: 0 0 33.3%;
  /* max-width: 300px;
  min-width: 250px; */
}

/*“动态”卡片样式*/
.card-item {
  margin: 0px auto;
  flex: 0 0 90%;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 8px;
  font-size: 8px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-title {
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.image {
  aspect-ratio: 3/2;
  object-fit: cover;
  display: block;
}

@media  (max-width: 1100px) {
  .box {
    flex: 0 0 50%;
  }
}

/*TODO 媒体查询 手机端适配*/
@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
  }
  .box {
    flex: 0 0 100%;
  }
  .card_button {
    font-size: 6px;
  }
  .bottom {
    margin-top: 5px;
  }
  .article-title {
    height: 40px;
    font-size: 14px;
  }
}
</style>