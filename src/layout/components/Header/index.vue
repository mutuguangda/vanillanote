<template>
  <div class="n-header" :class="{ 'hide': isHide }">
    <div class="n-mark">
      <router-link to="/">N</router-link>
    </div>
    <div class="n-navbar">
      <!-- 搜索 -->
      <!-- <a href="">
        <svg t="1646639870065" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="644" width="16" height="16"><path d="M1005.312 914.752l-198.528-198.464A448 448 0 1 0 0 448a448 448 0 0 0 716.288 358.784l198.4 198.4a64 64 0 1 0 90.624-90.432zM448 767.936A320 320 0 1 1 448 128a320 320 0 0 1 0 640z" fill="#262626" p-id="645"></path></svg>
      </a> -->
      <router-link to="/archive">归档</router-link>
      <router-link to="/topic">专题</router-link>
      <router-link to="/links">友链</router-link>
      <router-link to="/about">关于</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isHide: false
      }
    },
    mounted() {
      const that = this
      window.addEventListener("scroll", function() {
          // 页面底部到滚动条底部距离
          // console.log('pageTop:' ,pageTop);
          const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          // console.log('scrollTop:' ,scrollTop);
          // console.log('pageTop - scrollTop:', pageTop - scrollTop);
          that.isHide = scrollTop > 370
      });
    }
  }
</script>

<style lang="less" scoped>
.n-header {
  height: @header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000000;
  padding: 0 20px;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #f9f7f1;
  z-index: 1000;
  transition: transform 0.5s ease-in-out;
}

.n-mark {
  font-size: @mark-size;
  font-weight: bold;
}

.n-navbar {
  font-size: @navbar-size;
  font-style: normal;
  a {
    margin-left: 20px;
    position: relative;

    &::before {
      background: #9c0d00;
      bottom: 0;
      content: '';
      height: 2px;
      left: 0;
      position: absolute;
      transform: scaleX(0);
      visibility: hidden;
      width: 100%;
      transition-delay: 0s;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
    }

    &:hover::before {
      transform: scaleX(1);
      visibility: visible;
    }
  }
}

.hide {
  transform: translateY(-100%);
}
</style>