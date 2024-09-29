module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
    // detail: {
    //   entry: 'src/detail.js',
    //   template: 'public/detail.html',
    //   filename: 'detail.html'
    // },
  },
  assetsDir: './',
  publicPath: './',
  outputDir: 'dist', //process.env.VUE_APP_BUILD_DIR + '_DIST'
  assetsDir: './assets',
  //第三方插件转译
  transpileDependencies: [],
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,
  // filenameHashing:true,
  // 开发服务
  devServer: {
    disableHostCheck: true,
    port: 8080,
    open: true,
    hot: true,
    proxy: {
      // 配置代理，接口跨域时本地代理
      '/testApi': {
        target: 'https://nullno.com', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/testApi': '/'
        }
      }
    }
  },
  // 自定义打包规则
  chainWebpack: config => {
    //图片打包规则
    const imagesRule = config.module.rule('images');
    imagesRule.uses.clear();
    imagesRule
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 1,
        fallback: {
          loader: 'file-loader',
          options: {
            // 图片名配置
            name: './assets/img/[name].[ext]'
            //可设置图片cdn分离路径
            //publicPath: './'
          }
        }
      });
  }
};
