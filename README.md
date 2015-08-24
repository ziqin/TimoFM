# TimoFM
---
> An full-featured DoubanFM client

我自己是豆瓣电台的重度用户，用过最好的客户端是windows下的[kfstorm](http://www.kfstorm.com/blog/doubanfm/)，从各方面来说，这个客户端都堪称完美，唯一的遗憾是没有mac版本的，而mac平台下的各种豆瓣电台都不太好用，之前一直使用的是[diumoo](http://diumoo.net)，感觉还是缺了一些功能，比如频道搜索，专辑搜索等。所以用[Electron](http://electron.atom.io)(~~node-webkit~~)和[Polymer](http://www.polymer-project.org/))做了这个客户端，主要是解决自己日常使用的问题。


### Download
---
- [mac](http://pan.baidu.com/s/1ntHoBwP#path=%252FAPP)

### Release Page
---
- [Release page](https://github.com/sapjax/TimoFM/releases)

### Features
---
- auto change player's ui color after album changed
- base on HTML5, NodeJS, Polymer
- search user channel
- search album
- play similar songs
- global shortcut
- single circle
- play last song
- music fast forward
- desktop lyric
- show playlist
- desktop notification


### Screenshot
---
<img src="assets/images/capture1.png" width="400" height=200 title="主界面" />

### Tips
---
- Click the album cover can open setting panel
- Double click the album cover will visit album's douban page

### ToDo
---
- [x] Album search should be return the real album. (the result is similar songs now)

### Development
---
- `npm install`
- `npm start`
- build & pack : `npm run pack`

### License
---
MIT
