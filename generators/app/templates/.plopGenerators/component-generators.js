module.exports = plop => {
    plop.setGenerator('component', {
        description: 'create a component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'component name (default myComponent)',
                default: 'myComponent'
            }
        ],

        actions: [
            {
                type: 'add',
                templateFile: 'plop-templates/.components-template/template.js.hbs',
                path: 'components/{{name}}/{{name}}.js',
            },
            {
                type: 'add',
                templateFile: 'plop-templates/.components-template/template.json.hbs',
                path: 'components/{{name}}/{{name}}.json',
            },
            {
                type: 'add',
                templateFile: 'plop-templates/.components-template/template.wxml.hbs',
                path: 'components/{{name}}/{{name}}.wxml',
            },
            {
                type: 'add',
                templateFile: 'plop-templates/.components-template/template.wxss.hbs',
                path: 'components/{{name}}/{{name}}.wxss',
            }
        ]
    })
}