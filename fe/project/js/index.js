//窗口变化自适应
window.onresize = function(){
	if(document.body.clientWidth > 710) //若窗口宽度不小于下限，自适应居中
	{
		$('.box-container').css('left', (document.body.clientWidth  - 640) / 2 +'px');
		$('.box').css('left', (document.body.clientWidth  - 640) / 2 +'px');
		$('.button').css('margin', '50px auto');
		$('#shadow').css('width', document.body.clientWidth + 'px');
		$('#shadow').css('height', document.body.scrollHeight + 'px');
	}
	else //若窗口宽度小于下限，自适应宽度等于下限并出现滚动条
	{
		$('.box-container').css('left', '35px');
		$('.box').css('left', '35px');
		$('.button').css('margin', '50px 221.5px');
		$('#shadow').css('width', '710px');
		$('#shadow').css('height', document.body.scrollHeight + 'px');
	}
}

//窗口载入完成
window.onload = function(){
	var storage = window.localStorage; //本地存储
	
	if(!storage.getItem("game_volume")) //本地存储背景音乐音量不存在
	{
		storage.setItem("game_volume", 1);
	}
	
	if(!storage.getItem("background_volume")) //本地存储游戏音效音量不存在
	{
		storage.setItem("background_volume", 1);
	}
	
	//载入本地存储背景音乐音量
	var background_volume = Math.floor(parseFloat(storage.background_volume) * 440);
	if(background_volume <= 440 && background_volume >= 0)
	{
		$('#background-volume-control').css('margin-left', background_volume - 10 + 'px');
		$('#background-volume-value').css('width', background_volume + 'px');
		$('#background-music')[0].volume = parseFloat(storage.background_volume);				
	}
	
	//载入本地存储游戏音效音量
	var game_volume = Math.floor(parseFloat(storage.game_volume) * 440);
	if(game_volume <= 440 && game_volume >= 0)
	{
		$('#game-volume-control').css('margin-left', game_volume - 10 + 'px');
		$('#game-volume-value').css('width', game_volume + 'px');
		$('#click-music')[0].volume = parseFloat(storage.game_volume);				
	}	
	
	//初始定位
	if(document.body.clientWidth > 710) //若窗口宽度不小于下限，自适应居中
	{
		$('.box-container').css('left', (document.body.clientWidth  - 640) / 2 +'px');
		$('.box').css('left', (document.body.clientWidth  - 640) / 2 +'px');
		$('.button').css('margin', '50px auto');
		$('#shadow').css('width', document.body.clientWidth + 'px');
		$('#shadow').css('height', document.body.scrollHeight + 'px');
	}
	else //若窗口宽度小于下限，自适应宽度等于下限并出现滚动条
	{
		$('.box-container').css('left', '35px');
		$('.box').css('left', '35px');
		$('.button').css('margin', '50px 221.5px');
		$('#shadow').css('width', '710px');
		$('#shadow').css('height', document.body.scrollHeight + 'px');
	}
}

//开始游戏
$('#start').click(function(){
	$('#click-music')[0].play();
	setTimeout(function(){window.location.href = "game.html"}, 500);
});

//游戏帮助
$('#help').click(function(){
	$('#help-box-container').css('-webkit-transition', 'opacity 0.3s ease');
	$('#help-box-container').css('-moz-transition', 'opacity 0.3s ease');
	$('#help-box-container').css('opacity', 0.8);
	$('#help-box-container').css('z-index', 2);
	$('#help-box').css('-webkit-transition', 'opacity 0.3s ease');
	$('#help-box').css('-moz-transition', 'opacity 0.3s ease');
	$('#help-box').css('opacity', 1);
	$('#help-box').css('z-index', 3);
	$('#shadow').css('-webkit-transition', 'opacity 0.3s ease');
	$('#shadow').css('-moz-transition', 'opacity 0.3s ease');
	$('#shadow').css('opacity', 0.5);
	$('#shadow').css('z-index', 1);
	$('#click-music')[0].play();
});

//游戏帮助返回键
$('#help-box>>.back').click(function(){
	$('#help-box-container').css('-webkit-transition', 'all 0.3s ease');
	$('#help-box-container').css('-moz-transition', 'all 0.3s ease');
	$('#help-box-container').css('opacity', 0);
	$('#help-box-container').css('z-index', 0);
	$('#help-box').css('-webkit-transition', 'all 0.3s ease');
	$('#help-box').css('-moz-transition', 'all 0.3s ease');
	$('#help-box').css('opacity', 0);
	$('#help-box').css('z-index', 0);
	$('#shadow').css('-webkit-transition', 'all 0.3s ease');
	$('#shadow').css('-moz-transition', 'all 0.3s ease');
	$('#shadow').css('opacity', 0);
	$('#shadow').css('z-index', 0);
	$('#click-music')[0].play();
});

//游戏设置
$('#setting').click(function(){
	$('#setting-box-container').css('-webkit-transition', 'opacity 0.3s ease');
	$('#setting-box-container').css('-moz-transition', 'opacity 0.3s ease');
	$('#setting-box-container').css('opacity', 0.8);
	$('#setting-box-container').css('z-index', 2);
	$('#setting-box').css('-webkit-transition', 'opacity 0.3s ease');
	$('#setting-box').css('-moz-transition', 'opacity 0.3s ease');
	$('#setting-box').css('opacity', 1);
	$('#setting-box').css('z-index', 3);
	$('#shadow').css('-webkit-transition', 'opacity 0.3s ease');
	$('#shadow').css('-moz-transition', 'opacity 0.3s ease');
	$('#shadow').css('opacity', 0.5);
	$('#shadow').css('z-index', 1);
	$('#click-music')[0].play();
});

