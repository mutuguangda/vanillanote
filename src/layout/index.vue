<template>
  <div class="n-container">
    <Header></Header>
    <transition>
      <!-- <keep-alive> -->
        <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import { Header, Footer } from './components'

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.n-container {
  width: @site-wrapper;
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 50px;
}
</style>