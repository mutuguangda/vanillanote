<template>
  <!-- 文章详情 -->
  <div class="n-post">
    <div class="post">
      <div class="post-content">
        <NotionRenderer :blockMap="blockMap" fullPage />
        <!-- <div class="complete">
          <span class="complete-box">（完）</span>
        </div> -->
      </div>
      <!-- 评论功能 -->
      <!-- <div class="post-comment comment">
        <div class="comment-header">
          <span>评论</span>
        </div>
        <div class="comment-content">暂不开放</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { NotionRenderer, getPageBlocks } from "vue-notion";
import { getArticle } from "@/api";

export default {
  name: 'About',
  components: { NotionRenderer },
  data: () => ({ 
    blockMap: null, 
    postMeta: null,
    postId: '17b85fb2a3234615a3ebf13d66a79e4a'
  }),
  async created() {
    const postId = this.postId
    console.log(postId);
    // 获得文章标题、分类、日期
    // this.postMeta = await retrievePage(postId).then(res => {
    //   const properties = res.data.properties
    //   return {
    //     publishedTime: properties["Published time"].date.start,
    //     tags: properties["Tags"].multi_select,
    //     title: properties["Title"].title
    //   }
    // }).catch(error => {
    //   console.log(error);
    // })
    // console.log(this.postMeta);
    // 获得当前页面和下一篇页面的信息
    // this.postMeta = await queryDataBase({
    //   page_size: 2,
    //   start_cursor: postId
    // }).then(res => {
    //   // console.log(res);
    //   const currPost = res.data.results[0].properties
    //   const nextPost = res.data.results[1]
    //   return {
    //     currPost: {
    //       publishedTime: currPost["Published time"].date?.start,
    //       tags: currPost["Tags"].multi_select,
    //       title: currPost["Title"].title
    //     },
    //     // nextPost: {
    //     //   id: nextPost.id,
    //     //   title: nextPost.properties["Title"].title
    //     // }
    //   }
    // })
    // this.postMeta = await getArticle(postId).then(res => res.data.article)
    // get Notion blocks from the API via a Notion pageId
    this.blockMap = await getPageBlocks(postId);
    console.log(this.blockMap);
  },
  methods: {
    gotoPost(postId) {
      this.$router.push(`/post/${postId}`)
    },
    gotoArchive() {
      this.$router.push('/archive')
    }
  }
}
</script>

<style lang="less" scoped>

@import "~vue-notion/src/styles.css"; /* optional Notion-like styles */
/deep/ .notion {
  font-family: "Noto Serif SC", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &-text {
    line-height: 30px;
  }
}

.n-post {
  width: @post-wrapper;
  margin: 0 auto;
  margin-top: 72px;
}

.post {
  &-header {
    // font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 52px;
    text-align: center;
  }
  &-tag {
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #888888;
    margin: 5px 0;
    text-align: center;
  }
  &-pagination {
    margin-bottom: 100px;
    &:hover {
      color: #9c0d00;
    }
    & > span {
      cursor: pointer;
    }
  }
}

.tags {
  display: inline-block;
  margin: 20px 0;
  span {
    margin-right: 12px;
  }
  &-time {
    display: inline-block;
  }
}

.complete {
  margin: 100px 0;
  font-size: 20px;
  line-height: 34px;
  text-align: center;
}

.signature {
  text-align: center;
  &-thumb {
    width: 100px;
    height: 100px;
    border-radius: 999px;
    overflow: hidden;
    margin: 0 auto;
    img {
      object-fit: cover;
      width: inherit;
      height: inherit;
    }
  }

  &-desc {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    color: #616161;
    margin: 15px 0 30px;
  }

  &-msg {
    display: inline-block;
    font-size: 14px;
    margin: 0 auto 100px;
    padding: 10px 20px;
    background-color: #ffeaea;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  }
}

.msg {
  text-align: left;
  &-header {
    display: flex;
    margin-bottom: 5px;
    align-items: center;
    &::before {
      content: "";
      height: 1px;
      flex: 1;
      background-color: #616161;
    }
    &::after {
      display: block;
      background-color: #616161;
      content: "";
      height: 1px;
      flex: 1;
    }
  }
  &-tags {
    margin-bottom: 5px;
    span:first-child {
      margin-right: 12px;
    }
  }
}

.comment {
  &-header {
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;
  }
  &-content {
    width: 690px;
    height: 210px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>