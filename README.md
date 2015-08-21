**TimoFM** -----(MAC平台第二好用的豆瓣电台)

##### 为什么**又**一个豆瓣电台 ?
我自己是豆瓣电台的重度用户，用过最好的客户端是windows下的[kfstorm](http://www.kfstorm.com/blog/doubanfm/)，从各方面来说，这个客户端都堪称完美，唯一的遗憾是没有mac版本的，而mac平台下的各种豆瓣电台都不太好用，之前一直使用的是[diumoo](http://diumoo.net)，感觉还是缺了一些功能，比如频道搜索，专辑搜索等。所以用[Electron](http://electron.atom.io)(~~node-webkit~~)和[Polymer](http://www.polymer-project.org/))做了这个客户端，主要是解决自己日常使用的问题。


##### download
- [mac版本](http://pan.baidu.com/s/1ntHoBwP#path=%252FAPP)

##### 更新日志
- [Release page](https://github.com/sapjax/TimoFM/releases)

##### 特点
- 界面高度抄袭KFStorm的客户端
- 基于HTML5，NodeJS, Polymer开发，理论上可以跨平台，前端同学有需求也可以自己改
- 支持用户创建的兆赫搜索
- 支持专辑模糊搜索（搜索的专辑并非真正的专辑,只是相似歌曲,有待解决）
- 支持频道收藏（暂时只能收藏在本地，未同步服务器）
- 支持收听相似歌曲
- 支持全局快捷键
- 支持单曲循环
- 支持播放上一首
- 支持歌曲快进
- 支持桌面歌词
- 支持查看当前播放列表
- 支持桌面通知


##### 截图
<img src="assets/images/capture1.png" width="400" height=200 title="主界面" />

##### 使用说明
- 单击专辑封面，使封面划开，可以看到设置界面，再次单击可以让封面回来原位
- 双击封面可以跳转到专辑详情页

##### todo
- [x] 专辑搜索结果应该是专辑曲目列表，而不是专辑相似歌曲
- [x] 隐藏任务栏右侧的激活缩略图

##### 从源码运行
- 进入源码根目录，`npm install`
- 执行 `npm start`
- 打包发布: `npm run pack`
