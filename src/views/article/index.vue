<template>
  <div class="article-container">
    <div class="article" v-for="(article, index) in articles" :key="index">
      <div class="article-header" @click="gotoPost(article.articleId)">
        <p>
          <template v-for="title in article.title">{{ title.plain_text }}</template>
        </p>
      </div>
      <div class="article-tag">
        <div class="tags">
          <span class="tags-thumb" @click="gotoArchive">分类</span>
          <span
            class="tags-item"
            v-for="(tag, index) in article.tags"
            :key="index"
            @click="clickTag(tag)"
          >{{ tag.name }}</span>
        </div>
        <span class="tags-time">{{ article.publishedTime }}</span>
      </div>
      <div class="article-part" v-if="article.desc !== []">
        <p>
          <template v-for="desc in article.desc">{{ desc.text.content }}</template>
        </p>
      </div>
      <div class="article-cover" @click="gotoPost(article.articleId)">
        <img :src="article.image" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: null,
      page_size: this.pageSize,
      start_cursor: this.startCursor
    }
  },
  methods: {
    gotoPost(postId) {
      this.$router.push(`/post/${postId}`)
    },
    gotoArchive() {
      this.$router.push('/archive')
    },
    clickTag(tag) {
      this.$emit('clickTag', tag)
    }
  },
}
</script>

<style lang='less' scoped>
.article-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  height: 1010px;
  align-content: space-between;
  box-sizing: border-box;
}

.article {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 368px;
  height: 465px;

  &-header {
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 52px;
    cursor: pointer;
    &:hover {
      color: #9c0d00;
    }
  }

  &-tag {
    display: flex;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #888888;
    margin: 5px 0;
  }

  &-part {
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    max-height: 212px;
    p {
      height: inherit;
      overflow: hidden;
    }
  }

  &-cover {
    flex: 1;
    width: 368px;
    overflow: hidden;
    cursor: pointer;
    img {
      object-fit: cover;
      transition: filter ease 1s;
      height: 100%;
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
      height: 465px;
      width: 1px;
      background-color: #000;
    }
  }

  &:nth-child(3n)::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 0;
    height: 465px;
    width: 1px;
    background-color: #000;
  }
}

.article:hover {
  img {
    filter: grayscale(0);
  }
}

.tags {
  span {
    cursor: pointer;
    margin-right: 12px;
  }
}
</style>