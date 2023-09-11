# FCIP-Faden-Server

   ![Logo](./driver/images/linklogo.gif)

## 写在前前面

作者个人网站 [www.fcip.top](https://www.fcip.top)

推荐 [点击加入QQ群](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=BPVotGnSlCdy9AWXKSw4WlY6XjgJ2Z7O&authKey=4Obq%2FxNAuF7qL3z96uXMoV8KqxiSbtTCbEjYIer38ZW6%2F%2BERcJMTg90BhGRh2iQJ&noverify=0&group_code=798543340) 聊天吹水群**都是小白**。

## 简介
一个能够提供直链的简易项目，面向 ~~我~~ 个人开发者 开发

## 环境准备
* nodejs

## 安装方法：

```bash
#克隆本仓库
git clone https://github.com/Pretend-to/miolinker

#安装依赖
npm i 

#开始运行(pm2请自行安装)
pm2 start app.js --name "MioLinks"

```

## 食用方法：
把你的图片/视频/脚本放到./driver/下的对应目录后

- 图片：
  Eg: http://127.0.0.1:3049/images/linklogo.gif

  可以用来嵌入你的网页
- 视频：
  Eg: http://127.0.0.1:3049/videos/sayu.mp4

  可以用来嵌入你的网页
- 脚本：
  Eg: http://127.0.0.1:3049/scripts/useless.sh

  可以用来方便其他用户执行你的脚本：通过`bash -c "$(wget -O- 你的脚本直链)"`或者`curl -Ls 你的脚本链接 | sudo bash`