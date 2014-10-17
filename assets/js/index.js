var webSDK = require('dbfm-web-sdk')
var appSDK = require('dbfm-app-sdk')
var playlist = require('./assets/js/playlist')
var observer = require('./assets/js/observer')
var cache = require('./assets/js/cache')

//全局对象
FM = { debug : false}
//消息控制器
FM.obs = new observer()
//豆瓣API web
FM.webSDK = new webSDK();
//豆瓣API app
FM.appSDK = new appSDK()
//缓存控制器
FM.cache = new cache(localStorage)
//播放列表
FM.playlist = new playlist(FM.obs)
//播放器状态
FM.status = FM.cache.get('CACHE:STATUS', { channel : { id : 0}, playlist: [], song : {}})
//播放器配置
FM.config = FM.cache.get('CACHE:CONFIG', { hotKey : {}, mediaKey : true, notification : true, lyric : false})

//播放器状态变化时，触发状态更新事件
Object.observe(FM.status, function(changes) {
    FM.cache.set('CACHE:STATUS', FM.status)
})

//登录后重新拉取列表
FM.obs.on('LOGIN:UPDATE', function() {
    FM.playlist.clean()
})

//列表发生变化后，缓存状态
FM.obs.on('PLAYLIST:UPDATE', function(list) {
    //更新列表缓存状态
    FM.status.playlist = FM.playlist.getRest()

    //列表歌曲不足时自动补充
    if(FM.playlist.isEmpty(1) || FM.playlist.isEnd(1)) {
        FM.appSDK.songs({
            channel_id : FM.status.channel.id,
            sid : FM.status.song.id
        },function(err, songs) {
            if(err) return console.error(err)
            FM.playlist.concat(songs)
        })
    }
})

//列表当前项变化后，触发歌曲更新
FM.obs.on('PLAYLIST:MOVE', function(current) {
    if(current && current != FM.status.song) {
        FM.obs.emit('SONG:UPDATE', current)
        FM.status.song = current
    }
})

//重置播放列表，触发歌曲更新
//等polymer-ready事件触发后执行，避免其他的组件监听不到SONG:UPDATE事件
window.addEventListener('polymer-ready', function() {
    FM.playlist.reset(FM.status.playlist)
})
