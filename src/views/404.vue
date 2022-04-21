<template>
  <div class="error-container">
    <h1>404 Not Found</h1>
  </div>
</template>

<script>
  export default {
    name: '404'
  }
</script>

<style lang='less' scoped>
.error-container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f9f7f1;
  h1 {
    margin-bottom: 100px;
  }
}
</style>