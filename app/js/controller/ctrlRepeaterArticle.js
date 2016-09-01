//全文
angular.module("myapp").controller("ctrlRepeaterArticle", function($scope, articleObserve) {
	$scope.ifShow = false;
	articleObserve.order({
		onOpen: function(article) {
			$scope.paragaraphs = paragaraph(article.Sections);
		},
		onSectionIndexChanged: function(article, oldIndex, newIndex) {
			console.log(newIndex)
		}
	});

	$scope.onSectionSelected = function(target) {
		articleObserve.go(target);

	}

	// 分段
	function paragaraph(sections) {
		var result = [];
		var p = [];

		for(var i = 0; i < sections.length; i++) {
			sections[i].index = i;
			p.push(sections[i]);

			// 分段
			if(sections[i].sentence != null && (sections[i].sentence.endsWith("\n") || i == sections.length - 1)) {
				result.push(p);
				p = [];
			}
		}

		return result;
	};
	//点击显示
	$scope.clickShow=function(){
		$scope.ifShow = !$scope.ifShow;
	};
	
	//控制器内
});