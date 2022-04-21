<template>
  <!-- 评论功能 -->
  <div class="post-comment comment">
    <div class="comment-header">
      <span>评论</span>
    </div>
    <div class="comment-info">
      <el-select
        :popper-append-to-body="false"
        style="width: 150px; margin-right: 20px"
        v-model="avatar"
        placeholder="请选择头像"
      >
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      姓名：
      <el-input
        style="width: 180px; margin-right: 20px"
        label=""
        v-model="name"
        placeholder="请输入姓名"
      ></el-input>
      邮箱：
      <el-input
        style="flex: 1"
        v-model="email"
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="comment-content">
      <el-input
        show-word-limit
        :maxlength="240"
        resize="none"
        :rows="6"
        :autosize="{ minRows: 6, maxRows: 8 }"
        type="textarea"
        v-model="content"
        placeholder="请输入内容"
      ></el-input>
      <div class="comment-btn-box">
        <button @click="addCommentCheck" class="comment-btn submit">
          提交
        </button>
        <button class="comment-btn reset">重置</button>
      </div>
    </div>
    <div class="comment-main">
      <div v-for="comment in comments" :key="comment.commentId">
        <div class="main-header">
          <div class="main-avatar">{{ comment.avatar }}</div>
          <div class="main-meta">
            <div class="main-name">{{ comment.name }}</div>
            <div class="main-time">{{ comment.createdTime }}</div>
          </div>
        </div>
        <div class="comment-content-main">
          <div class="content">{{ comment.content }}</div>
          <div v-if="comment.children">
            <div class="content second-comment" v-for="children in comment.children" :key="children.commentId">
              {{ children.content }}——{{ children.name }}，{{ children.createdTime }}
            </div>
          </div>
          <div class="comment-main-btn-box">
            <button @click="reply(comment.commentId)" class="comment-main-btn">回复</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addComment, listComment } from "@/api/index";

export default {
  name: "Comment",
  data: () => ({
    // 头像选项
    options: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    // 头像
    avatar: "",
    // 姓名
    name: "",
    // 邮箱
    email: "",
    // 评论
    content: "",
    // 二级评论
    secondContent: "",
    // 获得的评论
    comments: null,
    // 回复框是否显示
    isReply: false,
    // 回复的评论id
    commentId: 0
  }),
  props: {
    article: Number,
  },
  created() {
    this.getList();
  },
  methods: {
    // 添加评论
    addCommentCheck() {
      const commentId = this.commentId
      addComment({
        parentId: commentId || 0,
        articleId: this.article,
        avatar: this.avatar,
        name: this.name,
        email: this.email,
        content: this.content,
      }).then((res) => {
        this.getList()
        this.commentId = null
      });
    },
    // 获得评论列表
    getList() {
      const articleId = this.article
      listComment({ articleId }).then((res) => {
        this.comments = res.rows;
      });
    },
    reply(commentId) {
      this.commentId = commentId;
    },
  },
};
</script>

<style lang='less' scoped>
::v-deep .el-select-dropdown__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

::v-deep .el-select-dropdown__item {
  text-align: center;
  padding: 0;
}

.comment {
  // margin-bottom: 50px;
  &-header {
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;
  }
  &-content {
    // width: 690px;
    // height: 210px;
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
  }
}

.comment-info {
  display: flex;
  align-items: center;
  margin: 10px 0 20px;
}

.comment-btn-box {
  position: absolute;
  right: 20px;
  bottom: 20px;
  .comment-btn {
    background-color: transparent;
    padding: 3px 16px;
    border: 1px solid #e3e6e8;
    cursor: pointer;
    outline: none;
    &.submit {
      margin-right: 10px;
      background-color: #000;
      color: #fff;
    }
  }
}

.comment-main {
  margin-top: 50px;
  .main-header {
    display: flex;
    align-items: center;
    .main-avatar {
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      border: 1px solid #000;
      border-radius: 999px;
      margin-right: 7px;
    }
    .main-name {
      font-size: 16px;
    }
    .main-time {
      font-size: 14px;
      color: #adadad;
    }
  }
}

.comment-content-main {
  margin: 10px 0;
  margin-left: 43px;
}

.comment-main-btn-box {
  display: flex;
  justify-content: flex-end;
  padding: 2px 7px;
}

.comment-main-btn {
  border: none;
  font-size: 12px;
  color: #adadad;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  // position: absolute;
  &:hover {
    color: #9c0d00;
  }
}

.content {
  border-bottom: 1px solid #e3e6e8;
  padding: 7px;
  text-align: justify;
}

.second-comment {
  font-size: 12px;
  color: #4b4b4b;
}
</style>