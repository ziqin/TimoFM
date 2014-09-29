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
FM.playlist = new playlist()
//播放器状态
FM.status = FM.cache.get('CACHE:STATUS', { channel : { id : 0}, playlist: [], song : {}})

//播放列表变化时，触发歌曲更新事件
Object.observe(FM.playlist, function(changes){
	changes.forEach(function(change) {
		//列表第一首歌曲有变化时，触发歌曲更新事件
		if(FM.playlist.current != change.oldValue[0]) {
			FM.obs.emit('SONG:UPDATE', FM.playlist.current)
			//更新歌曲状态
			FM.status.song = FM.playlist.current
		}
		//列表歌曲数不够时，补充歌曲
		if(FM.playlist.length <= 1) {
			process.nextTick(fetchSongs)
		}
	});
	//更新列表状态
	FM.status.playlist = FM.playlist.list
});

//播放器状态变化时，触发状态更新事件
Object.observe(FM.status, function(changes) {
	FM.cache.set('CACHE:STATUS', FM.status)
})

//根据当前的频道id拉取歌曲列表
function fetchSongs () {
	FM.appSDK.songs({
		channel_id : FM.status.channel.id,
		sid : FM.status.song.id
	},function(err, songs) {
		if(err) return console.error(err)
		FM.playlist.concat(songs)
	})
}

//登录后重新拉取列表
FM.obs.on('LOGIN:UPDATE', fetchSongs)

//重置播放列表，触发歌曲更新
//等polymer-ready事件触发后执行，避免其他的组件监听不到SONG:UPDATE事件
window.addEventListener('polymer-ready', function() {
	FM.playlist.reset(FM.status.playlist)
})
