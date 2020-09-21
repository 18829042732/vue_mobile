module.exports = {
  plugins: {
    // 生成浏览器CSS样式规则前缀
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // rem 基准
      // rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的CSS属性   *代表所有
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
