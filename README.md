# Zgp Generator 

`generator-zgp` creates a base template to start a new wechat's mini program and a new program `pages-boilerplate`.

## Install

```
$ npm install --global generator-zgp
```


## Usage

```
$ yo zgp
$ yo zgp:boiler
```

### Sub generators

- `zgp:boiler`

默认创建的是微信小程序项目，该项目是微信标准版小程序结构，已经集成 redux ，集成 plop 

如果是创建的小程序项目，请自行调整名称，appid ，appid 可以创建之后手动完善

创建小程序项目之后先安装依赖 `npm install`

创建页面：`yarn plop page` | `npm run plop page`

    主包页面直接创建在 pages 下边，如果创建分包页面，将 pages 改成其它任何页面就行，注意小程序限制，这里没做任何限制

创建组件：`yarn plop component` | `npm run plop component`

    自动创建的组件只在 components 下方创建，在哪儿定义需要自行