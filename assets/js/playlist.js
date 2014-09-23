function Playlist(list) {
	this._list = list || []
}
Playlist.prototype = {
	get current() {
		return this._list[0]
	},

	get length() {
		return this._list.length
	},

	//重置列表
	reset : function(list) {
		this._list = list
		return this._list
	},

	//列表中下一个
	next : function() {
		this._list = this._list.slice(1)
		return this.current
	},

	//追加列表内容
	concat : function(list) {
		this._list = this._list.concat(list)
		return this._list
	},

	//替换当前元素面的列表内容
	replaceRest : function(list) {
		this._list = [this.current].concat(list)
		return this.list
	}
}

module.exports = Playlist