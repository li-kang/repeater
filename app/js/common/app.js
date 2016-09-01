var myapp = angular.module("myapp", []);

angular.module("myapp").factory("articleObserve", function() {
	var articleObserve = new ArticleObserve();
	return articleObserve

});



// 兼容判断
if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function (suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	}
}
