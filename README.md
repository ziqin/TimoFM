豆瓣电台 node-webkit版，界面风格大量照搬了kfstorm（http://www.kfstorm.com/blog）的电台设计

##### download
    - mac版(http://pan.baidu.com/s/1pJ7GvRt)
    - linux版 (暂无)
    - windows版 (暂无)

<img src="assets/images/dbfm1.png" width="400" height=200 />

<img src="assets/images/dbfm3.png" width="400"  height=200  />

<img src="assets/images/dbfm5.png" width="400"  height=200  />

<img src="assets/images/dbfm6.png" width="400"  height=200  />

##### todo
    - bug修复，稳定性增强
    - 全局快捷键(50%)
    - 设置(快捷键配置，是否显示歌词，桌面通知，频谱，设置导入导出) (50%)
    - 频道收藏 
    - 桌面通知(done)
    - 频谱
    - 歌词
    - 任务栏图标根据红心变化
    - 自动检查更新
    - 优化字体显示
    

##### 开发 (https://github.com/rogerwang/node-webkit/wiki/How-to-run-apps)
    - 安装node-webkit
    - 进入源码根目录，npm install
    - 执行`nw ./`
    - 解码器可能有问题，可以使用下载的app中的node-webkit和ffmpegsumo.so， 参考[node-webkit wiki](https://github.com/rogerwang/node-webkit/wiki/Using-MP3-%26-MP4-%28H.264%29-using-the--video--%26--audio--tags.)
