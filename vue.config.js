const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',
}

module.exports = {
  configureWebpack: config => {
    return {
      externals: externals,
    }
  }
}