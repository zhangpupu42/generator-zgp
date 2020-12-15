const fs = require('fs')
const path = require('path')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: `Your project name(${this.appname})`,
                default: this.appname
            },
            {
                type: 'input',
                name: 'appid',
                message: `Your project appid(default empty string)`,
                default: ''
            }
        ])
            .then(answers => {
                this.answers = answers
            })
    }
    writing() {
        let paths = []
        readFiles(paths, 'templates')

        paths.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}

function readFiles(paths, dir) {

    const files = fs.readdirSync(path.join(__dirname, dir));

    files.forEach(file => {

        let newPath = path.join(dir, file);

        if (fs.statSync(path.join(__dirname, newPath)).isDirectory()) { // 是目录

            readFiles(paths, newPath); // 递归

        } else { // 是文件
            newPath = newPath.replace(/^templates(\/|\\)/, '')
            console.log('newPath:', newPath)
            paths.push(newPath)
            console.log('paths:', paths)

        }

    })

}