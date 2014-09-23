var events =  require('events')
var util = require('util')
var webSDK = require('dbfm-web-sdk')
var appSDK = require('dbfm-app-sdk')
var playlist = require('./assets/js/playlist')

var Observer = function() {
	events.EventEmitter.call(this)
}
util.inherits(Observer, events.EventEmitter)

//全局控制器
FM = { debug : false }
//消息控制器
FM.obs = new Observer()
//豆瓣API web
FM.webSDK = new webSDK();
//豆瓣API app
FM.appSDK = new appSDK()
//播放状态缓存
FM.status = getCacheStatus()
//播放列表
FM.playlist = new playlist([FM.status.song])

//播放列表变化时，触发歌曲更新事件
Object.observe(FM.playlist, function(changes){
	changes.forEach(function(change) {
		if(!FM.playlist.current || FM.playlist.length <= 1) {
			FM.obs.emit('SONG:EMPTY')
		} else if(FM.playlist.current != change.oldValue[0]) {
			FM.obs.emit('SONG:UPDATE', FM.playlist.current)
		}
	});
});

//歌曲状态变化时，触发状态更新事件
Object.observe(FM.status, function(changes) {
	FM.obs.emit('STATUS:UPDATE', FM.status)
	changes.forEach(function(change) {
		if(change.name == 'channel') {
			FM.obs.emit('CHANNEL:UPDATE', FM.status.channel)
		}
	});
})

FM.obs.on('STATUS:UPDATE', setCacheStatus)

//从缓存读取上次关闭时的状态
function getCacheStatus() {
	var status =  { channel : { id : 0, name: '私人频道' }, song : {} }
	var cache = localStorage.getItem('CACHE:STATUS')
	if(cache) {
		status = JSON.parse(cache)
	}
	return status
}

//设置歌曲状态缓存
function setCacheStatus () {
	var status  = JSON.stringify(FM.status)
	localStorage.setItem('CACHE:STATUS', status)
}

//根据当前的频道id拉取歌曲列表
function fetchSongs () {
	FM.appSDK.songs({
		channel_id : FM.status.channel.id,
		sid : FM.status.song.id
	},function(err, songs) {
		if(err) return console.error(err)
		FM.playlist.reset(songs)
	})
}

//登录后拉取列表
FM.obs.on('LOGIN:UPDATE', fetchSongs)

//列表空了之后，重新拉取
FM.obs.on('SONG:EMPTY', fetchSongs)

//歌曲更新时更新状态
FM.obs.on('SONG:UPDATE', function(song) {
	FM.status.song = song
})

//颜色变更后，重新设置界面颜色
FM.obs.on('COLOR:UPDATE', function(colors) {
	document.body.style.background = colors.background
	document.body.style.color = colors.content[0]
})

window.addEventListener('polymer-ready', function() {
	document.body.classList.add('ready')
})







