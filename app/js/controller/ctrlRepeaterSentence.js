//单句
angular.module("myapp").controller("ctrlRepeaterSentence",function($scope,articleObserve){
    $scope.data = {};
    $scope.data.nowSentence=null;
    $scope.data.nowTranslate=null;
    
    articleObserve.order({
        onOpen: function(article) {

        },
        onSectionIndexChanged: function(article, oldIndex, newIndex) {
            $scope.data.nowSentence=article.Sections[newIndex].sentence;
            $scope.data.nowTranslate=article.Sections[newIndex].translation;
//			$scope.data.nowSentence = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
			
        }
    });
    
    $scope.iconeye=true
    $scope.iconEyeFn=function(){
    	$scope.iconeye=!$scope.iconeye
    }
});