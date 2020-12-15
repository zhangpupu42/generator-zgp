module.exports = plop => {
    plop.setHelper('getDir', function (dir) {
        return dir ? '/' + dir : '';
    });
    plop.setHelper('level', function (package, dir, name) {
        const filePath = `${package}${dir}/${name}/${name}`
        const level = filePath.split('/').length - 1
        let str = ''
        for (let i = 0; i < level; i++) {
            str += '../'
        }
        return str;
    });
    plop.setGenerator('page', {
        description: 'create a page',
        prompts: [
            {
                type: 'input',
                name: 'package',
                message: 'Packages (default pages)',
                default: 'pages'
            },
            {
                type: 'input',
                name: 'dir',
                message: 'Dir (default empty)',
                default: ''
            },
            {
                type: 'input',
                name: 'name',
                message: 'pages name (default pagesName)',
                default: 'pagesName'
            }
        ],

        actions: [
            {
                type: 'add',
                templateFile: 'plop-templates/pages-template/template.js.hbs',
                path: '{{package}}{{getDir dir}}/{{name}}/{{name}}.js',
            },
            {
                type: 'add',
                templateFile: 'plop-templates/pages-template/template.json.hbs',
                path: '{{package}}{{getDir dir}}/{{name}}/{{name}}.json',
            },
            {
                type: 'add',
                templateFile: 'plop-templates/pages-template/template.wxml.hbs',
                path: '{{package}}{{getDir dir}}/{{name}}/{{name}}.wxml',
            },
            {
                type: 'add',
                templateFile: 'plop-templates/pages-template/template.wxss.hbs',
                path: '{{package}}{{getDir dir}}/{{name}}/{{name}}.wxss',
            }
        ]
    })
}