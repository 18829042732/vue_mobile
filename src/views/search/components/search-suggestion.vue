<template>
  <div class="search-syggestion">
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      :title="item"
      icon="search"
      @click="$emit('search', item)"
    >
      <span slot="title" v-html="highlightText(item)"></span>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  // created: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 监视的处理函数
      handler: debounce(function (val) {
        this.loadSearchSuggestion(val)
      }, 200),
      // 首次监视触发
      immediate: true
    }
  },

  data() {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  methods: {
    // 加载数据联想，获取搜索联想接口数据
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch {
        this.$toast('获取失败')
      }
    },

    // 处理高亮
    highlightText(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      // text.replace(/匹配的内容/gi, highlightStr)
      return text.replace(reg, highlightStr)
    }
  }
}
</script>
<style lang='less' scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
