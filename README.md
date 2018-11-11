# Webpack + React全栈工程架构项目

## 技术栈：

>前端技术栈

```
React + Mobx + MaterialUI
```

>后端技术栈

```
React服务端渲染 + express + express-session (未来将会引进MongooDB+Mongoose)
```

## 学到什么？

> 1.前台不适用create-react-app搭建，手动搭建前端开发环境和线上环境

```
包括：
1：react开发环境webpack4的基本配置；
2：前端代码热更新配置，
3：服务端代理配置
4：基本babel配置
5：保证前端开发每次请求的js代码都是最新的（非build）
    ----webpack动态编译，把每次的结果编译到内存，每次请求客户端代理服务器读取内存里面的js代码返回给前端
6：路由权限控制；
7：materailUI基本使用
8：mobx基本使用
```

>后台

```
包括:
1：客户端代理
2：服务端数据渲染数据如何和前端保持一致---把后端js数据注入到前端的一个全局变量（__STATE_SATE__）
3：同构
4：服务端渲染
5：搭建express服务器
6：通过session对权限进行基本控制(进行中....)
```



## USE
>安装依赖

```
yarn
或者
npm install
```

>客户端启动

```
 yarn dev:client
 或者
 npm run dev:client

```

>代理服务器启动

```
 yarn dev:server
 或者
 npm dev:server
```

### 效果图

![image](https://github.com/zhoutengshen/my-cnode/blob/master/img.gif)
