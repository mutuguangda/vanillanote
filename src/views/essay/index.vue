<template>
  <div class="article-container essay-container">
    <div class="article" v-for="(article, index) in articles" :key="index">
      <div class="article-header" @click="gotoPost(article.articleId)">
        <p>
          <!-- <template v-for="title in article.title">{{ title.plain_text }}</templatea> -->
          {{ article.title }}
        </p>
      </div>
      <div class="article-tag">
        <span class="tags-thumb" @click="gototopic">分类</span>
        <span
          class="tags-item"
          v-for="(tag, index) in article.tags"
          :key="index"
          @click="clickCurrTag(tag)"
        >{{ tag }}</span>
        <span class="tags-time">{{ parseTime(article.publishedTime) }}</span>
      </div>
      <div class="article-part" v-if="article.desc !== []">
        <p>
          <!-- <template v-for="desc in article.desc">{{ desc.text.content }}</template> -->
          {{ article.desc }}
        </p>
      </div>
      <div class="article-cover" @click="gotoPost(article.articleId)">
        <img :src="article.image[0]" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { queryDataBase } from '@/api'

export default {
  props: {
    pageSize: {
      type: Number,
      default: 6
    },
    pageNum: {
      type: Number,
      default: 0
    },
    articles: null
  },
  data() {
    return {
      loading: false,
    }
  },
  // watch: {
  //   startCursor: function (val) {
  //     this.start_cursor = val
  //     // this.start_cursor = val
  //     console.log('startCursor改变');
  //     this.initEssay()
  //   },
  //   watch: {
  //     '$route': function () {
  //       console.log('route改变');
  //       this.initEssay()
  //     }
  //   }
  // },
  async created() {
    // await this.initEssay()
  },
  methods: {
    gotoPost(postId) {
      this.$router.push(`/post/${postId}`)
    },
    gototopic() {
      this.$router.push('/topic')
    },
    // async initEssay() {
    //   console.log('essay初始化startCursor', this.startCursor);
    //   this.loading = true
    //   queryDataBase({
    //     pageSize: this.pageSize,
    //     pageNum: this.pageNum
    //   }).then(res => {
    //     this.articles = res.data.articles
    //   }).catch(err => {
    //     console.log(err);
    //   })
    //   this.loading = false
    // }
    clickCurrTag(tag) {
      this.$emit('clickCurrTag', tag)
    }
  },
}
</script>

<style lang='less' scoped>
.essay-container {
  width: @content-wrapper;
  margin: 0 auto;
  position: relative;
}

.article-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 40px;
  height: calc(@article-box-height * 2 + 70px);
  align-content: space-between;
  box-sizing: border-box;
}

.article {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc((@content-wrapper - 80px) / 3);
  height: @article-box-height;

  &-header {
    font-style: normal;
    font-weight: 500;
    font-size: @article-title;
    line-height: 52px;
    cursor: pointer;
    &:hover {
      color: #9c0d00;
    }
  }

  &-tag {
    font-weight: normal;
    font-size: @article-tag;
    line-height: 20px;
    color: #888888;
    margin: 5px 0;
    span {
      display: inline-block;
      margin-right: 5px;
    }
  }

  &-part {
    text-align: justify;
    font-weight: normal;
    font-size: @article-desc;
    line-height: 26px;
    max-height: calc(@article-box-height / 3 - 5px);
    overflow: hidden;
    p {
      height: inherit;
      overflow: hidden;
    }
  }

  &-cover {
    flex: 1;
    width: inherit;
    overflow: hidden;
    cursor: pointer;
    img {
      object-fit: cover;
      transition: filter ease 1s;
      // height: 50px;
      width: inherit;
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      -o-filter: grayscale(100%);
      filter: grayscale(100%);
      filter: gray;
    }
  }

  // 这部分写的好丑，不知道能不能改善一下
  &:nth-child(3n-1) {
    margin: 0 40px;
    &::before {
      content: "";
      position: absolute;
      left: -20px;
      top: 0;
      height: @article-box-height;
      width: 1px;
      background-color: #000;
    }
  }

  &:nth-child(3n)::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 0;
    height: @article-box-height;
    width: 1px;
    background-color: #000;
  }
}

.article:hover {
  img {
    filter: grayscale(0);
  }
}

.tags-thumb {
  cursor: pointer;
  &:hover {
    color: #9c0d00;
  }
}

.tags-item {
  cursor: pointer;
  &:hover {
    color: #9c0d00;
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