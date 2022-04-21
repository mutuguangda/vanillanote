<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app, * {
  font-family: 'Noto Serif SC' ,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // font-size: 32px;
}

* {
  margin: 0;
}

.wrapper {
  padding: 0 20px;
}

body {
  background-color: #f9f7f1;
  margin: 0;
}

a {
  color: #000000;
  text-decoration: none;
}

#nprogress .bar{
  background: #9c0d00 !important;//自定义颜色
}
</style>
