<template>
  <div class="n-links">
    <div class="links">
      <div class="links-header">
        <span>友链</span>
      </div>
      <!-- <div class="links-content">
        <a class="links-item">生而为猫，我很抱歉</a>
        <a class="links-item">生而为猫，我很抱歉</a>
        <a class="links-item">生而为猫，我很抱歉</a>
      </div> -->
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="less" scoped>
.n-links {
  min-height: calc(100vh - 174px);
  width: 908px;
  margin: 0 auto;
  margin-top: 72px;
}

.links {
  &-header {
    // font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 52px;
    text-align: center;
  }
  &-content {
    font-family: Noto Serif SC;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 52px;
    /* identical to box height */

    text-align: center;
    margin-top: 152px;
    display: flex;
    flex-direction: column;
  }
  &-item {
    display: inline-block;
    margin-bottom: 34px;
    position: relative;
    cursor: pointer;

    // 下划线hover效果，放弃
    // &::before {
    //   background: #cc493d;
    //   bottom: 0;
    //   content: '';
    //   height: 2px;
    //   left: 0;
    //   position: absolute;
    //   transform: scaleX(0);
    //   visibility: hidden;
    //   width: 100%;
    //   transition-delay: 0s;
    //   transition-duration: 0.2s;
    //   transition-timing-function: ease-in-out;
    // }

    // &:hover::before {
    //   transform: scaleX(1);
    //   visibility: visible;
    // }

    &:hover {
      color: #9c0d00;
    }
  }
}
</style>