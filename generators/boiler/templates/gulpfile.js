// 实现这个项目的构建任务
const { src, dest, series, parallel, watch } = require('gulp')
const del = require('del')
const bs = require('browser-sync').create()
const plugins = require('gulp-load-plugins')()
const baseConfig = require('./gulpFiles/baseConfig')
const devServerConfig = require('./gulpFiles/devServer.config')
const clean = () => {
    return del([baseConfig.build.dist, baseConfig.build.tmp])
}
const style = () => {
    return src(baseConfig.build.paths.styles, { base: baseConfig.build.src, cwd: baseConfig.build.src })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest(baseConfig.build.tmp))
        .pipe(bs.reload({ stream: true }))
}
const script = () => {
    return src(baseConfig.build.paths.scripts, { base: baseConfig.build.src, cwd: baseConfig.build.src })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest(baseConfig.build.tmp))
        .pipe(bs.reload({ stream: true }))
}
const html = () => {
    return src(baseConfig.build.paths.htmls, { base: baseConfig.build.src, cwd: baseConfig.build.src })
        .pipe(plugins.swig({ data: baseConfig.data, defaults: { cache: false } }))
        .pipe(dest(baseConfig.build.tmp))
        .pipe(bs.reload({ stream: true }))
}
const image = () => {
    return src(baseConfig.build.paths.images, { base: baseConfig.build.src, cwd: baseConfig.build.src })
        .pipe(plugins.imagemin())
        .pipe(dest(baseConfig.build.dist))
}
const font = () => {
    return src(baseConfig.build.paths.fonts, { base: baseConfig.build.src, cwd: baseConfig.build.src })
        .pipe(plugins.imagemin())
        .pipe(dest(baseConfig.build.dist))
}
const static = () => {
    return src("**", { base: baseConfig.build.static, cwd: baseConfig.build.static })
        .pipe(dest(baseConfig.build.dist))
}
const watchs = () => {
    watch(baseConfig.build.paths.styles, { cwd: baseConfig.build.src }, style)
    watch(baseConfig.build.paths.scripts, { cwd: baseConfig.build.src }, script)
    watch(baseConfig.build.paths.htmls, { cwd: baseConfig.build.src }, html)
    watch([baseConfig.build.paths.images, baseConfig.build.paths.fonts], { cwd: baseConfig.build.src }).on('change', () => { bs.reload })
    watch("**", { cwd: baseConfig.build.static }).on('change', () => { bs.reload })
}
const server = () => {
    bs.init(devServerConfig)
}
const useref = () => {
    return src(baseConfig.build.paths.htmls, { base: baseConfig.build.tmp, cwd: baseConfig.build.tmp })
        .pipe(plugins.useref({ searchPath: ['..', '.'] }))
        .pipe(plugins.if('*.js', plugins.uglify()))
        .pipe(plugins.if('*.css', plugins.cleanCss()))
        .pipe(plugins.if('*.html', plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        })))
        .pipe(dest(baseConfig.build.dist))
}

const compile = parallel(style, script, html)
const build = series(clean, parallel(series(compile, useref), image, font, static))
const develop = series(clean, compile, parallel(watchs, server))
const cu = series(clean, compile, useref)

module.exports = {
    clean,
    compile,
    build,
    develop,
    useref,
    cu
}