function Playlist(obs) {
	//传入一个消息控制器
	this.obs = obs
	this._list = []
}
Playlist.prototype = {

	//列表变化事件名称
	updateEvent : 'PLAYLIST:UPDATE',

	//当前项改变事件名称
	moveEvent : 'PLAYLIST:MOVE',

	//当前索引
	index : 0,

	//列表当前项
	get current() {
		return this._list[this.index]
	},

	//列表是否为空，可以传入一个参数，当列表项少于这个数时，也认为是空
	isEmpty : function(n) {
		return this._list.length <= n
	},

	//是否移动到了列表的末尾，可以传一个参数，当距离小于这个数时，也认为是到了末尾
	isEnd : function(n) {
		return  this.index >= this._list.length - 1 - n
	},

	//重置列表
	reset : function(list) {
		this._list = list
		this.index = 0
		this.obs.emit(this.updateEvent, this._list)
		this.obs.emit(this.moveEvent, this.current)
		return this._list
	},

	//移除当前元素
	removeCurrent : function() {
		this._list.splice(this.index, 1)
		this.obs.emit(this.updateEvent, this._list)
		this.obs.emit(this.moveEvent, this.current)
		return this.current
	},

	//移动当前索引到下一个位置
	next : function() {
		this.index = this.index+1
		this.obs.emit(this.updateEvent, this._list)
		this.obs.emit(this.moveEvent, this.current)
		return this.current
	},

	//移动当前索引到前一个位置
	prev : function() {
		this.index = this.index - 1
		this.obs.emit(this.updateEvent, this._list)
		this.obs.emit(this.moveEvent, this.current)
		return this.current
	},

	//追加列表内容
	concat : function(list) {
		this._list = this._list.concat(list)
		this.obs.emit(this.updateEvent, this._list)
		return this._list
	},

	//替换当前元素后面的列表内容
	replaceRest : function(list) {
		this._list = this._list.slice(0, this.index).concat(list)
		this.obs.emit(this.updateEvent, this._list)
		return this._list
	},

	//获取当前项，以及当前项后面的所有项
	getRest : function() {
		return this._list.slice(this.index)
	}
}

module.exports = Playlist