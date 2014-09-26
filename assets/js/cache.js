//从缓存读取上次关闭时的状态
function Cache(storageObject) {
	this._storageObject = storageObject
}

Cache.prototype = {

	get : function(name, defaultValue) {
		var cache = this._storageObject.getItem(name)
		if(cache) {
			try{
				cache = JSON.parse(cache)
			} catch(e) {
				cache = defaultValue
			}
		}
		return cache || defaultValue
	},

	set : function(name, value) {
		var cache = JSON.stringify(value)
		this._storageObject.setItem(name, cache)
	},

	remove : function(name) {
		this._storageObject.removeItem(name)
	}
}

module.exports = Cache