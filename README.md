# React 基础使用demo，based on React.16.4.1

> react 官网：https://reactjs.org/
>
> 先决条件：安装nodejs，[官网](https://nodejs.org/en/)
>
> 本次教程基于环境、使用工具、版本：
>
> ​	nodejs：8.11.3
>
> ​	react：16.4.1
>
> ​	npm：6.1.0

# 1.创建项目

## 1.1 安装 create-react-app

```sh
npm install -D create-react-app@1.5.2
```

## 1.2 创建react项目

```sh

```

创建好之后的项目结构

![](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180713113305145-1617706627.png)

其中：

- public/index.html是整个项目的入口文件，我们可以在该文件中添加一些CDN资源，如jQuery等。

  > 在index.html中，有一个根容器：<div id="root"></div> 
  >
  > 

- src文件夹：

- src/index.js：跟index.html相关联，会将该js中声明的组件渲染到public/index.html中 "id=root" 的容器内

  ![](https://images2018.cnblogs.com/blog/1101407/201807/1101407-20180713144814373-1366441329.png)

