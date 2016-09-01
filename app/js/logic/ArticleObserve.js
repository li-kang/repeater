function ArticleObserve() {

	this.orders = [];
	this.sectionIndex = -1;
	this.article = null;

};

//订阅
ArticleObserve.prototype.order = function(item) {

	this.orders.push(item);

};

ArticleObserve.prototype.onOpen = function() {

	for(var i = 0; i < this.orders.length; i++) {
		if(this.orders[i].onOpen) {
			this.orders[i].onOpen(this.article);
		}
	}

};

ArticleObserve.prototype.onSectionIndexChanged = function(article, oldIndex, newIndex) {
		for(var i = 0; i < this.orders.length; i++) {
			if(this.orders[i].onSectionIndexChanged) {
				this.orders[i].onSectionIndexChanged(article, oldIndex, newIndex);
			}
		}
};

//打开
ArticleObserve.prototype.open = function(articleID) {

	var lgc = new ArticleLogic();
	this.article = lgc.getLrcFn(articleID);
	this.onOpen();

};

//跳转
ArticleObserve.prototype.go = function(index) {

	index = parseInt(index);

	var old = this.sectionIndex;
	
	this.sectionIndex = index;

	this.onSectionIndexChanged(this.article, old, this.sectionIndex);
};

//下一个
ArticleObserve.prototype.next = function() {
	var old = this.sectionIndex;
	this.sectionIndex++;

	this.onSectionIndexChanged(this.article, old, this.sectionIndex);
};
//上一个
ArticleObserve.prototype.previous = function() {

	var old = this.sectionIndex;

	this.sectionIndex--;

	this.onSectionIndexChanged(this.article, old, this.sectionIndex);

};