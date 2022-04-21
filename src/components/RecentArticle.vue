<template>
  <div class="recent-article-container container">
    <div class="thumb-box">
      <img @click="routeToRecent" class="container-thumb" src="@/assets/images/el_book.png" alt />
      <span @click="routeToRecent" class="container-title">最新文章</span>
      <span 
        class="curr-tag tag" 
        :class="{ red: tagIdx === 'currTag' }"
        v-show="currTag">#{{ currTag }}</span>
    </div>
    <div class="tag-box">
      <span
        @click="clickTag(tag, index)"
        :class="{ red: tagIdx === index }"
        class="tag"
        v-for="(tag, index) in tags"
        :key="index"
      >#{{ tag.tagName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentArticle',
  props: {
    tags: Array,
    currTag: String
  },
  data() {
    return {
      tagIdx: null,
      // currTag2: this.currTag
    }
  },
  watch: {
    currTag() {
      if (this.currTag !== '')
        this.tagIdx = 'currTag'
    }
  },
  methods: {
    routeToRecent() {
      this.$router.push('/page/1')
    },
    clickTag(tag, index) {
      // console.log('asdsad');
      this.tagIdx = index
      console.log(index);
      // this.$store.commit('addTag', tag)
      this.$emit('clickTag', tag)
    }
  }
}
</script>

<style lang='less' scoped>
.recent-article-container {
  display: flex;
  align-items: center;
  font-size: @recent-article-header;
  font-weight: 600;
  justify-content: space-between;
  // border-bottom: 1px solid;
  margin-bottom: 7px;
  
}

.thumb-box {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  // &::after {
  //   content: "";
  //   position: absolute;
  //   height: 3px;
  //   width: 100%;
  //   background-color: #9c0d00;
  //   bottom: 0;
  //   transform: translateY(100%);
  // }
}

.container {
  &-title {
    margin-right: 7px;
  }
  &-thumb {
    margin-right: 4px;
    width: 20px;
    height: 20px;
  }
}

.tag {
  cursor: pointer;
  margin-right: 10px;
  border-bottom: 1px solid;
  &:hover {
    color: #9c0d00;
  }
}

.red {
  color: #9c0d00;
}
</style>