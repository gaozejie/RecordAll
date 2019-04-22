module.exports = {
  publicPath: './',
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '/api' // rewrite path
        }
      }
    }

    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000', // target host
    //     ws: true, // proxy websockets
    //     changeOrigin: true, // needed for virtual hosted sites
    //     pathRewrite: {
    //       '^/api': '' // rewrite path
    //     }
    //   }
    // }

    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:62922/api',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
}
