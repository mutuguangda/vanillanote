<template>
  <div class="n-pagination">
    <div class="pagination">
      <span class="pagination-prev" v-show="currP > 1" @click="currP -= 1">&lt;</span>
      <span @click="currP = 1" class="pagination-box" :class="{ active: currP == 1 }">1</span>
      <span class="pagination-box" v-show="showPrevMore">...</span>
      <span
        class="pagination-box"
        v-for="pager in pagers"
        :key="pager"
        @click="currP = pager"
        :class="{ active: currP == pager }"
      >{{ pager }}</span>
      <span class="pagination-box" v-show="showNextMore">...</span>
      <span
        class="pagination-box"
        @click="currP = pageCount"
        :class="{ active: currP == pageCount }"
      >{{ pageCount }}</span>
      <span class="pagination-next" v-show="currP < pageCount" @click="currP += 1">&gt;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      currP: this.currentPage,
      showPrevMore: false,
      showNextMore: false,
    }
  },
  props: {
    currentPage: Number,
    pageCount: Number,
    pagerCount: {
      type: Number,
      default: 5
    },
  },
  watch: {
    currP: function() {
      // console.log("emit事件");
      this.$emit('pagination', this.currP)
    }
  },
  methods: {
    convert(name, val) {
      this[name] = val
    },
  },
  computed: {
    pagers() {
      const pagerCount = this.pagerCount;
      const halfPagerCount = (pagerCount - 1) / 2;

      const currentPage = Number(this.currentPage);
      const pageCount = Number(this.pageCount);

      let showPrevMore = false;
      let showNextMore = false;

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }

      const array = [];

      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }

      this.convert('showPrevMore', showPrevMore)
      this.convert('showNextMore', showNextMore)

      return array;
    }
  }
}
</script>

<style lang="less" scoped>
.n-pagination {
  text-align: center;
}

.pagination {
  display: inline-block;
  span {
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
    width: 40px;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
  }

  &-box {
    font-weight: bold;
    font-size: 14px;
    border: 1px solid #000000;

    margin: 0 10px;

    &:hover {
      background-color: #000000;
      color: #ffffff;
    }
  }
  &-prev,
  &-next {
    font-family: Losttimoh, Avenir, Helvetica, Arial, sans-serif;
    font-size: 36px;
  }
}

.active {
  background: #000000;
  color: #ffffff;
}
</style>