angular.module("myapp").controller("ctrlRepeaterPlay", function($scope, articleObserve) {

	$scope.player = new Player();//新建一个播放实例
	$scope.maxRepeatTime = 3;//复读模式最大复读次数
	$scope.maxRandomModeRepeatTime = 1;//随机播放模式最大复读次数

	var MODE_NORMAL = Player.MODE_NORMAL;
	var MODE_REPEAT = Player.MODE_REPEAT;
	var MODE_REPEAT_TIMES = 2; // 复读指定的次数
	var MODE_RANDOM = 3; // 随机播放

	var mode = MODE_NORMAL;//  模式
	var sectionLength = 0;
	var randomIndex = 0;


	articleObserve.order({
		onOpen: function(article) {
			console.log(article);
			// 初始化播放器
			var url = "https://li-kang.github.io/repeater/app/source/03.mp3";
//			$scope.player.open("source/03.mp3");
			$scope.player.open(url);
			$scope.player.gapTurn = true;
			$scope.player.gapTime = 0;
			$scope.setPlayMode(MODE_NORMAL);
			$scope.player.autoplay = true;
			$scope.play();

			// 获取Sections
			sectionLength = article.Sections.length;
			
//			region.total = article.duration;
		},

		onSectionIndexChanged: function(article, oldIndex, newIndex) {
			var start = article.Sections[newIndex].time/1000;
			var end = (newIndex + 1 < article.Sections.length ? article.Sections[newIndex+1].time/1000 : $scope.player.duration);	
			
			$scope.player.section(start,end);
			$scope.sectionTotal = $scope.player.duration();
			$scope.sectionStart = start;
			$scope.sectionEnd = end;
			
		}
	});

	$scope.setPlayMode = function(value) {
		mode = value;

		switch(mode) {
			case MODE_NORMAL:
				$scope.player.mode = Player.MODE_NORMAL;
				break;

			case MODE_REPEAT:
				$scope.player.mode = Player.MODE_REPEAT;
				break;

			case MODE_REPEAT_TIMES:
				$scope.player.mode = Player.MODE_REPEAT;
				break;

			case MODE_RANDOM:
				$scope.player.mode = Player.MODE_REPEAT;
				break;
		}
	}
	
//	$scope.player.onStateChanged = function() {
//		
//	}

	//播放完段落一次
	$scope.player.onSectionOnce = function(){
		console.info("MODE SELECTED" + mode);

		switch(mode) {
			case MODE_NORMAL:
				articleObserve.next();
				$scope.$apply();
				console.log("Normal");
			break;

			case MODE_REPEAT:
				console.log("Repeat  "+$scope.player.repeatTimes);
				break;

			case MODE_REPEAT_TIMES:
				console.log("Repeat  "+$scope.player.repeatTimes);
				if($scope.player.repeatTimes >= $scope.maxRepeatTime){
					articleObserve.next();
					$scope.$apply();
				}
			break;

			case MODE_RANDOM:
				if ($scope.player.repeatTimes >= $scope.maxRandomModeRepeatTime) {
					console.log("Random  "+" "+$scope.player.repeatTimes+"  "+$scope.maxRandomModeRepeatTime);
					randomIndex = Math.floor(Math.random() * sectionLength);
					articleObserve.go(randomIndex);
					$scope.$apply();
				}
			break;
		}

	};

	$scope.onOff = false;

	$scope.play = function() {
		if($scope.onOff) {
			$scope.player.pause();
		} else {
			$scope.player.play();
		}
		$scope.onOff = !$scope.onOff

	}
	
	
	$scope.onNum=0
	
	$scope.onNumFn=function(){
		$scope.onNum++
	}
	
	$scope.showMode_normal=function(onNum){
		if (onNum%3==0) {
			$scope.setPlayMode(MODE_NORMAL);
			return true;
		} else{
			return false;
		}
		
	}
	$scope.showMode_random=function(onNum){
		if (onNum%3==1) {
			$scope.setPlayMode(MODE_RANDOM);
			return true;
		} else{
			return false;
		}
	}
	$scope.showMode_repeat=function(onNum){
		if (onNum%3==2) {
			$scope.setPlayMode(MODE_REPEAT);
			return true;
		} else{
			return false;
		}
	}
	
	
	
});