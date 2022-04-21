<template>
  <div class="n-footer">
    <div class="n-notice">
      <span class="touch-box" @click="backToTop">Up 返回顶部</span> |
      <span>copyright©2022 N 躺平预备队1008611号</span> | 
      <!-- <span>powered by mutuguangda</span> |  -->
      联系方式：
      <span>Email</span> | 
      <span>Github</span> | 
      <span>WeChat</span>
    </div>
    <div class="n-sample">
      <span>生活就像海洋，只有意志坚强的人才能到达彼岸。</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
}
</script>

<style lang="less" scoped>
.n-footer {
  box-sizing: border-box;
  display: flex;
  width: @site-wrapper;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  color: #616161;
  border-top: 1px solid #000000;
  position: absolute;
  bottom: 0;
  padding: 3px 10px;
}

.touch-box {
  cursor: pointer;
  &:hover {
    color: #333333;
  }
}
</style>