# 电影信息

本项目是根据imooc中Scott老师的《node+mongodb建站攻略（一，二期）》课程完成的，非常感谢慕课网的老师们。

## 使用框架和类库

本项目使用node作为后台开发语言，并以express4.X为类库，mongodb为数据库开发的。
node库使用相关类库

- express4.x
- jade
- mongoose
- underscore
- path
- body-parser

前端使用相关类库

- bootstrap
- jquery

## 项目介绍

本项目主要有6个页面，分别为：首页，列表页，新增录入页，详情页面，登入登出页，用户列表页。处理逻辑有新增，修改，删除操作。

## tips

clone或者直接下载本代码库后，需要安装node，mongodb环境，之后再项目根目录下运行npm install && bower install 安装应用到的类库。
输入grunt启动服务，在http://localhost:3000访问。
默认数据的mongodb地址在public\libs，默认一个管理员用户为 ：账号：gaoxiang   密码：gaoxiang