//游戏设置返回键
$('#setting-box>>.back').click(function(){
	$('#setting-box-container').css('-webkit-transition', 'all 0.3s ease');
	$('#setting-box-container').css('-moz-transition', 'all 0.3s ease');
	$('#setting-box-container').css('opacity', 0);
	$('#setting-box-container').css('z-index', 0);
	$('#setting-box').css('-webkit-transition', 'all 0.3s ease');
	$('#setting-box').css('-moz-transition', 'all 0.3s ease');
	$('#setting-box').css('opacity', 0);
	$('#setting-box').css('z-index', 0);
	$('#shadow').css('-webkit-transition', 'all 0.3s ease');
	$('#shadow').css('-moz-transition', 'all 0.3s ease');
	$('#shadow').css('opacity', 0);
	$('#shadow').css('z-index', 0);
	$('#click-music')[0].play();
});

//关于我们
$('#staff').click(function(){
	$('#staff-box-container').css('-webkit-transition', 'opacity 0.3s ease');
	$('#staff-box-container').css('-moz-transition', 'opacity 0.3s ease');
	$('#staff-box-container').css('opacity', 0.8);
	$('#staff-box-container').css('z-index', 2);
	$('#staff-box').css('-webkit-transition', 'opacity 0.3s ease');
	$('#staff-box').css('-moz-transition', 'opacity 0.3s ease');
	$('#staff-box').css('opacity', 1);
	$('#staff-box').css('z-index', 3);
	$('#shadow').css('-webkit-transition', 'opacity 0.3s ease');
	$('#shadow').css('-moz-transition', 'opacity 0.3s ease');
	$('#shadow').css('opacity', 0.5);
	$('#shadow').css('z-index', 1);
	$('#click-music')[0].play();
});

//关于我们返回键
$('#staff-box>>.back').click(function(){
	$('#staff-box-container').css('-webkit-transition', 'all 0.3s ease');
	$('#staff-box-container').css('-moz-transition', 'all 0.3s ease');
	$('#staff-box-container').css('opacity', 0);
	$('#staff-box-container').css('z-index', 0);
	$('#staff-box').css('-webkit-transition', 'all 0.3s ease');
	$('#staff-box').css('-moz-transition', 'all 0.3s ease');
	$('#staff-box').css('opacity', 0);
	$('#staff-box').css('z-index', 0);
	$('#shadow').css('-webkit-transition', 'all 0.3s ease');
	$('#shadow').css('-moz-transition', 'all 0.3s ease');
	$('#shadow').css('opacity', 0);
	$('#shadow').css('z-index', 0);
	$('#click-music')[0].play();
});

//背景音乐滑件
$('#background-volume-control').mousedown(function(e){
	var storage = window.localStorage; //本地存储
	$(document).mousemove(function(e){ //按下鼠标
		var x = e.originalEvent.x || e.originalEvent.layerX || 0; //左键相对窗口坐标
		if(document.body.clientWidth > 710) //无滚动条
		{
			var volume = x - (document.body.clientWidth  - 640) / 2 - 100; //计算音量（0~440）
			if(volume > 440){volume = 440;}
			if(volume < 0){volume = 0;}
			$('#background-volume-control').css('margin-left', volume - 10 + 'px');
			$('#background-volume-value').css('width', volume + 'px');
			$('#background-music')[0].volume = volume / 440;
			storage.background_volume = volume / 440; //本地存入音量
		}
		else //有滚动条
		{
			var volume = x + $(document).scrollLeft() - 135; //计算音量（0~440）
			if(volume > 440){volume = 440;}
			if(volume < 0){volume = 0;}
			$('#background-volume-control').css('margin-left', volume - 10  + 'px');
			$('#background-volume-value').css('width', volume + 'px');
			$('#background-music')[0].volume = volume / 440;
			storage.background_volume = volume / 440; //本地存入音量
		}
	});
	$(document).mouseup(function(){ //松开鼠标
		$(document).off('mousemove mouseup');
	});
});

//游戏音效滑件
$('#game-volume-control').mousedown(function(e){
	var storage = window.localStorage; //本地存储
	$(document).mousemove(function(e){ //按下鼠标
		var x = e.originalEvent.x || e.originalEvent.layerX || 0; //左键相对窗口坐标
		if(document.body.clientWidth > 710) //无滚动条
		{
			var volume = x - (document.body.clientWidth  - 640) / 2 - 100; //计算音量（0~440）
			if(volume > 440){volume = 440;}
			if(volume < 0){volume = 0;}
			$('#game-volume-control').css('margin-left', volume - 10 + 'px');
			$('#game-volume-value').css('width', volume + 'px');
			$('#click-music')[0].volume = volume / 440;
			storage.game_volume = volume / 440; //本地存入音量
		}
		else //有滚动条
		{
			var volume = x + $(document).scrollLeft() - 135; //计算音量（0~440）
			if(volume > 440){volume = 440;}
			if(volume < 0){volume = 0;}
			$('#game-volume-control').css('margin-left', volume - 10 + 'px');
			$('#game-volume-value').css('width', volume + 'px');
			$('#click-music')[0].volume = volume / 440;
			storage.game_volume = volume / 440; //本地存入音量
		}
	});
	$(document).mouseup(function(){ //松开鼠标
		$(document).off('mousemove mouseup');
	});
});