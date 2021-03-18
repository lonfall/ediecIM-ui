module.exports = {
    devServer: {
        port: 8849, // 启动端口
        open: true  // 启动后是否自动打开网页
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    outputDir: 'ediec',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: () => {
    },
    configureWebpack: () => {
    }
}
