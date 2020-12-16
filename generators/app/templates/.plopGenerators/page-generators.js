const del = require('del')
module.exports = plop => {
    plop.setHelper('getDir', getDir);
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

        actions: function (data) {
            let actionList = []
            const jsAction = {
                type: 'add',
                templateFile: 'plop-templates/pages-template/template.js.hbs',
                path: '{{package}}{{getDir dir}}/{{name}}/{{name}}.js',
            }
            const jsonAction = {
                type: 'add',
                templateFile: 'plop-templates/pages-template/template.json.hbs',
                path: '{{package}}{{getDir dir}}/{{name}}/{{name}}.json',
            }
            const wxmlAction = {
                type: 'add',
                templateFile: 'plop-templates/pages-template/template.wxml.hbs',
                path: '{{package}}{{getDir dir}}/{{name}}/{{name}}.wxml',
            }
            const wxssAction = {
                type: 'add',
                templateFile: 'plop-templates/pages-template/template.wxss.hbs',
                path: '{{package}}{{getDir dir}}/{{name}}/{{name}}.wxss',
            }
            const addTmpAppJsonAction = {
                type: 'add',
                templateFile: 'app.json',
                path: '.tmp.app.json',
                force: true
            }
            const modifyAppJsonAction = {
                type: 'modify',
                templateFile: 'app.json',
                path: 'app.json',
                data: { package: '{{package}}' },
                transform: function (contents) {
                    const cont = JSON.parse(contents)
                    if (data.package == 'pages') {
                        const url = `${data.package}${getDir(data.dir)}/${data.name}/${data.name}`
                        cont.pages.push(url)
                    } else {
                        const url = `${getDir(data.dir, false)}${data.dir?'/':''}${data.name}/${data.name}`
                        let i = cont.subpackages.length
                        if (i > 0) {
                            let flag = true
                            while (i) {
                                if (cont.subpackages[i - 1].root === data.package) {
                                    flag = false
                                    cont.subpackages[i - 1].pages.push(url)
                                    break
                                }
                                i--
                            }
                            if(flag){
                                cont.subpackages.push({
                                    root: data.package,
                                    pages: [url]
                                })
                            }
                        } else {
                            let obj = {}
                            obj.root = data.package
                            obj.pages = [url]
                            cont.subpackages.push(obj)
                        }
                    }
                    return JSON.stringify(cont, null, '\t')
                }
            }
            actionList.push(jsAction)
            actionList.push(jsonAction)
            actionList.push(wxmlAction)
            actionList.push(wxssAction)
            actionList.push(addTmpAppJsonAction)
            actionList.push(modifyAppJsonAction)
            return actionList
        }
    })
}

function getDir(dir, abs = true) {

    return abs ? dir ? '/' + dir : '' : dir ? dir : ''
    
}