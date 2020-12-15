const baseConfig = require('./baseConfig')
module.exports = {
    notify: false,
    port: baseConfig.devServe.port,
    host:baseConfig.devServe.host,
    https:baseConfig.devServe.https?baseConfig.devServe.https:false,
    server: {
        baseDir: [baseConfig.build.tmp, baseConfig.build.src, baseConfig.build.static],
        routes: { // 类似于 vue 里边的 proxy
            '/node_modules': './node_modules'
        }
    }
}