module.exports = {
    devServe:{
        host:'localhost',
        port:3000,
        https:true,
    },
    build: {
        src: 'src',
        dist: 'dist',
        tmp: '.tmp',
        static: 'public',
        paths: {
            styles: 'assets/styles/*.scss',
            scripts: 'assets/scripts/*.js',
            htmls: '*.html',
            images: 'assets/images/**',
            fonts: 'assets/fonts/**'
        }
    },
    data: {
        menus: [
            {
                name: '首页',
                icon: 'aperture',
                link: 'index.html'
            },
            {
                name: '主营',
                link: 'features.html'
            },
            {
                name: '关于',
                link: 'about.html'
            },
            {
                name: '联系',
                link: '#',
                children: [
                    {
                        name: 'Twitter',
                        link: 'https://twitter.com/w_zce'
                    },
                    {
                        name: 'About',
                        link: 'https://weibo.com/zceme'
                    },
                    {
                        name: 'divider'
                    },
                    {
                        name: 'About',
                        link: 'https://github.com/zce'
                    }
                ]
            }
        ],
        pkg: require('../package.json'),
        date: new Date()
    }
}