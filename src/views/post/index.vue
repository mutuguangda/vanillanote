<template>
  <!-- 文章详情 -->
  <div class="n-post">
    <div class="post">
      <div class="post-header">
        <span>
          <!-- <template v-for="title in postMeta.currPost.title">{{ title.plain_text }}</template> -->
          {{ postMeta.title }}
        </span>
      </div>
      <div class="post-tag">
        <div class="tags">
          <span class="tags-thumb">分类</span>
          <span
            class="tags-item"
            v-for="(tag, index) in postMeta.tags"
            :key="index"
            @click="gotoArchive"
            >{{ tag }}</span
          >
          <!-- {{ postMeta.tags }} -->
        </div>
        <span class="tags-time">{{ parseTime(postMeta.publishedTime) }}</span>
      </div>
      <div class="post-content">
        <NotionRenderer :blockMap="blockMap" />
        <div class="complete">
          <span class="complete-box">（完）</span>
        </div>
      </div>
      <div class="post-signature signature">
        <div class="signature-thumb">
          <img src="@/assets/images/feeddogscat.jpg" alt />
        </div>
        <div class="signature-desc">
          <span>伪文青，偶尔有强迫症。</span>
        </div>
        <div class="signature-msg msg">
          <div>
            <div class="msg-header">
              <span>文档信息</span>
            </div>
            <div class="msg-tags">
              <span>作者：mutuguangda</span>
              <span>发表日期：2022-01-12</span>
            </div>
            <div class="msg-copyright">
              <span
                >版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 下一篇文章，考虑做推荐文章，即被划分为同个标签的文章 -->
      <!-- <div 
        v-if="postMeta.nextPost" 
        @click="gotoPost(postMeta.nextPost.id)"
        class="post-pagination" style="text-align: right;">
        <span style="font-size: 20px;">
          下一篇:
          <template v-for="title in postMeta.nextPost.title">{{ title.plain_text }}</template>
          {{ nextPost.title.plain_text }}
        </span>
      </div> -->
      <Comment :article="postId" />
    </div>
  </div>
</template>

<script>
import { NotionRenderer, getPageBlocks } from "vue-notion";
import { getArticle } from "@/api";

import Comment from '../comment/index.vue'

export default {
  name: "Post",
  components: { NotionRenderer, Comment },
  data() {
    const postId = this.$route.params.postId
    return {
      blockMap: null,
      postMeta: null,
      postId
    }
  },
  async created() {
    // 获得文章标题'分类'日期
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
    this.postMeta = await getArticle(this.postId).then((res) => res.data);
    // console.log(this);
    // get Notion blocks from the API via a Notion pageId
    this.blockMap = await getPageBlocks(this.postMeta.pageId);
    // console.log(this.blockMap);
  },
  methods: {
    gotoPost(postId) {
      this.$router.push(`/post/${postId}`);
    },
    gotoArchive() {
      this.$router.push("/archive");
    },
  },
};
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
</style>