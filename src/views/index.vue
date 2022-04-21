<template>
  <div class="articles-container">
    <slider animation="fade" v-model="sliderIndex" style="margin-bottom: 20px; background-color: transparent; text-align: center;">
      <slider-item
        v-for="(i, index) in 3"
        :key="index"
      >
        <div>专题：VsCode 高效使用指南</div>
      </slider-item>
    </slider>
    <recent-article :tags="tags" @clickTag="getTag" :curr-tag="currTag" />
    <essay :pageNum="currentPage" :articles="articles" @clickCurrTag="getCurrTag" />
    <pagination
      v-show="showPagination"
      @pagination="route"
      :current-page.sync="currentPage"
      :pageCount.sync="pageCount"
      style="margin: 20px 0 50px;"
    />
    <!-- <fieldset class="archive">
      <legend>归档</legend>
      <button class="archive-btn">心灵鸡汤</button>
      <button class="archive-btn">告五人</button>
      <button class="archive-btn">Vue</button>
      <button class="archive-btn">echarts</button>
      <button class="archive-btn">JavaScript</button>
      <button class="archive-btn">Git</button>
    </fieldset> -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import Essay from '@/views/essay'
import { queryDataBase, listTags } from '@/api'
import RecentArticle from '@/components/RecentArticle.vue'

export default {
  name: 'Home',
  data: () => ({
    pageSize: 6,
    startCursor: undefined,
    pageCount: undefined,
    currentPage: undefined,
    showPagination: true,
    articles: undefined,
    limit: 6,
    pageNum: 1,
    // 后端获取tags列表
    tags: [],
    // RecentArticle 点击返回tag
    tag: '',
    currTag: '',
    sliderIndex: 1
  }),
  components: {
    Pagination,
    Essay,
    RecentArticle
},
  async created() {
    await this.fetchData()
    this.getTags()
  },
  watch: {
    tag() {
      this.fetchData()
    },
  },
  methods: {
    getTags() {
      listTags().then(res => {
        this.tags = res.rows
      })
    },
    getTag(val) {
      // console.log(val);
      this.tag = val
      this.currTag = ''
    },
    getCurrTag(val) {
      this.currTag = val
    },
    route(currentPage) {
      console.log('go to route');
      this.currentPage = Number(currentPage)
      this.$router.push('/page/' + currentPage)
    },
    async fetchData() {
      this.currentPage = Number(this.$route.params.currentPage)
      // console.log(this.currentPage);
      const currentPage = this.currentPage
      const pageSize = this.pageSize
      this.articles = await queryDataBase(
        {
          pageSize: this.limit,
          pageNum: this.currentPage,
          tag: this.tag
        }
      ).then(res => {
        const total = res.total
        this.showPagination = total > pageSize
        this.pageCount = Math.ceil(total / this.pageSize)
        return res.rows
      })
    }
  },
  // watch: {
  //   // 如果路由有变化，会再次执行该方法
  //   '$route': 'fetchData'
  // },
}
</script>

<style lang="less" scoped>
.articles-container {
  box-sizing: content-box;
  width: @content-wrapper;
  position: relative;
  padding: 10px 20px 20px;
  margin: 0 auto;
}

.archive {
  // text-align: center;
  padding: 7px 7px 50px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 100px;
  &-btn {
    background-color: @bg-color;
    border: 1px solid;
    &:hover {
      color: #fff;
      background-color: #000;
    }
  }
}

.slider {
  ::v-deep .slider-btn-left {
    background: none;
  }
  ::v-deep .slider-btn-right {
    background: none;
  }
  ::v-deep .slider-btn {
    &:hover .slider-icon {
      border-color: #5c1212;
    }
  }
  ::v-deep .slider-icon {
    border-color: #000;
  }
  ::v-deep .slider-indicator-active {
    background-color: #5c1212;
  }  
}
</style>