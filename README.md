# 项目
> 选用技术Vue2.x+Vuex+Vux
> 请求方式axios
> 二次封装脚手架模板-项目-对接口请求-路由 缓存进行组合使用
### 目录结构
<pre>
.
├── README.md
├── dist                     // 项目build目录
├── config                   // 环境变量和入口，出口配置
├── static                   // 静态资源目录
├── build                    // 项目的配置文件目录
│   ├── dev-server.js        // 开发的服务配置
│   ├── webpack-dev-conf.js  // 开发的Webpack 配置文件
│   ├── webpack-prod-conf.js // 生产的Webpack 配置文件
│   ├── webpack-base-conf.js // 基本的Webpack 配置文件
├── package.json             // 项目配置文件
├── src                      // 生产目录
│   ├── assets               // css js 和图片资源
│   ├── common               // 公用方法等
│   ├── components           // 各种组件
│   ├── views                // 各种页面
│   ├── config               // 接口入口图片配置等
│   ├── utils                // 各种工具
│   ├── router               // 路由配置文件夹
│   ├── store                // vuex目录文件夹
│   ├── router               // 路由配置文件夹
│   ├── axiosConfig.js       // axios请求拦截器
│   ├── permission.js        // 权限拦截器
│   └── main.vue             // 根组件
│   └── app.vue               // Webpack 预编译入口
├── index.html               // 项目入口文件
.
</pre>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
