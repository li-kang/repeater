function Player() {
    //变量声明
    this.domAudio = null;//音频对象
    this.mode = Player.MODE_NORMAL; //播放模式
    this.state = 0; // 播放状态
    this.isSeeking = false;

    //------------复读小节----------
    this.sectionStart = 0;//播放开始小节
    this.sectionEnd = 0;//播放结束小节
    this.repeatTimes = 0;// 复读次数

    //------------句间停顿--------------
    this.gapTurn = false;//暂停开关
    this.gapTime = 3;//间歇时间 单位秒
    this._gapInterval = null;//暂停状态(计时器)
}

//播放模式
Player.MODE_NORMAL = 0;//普通模式
Player.MODE_REPEAT = 1;//复读模式


//设置复读小节
Player.prototype.section = function(start, end) {
	if (end < start) {
		throw "复读区间设置异常 end < start";
	}
	this.sectionStart = start;
	this.sectionEnd =end;
	
	this.repeatTimes = 0;

    if (this._outSection()) {
        this.goStart();
    }
};

//获取或设置静音开关 
Player.prototype.muted = function(value) {
    if (arguments.length == 0) {
        return this.domAudio.muted;
    }else {
        this.domAudio.muted = value;
    }
};


//获取或设置音量
Player.prototype.volume = function(value) {
	if (arguments.length == 0) {
		return this.domAudio.volume;
	}else {
		this.domAudio.volume = value;
	}
};

//获取音频时长
Player.prototype.duration = function() {
	return this.domAudio.duration;
};

//初始化音频文件，传参地址
Player.prototype.open = function (url) {
    //构建audio标签
    if (!this.domAudio) {
	    var audioBox = document.createElement("audio");
	    audioBox.innerHTML = "抱歉，您的浏览器暂不支持音频播放！";
	    this.domAudio = audioBox;//获取音频对象
//	    this.domAudio.onreadystatechange = this._onreadystatechange;
		var _this = this;
		this.domAudio.onpause = function() {
			_this.setState(0);
		};
		this.domAudio.onplaying = function() {
			_this.setState(1);
		};
		this.domAudio.onwaiting = function() {
			_this.setState(2);
		};
    }
    this.domAudio.src = url;
    this.domAudio.load();
    //初始化变量
    this.sectionStart = 0;//初始化音频起始点
    this.sectionEnd = 0;//初始化音频结束点
};

//音频播放
Player.prototype.play = function () {
    console.info("音频开始播放");
    this.domAudio.play();//播放

	var _this = this;
	this.domAudio.ontimeupdate = function() {
		_this.positionChanged();
	}
	
	//清除句间停顿定时器
	clearTimeout(Player._gapInterval);
};

//音频暂停
Player.prototype.pause = function () {
    this.domAudio.pause();
    // TODO //清除句间停顿定时器 clearTimeout(Player._gapInterval); ？
};

Player.prototype.setState = function(value) {
	this.state = value;
	
	if (typeof(this.onStateChanged)=="function"){
		this.onStateChanged(value);
	}
}

Player.prototype._outSection = function() {
    return this.domAudio.currentTime > this.sectionEnd || this.domAudio.currentTime < this.sectionStart;
};

//播放状态改变
Player.prototype.positionChanged = function () {

    if (!isSeeking && this.domAudio.currentTime > this.sectionEnd) {//
        console.info("切换段落完成成功！" + this.domAudio.currentTime + "," + this.sectionStart + ", " + this.sectionEnd);
        this.sectionOnce();
    }
};
//小节完成
Player.prototype.sectionOnce = function () {

    switch (this.mode) {
        case Player.MODE_NORMAL://顺序模式
            console.info("普通模式播放！");
            break;

        case Player.MODE_REPEAT://复读模式
            console.info("复读模式播放！第" + (this.repeatTimes) + "次");
            this.goStart();
            this.repeatTimes++;
            break;
    }

    if (this.gapTurn) {
        this.domAudio.pause();
        var _this = this;
        this._gapInterval = setTimeout(function () {
            console.info("句间停顿");
            _this.domAudio.play();
        }, this.gapTime * 1000);
    }

    if (typeof(this.onSectionOnce)=="function"){
    	this.onSectionOnce();
    }
};
Player.prototype.goStart = function () {
//	if (this.domAudio.readyState == this.domAudio.HAVE_ENOUGH_DATA)
    	this.seek(this.sectionStart);
};

Player.prototype.seek = function(position) {
	var _this = this;
	isSeeking = true;
	
	var timeout = setInterval(doseek, 100);
	function doseek(){
		if (_this.domAudio.readyState == _this.domAudio.HAVE_ENOUGH_DATA){
			_this.domAudio.currentTime = position;
			clearTimeout(timeout);
			console.log("clearTimeout");
			isSeeking = false;
		}
	};
	
}

// 事件
Player.prototype.onSectionOnce = null; // 小节播放完1次
Player.prototype.onStateChanged = null; // 