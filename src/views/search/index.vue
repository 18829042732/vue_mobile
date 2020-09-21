<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <!-- 外层from表单且action不为空，即可在ios输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText"></search-result>
    <!-- 搜索联想 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"></search-suggestion>
    <!-- 搜索历史 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    ></search-history>
  </div>
</template>
<script>
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import searchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  // created: {},
  data() {
    return {
      searchText: '', // 搜索框文本内容
      isResultShow: false, // 控制搜索数据显示状态
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录数据
    }
  },
  watch: {
    searchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  methods: {
    onSearch(val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>
<style lang='less' scoped>
/deep/ .search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
