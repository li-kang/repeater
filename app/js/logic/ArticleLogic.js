//歌词逻辑
function ArticleLogic() {}

// 获取歌词的方法    需要把歌词当做数据传递进去 ，会得到解析好的歌词数据
// 将LRC解析成Article对象
ArticleLogic.prototype.getLrcFn = function(data) {

	function LrcFn(lrc) {
		this.lrc = {
			Author: lrc.tags.artist,
			Name: lrc.tags.album,
			Title: lrc.tags.title,
			TitleTranslation: lrc.tags.tt,
			categoryID: lrc.tags.or,
			Sections: this.contentFn(lrc.lines),
			Duration: lrc.lines[lrc.lines.length - 1].time
		};
	};
//					lrcFn.prototype.categoryIDfn = function (id){ //获取categoryID的方法
//						var re = /\w+\s\d+/
//						return id.match(re)[0]
//					}
	//获取中英文翻译
	LrcFn.prototype.contentFn = function(lines) { 
		var arr = [];
		
		if (lines[0].time!=0) {
			arr.push({sentence:null,translation:null ,time:0})
		}
		
		for(var i = 0; i < lines.length; i++) {
			var json = {};
			if(lines[i + 1] == undefined) {
				if(lines[i].txt.split("^").length == 2) {
					json.sentence = lines[i].txt.split("^")[0]; //英文翻译
					json.translation = lines[i].txt.split("^")[1]; //中文翻译
				} else {
					json.sentence = lines[i].txt.split("^")[0];
					json.translation = " ";
				}

			} else {
				if((lines[i + 1].originLineNum - lines[i].originLineNum) > 1) {

					if(lines[i].txt.split("^").length == 2) {

						json.sentence = lines[i].txt.split("^")[0] + "\n"; //英文翻译
						json.translation = lines[i].txt.split("^")[1] + "\n"; //中文翻译
					} else {
						json.sentence = lines[i].txt.split("^")[0] + "\n";
						json.translation = " " + "\n";
					}
				} else {

					if(lines[i].txt.split("^").length == 2) {
						json.sentence = lines[i].txt.split("^")[0]; //英文翻译
						json.translation = lines[i].txt.split("^")[1]; //中文翻译
					} else {
						json.sentence = lines[i].txt.split("^")[0];
						json.translation = " ";
					}
				}

			}

			json.time = lines[i].time; //添加时间
			arr.push(json);
			
		}
		console.log(arr)
		return arr;
	};

	//把毫秒转换为时间格式
	LrcFn.prototype.durationFn = function(lines) {
		var iM = this.toZero(Math.floor(lines / 60000));
		var iS = this.toZero(Math.floor((lines - iM * 60000) / 1000));
		var iMs = this.toZero(Math.floor((lines - iM * 60000 - iS * 1000) / 10));
		return iM + ":" + iS + ":" + iMs;
	};

	//如果数字小于9，则给数字前面加0
	LrcFn.prototype.toZero = function(n) { //时间是个位给它加0
		if(n < 10) {
			return "0" + n;
		} else {
			return " " + n;
		}
	};

	var getlrc = new LrcFn(new Lrc(data));

	return getlrc.lrc;

}