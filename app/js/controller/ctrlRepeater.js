angular.module("myapp").controller("ctrlRepeater", function($scope, $http, articleObserve) {

	$scope.observer = articleObserve;

	$http.get("source/lrc/E201.lrc").success(function(data) {
		articleObserve.open(data);
		articleObserve.next();
	});

})