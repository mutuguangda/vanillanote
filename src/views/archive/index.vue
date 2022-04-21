<template>
  <div class="n-archive">
    <div class="archive">
      <div class="archive-header">
        <span>归档</span>
      </div>
      <!-- <div class="archive-content">
        <div v-for="(archive, index) in archives" :key="index" class="archive-item category">
          <div class="category-header" @click="display(archive.tag, index)">
            <span>{{ archive.tag }}</span>
            <span class="polygon" :class="{ display: archive.isDisplay }"></span>
          </div>
          <div class="category-content" v-show="archive.isDisplay">
            <div 
              v-for="(article, index) in archive.articles"
              :key="index"
              class="category-item" 
              @click="gotoPost(article.id)">
              <span v-if="article.publishedTime" class="tags-time">{{ article.publishedTime }}</span>
              <span>
                <template v-for="title in article.title">{{ title.plain_text }}</template>
              </span>
            </div>
          </div>
        </div>
      </div>-->
      <div class="archive-content">
        <div
          class="archive-content-item"
          v-for="(archive, index) in archives"
          :key="index"
          @click="gotoPost(archive.articleId)"
        >
          <span class="time">{{ parseTime(archive.publishedTime) }}</span>
          <!-- <span class="tag">分类</span>
          <span class="tag" v-for="(tag, index) in archive.tags" :key="index">{{ tag.name }}</span> -->
          <span class="title">{{ archive.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDataBase } from '@/api'

export default {
  data() {
    return {
      archives: []
    }
  },
  async created() {
    this.fetchData()
  },
  methods: {
    gotoPost(postId) {
      this.$router.push(`/post/${postId}`)
    },
    async fetchData() {
      this.archives = await queryDataBase().then(res => {
        return res.rows
      })
    }
  },
}
</script>

<style lang="less" scoped>
.n-archive {
  width: 908px;
  margin: 0 auto;
  margin-top: 72px;
  padding-bottom: 72px;
}

.archive {
  &-header {
    // font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 52px;
    text-align: center;
  }
  &-content {
    margin-top: 63px;
  }
  &-item {
    margin-bottom: 10px;
  }
}

.category {
  &-header {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 46px;
    display: inline-block;
    cursor: pointer;
  }
  &-content {
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 34px;
    margin-top: 20px;
  }
  &-item {
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      color: #9c0d00;
    }
  }
}

.polygon {
  margin-left: 10px;
  display: inline-block;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left: 10px solid #000;
  transition: transform 0.2s ease-in-out;
  transform-origin: 25% 50%;
  &.display {
    transform: rotate(90deg);
  }
}

.tags {
  display: inline-block;
  span {
    margin-right: 12px;
  }
  &-time {
    display: inline-block;
    margin-right: 12px;
  }
}

.archive-content-item {
  font-size: 18px;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    color: #9c0d00;
  }
  .time {
    margin-right: 7px;
  }
  .tag {
    margin-right: 7px;
  }
  .title {
    font-weight: 600;
    // font-size: 20px;
  }
}
</style>