<template>
  <div class="n-topic">
    <div class="topic">
      <div class="topic-header">
        <span>专题</span>
      </div>
      <div class="topic-content">
        <div v-for="(topic, index) in topics" :key="index" class="topic-item category">
          <div class="category-header" @click="display(index)">
            <span>{{ topic.title }}</span>
            <span class="polygon" :class="{ display: topic.isDisplay }"></span>
          </div>
          <div class="category-content" v-show="topic.isDisplay">
            <div
              class="topic-content-item"
              v-for="(article, index) in topic.articles"
              :key="index"
              @click="gotoPost(article._id)"
            >
              <span class="time">{{ article.publishedTime }}</span>
              <span class="tag">分类</span>
              <span class="tag" v-for="(tag, index) in article.tags" :key="index">{{ tag }}</span>
              <span class="title">{{ article.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDataBase, listTopics } from '@/api'

export default {
  data() {
    return {
      articles: [],
      topics: [],
      topicIdx: null
    }
  },
  async created() {
    this.getTopic()
  },
  methods: {
    gotoPost(postId) {
      this.$router.push(`/post/${postId}`)
    },
    async fetchData(index) {
      await queryDataBase({ topic: this.topics[index].title }).then(res => {
        this.topics[index].articles = res.data.articles
      })
    },
    async getTopic() {
      await listTopics().then(res => {
        console.log(res.data);
        this.topics = res.rows.map(item => {
          return {
            title: item.title,
            isDisplay: false,
            articles: null
          }
        })
      })
    },
    display(index) {
      if (this.topics[index].articles !== null) {
        this.topics[index].isDisplay = !this.topics[index].isDisplay
        return
      }
      this.topics[index].isDisplay = true
      this.fetchData(index)
    },
  },
}
</script>

<style lang="less" scoped>
.n-topic {
  width: 908px;
  margin: 0 auto;
  margin-top: 52px;
  padding: 20px;
  padding-bottom: 72px;
}

.topic {
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
    font-size: 28px;
    line-height: 46px;
    display: inline-block;
    cursor: pointer;
  }
  &-content {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
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

.topic-content-item {
  display: inline-block;
  align-items: center;
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