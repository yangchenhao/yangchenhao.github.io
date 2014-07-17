//窗口变化自适应
window.onresize = function(){
	if(document.body.clientWidth > 1500) //若窗口宽度不小于下限，自适应居中
	{
		$('#myCanvas').css('left', (document.body.clientWidth - 1006) / 2 + 'px');
		$('#gameoverContainer_dark').css('left', (document.body.clientWidth - 1006) / 2 + 'px');
		$('#gameoverContainer').css('left', (document.body.clientWidth - 700) / 2 + 'px');
		$('.over').css('left', (document.body.clientWidth - 700) / 2 + 'px');
		$('#menu').css('width', (document.body.clientWidth - 1006) / 2 + 'px');
		$('#score').css('width', (document.body.clientWidth - 1006) / 2 + 'px');
		$('#title').css('margin', '0 auto');
		$('footer>p').css('margin', '20px auto');
		$('#score').css('left', (document.body.clientWidth + 1006) / 2 + 'px');
		$('.scoreContainer').css('left', ((document.body.clientWidth - 1006) / 2 - 250) / 2 + 'px');
	}
	else //若窗口宽度小于下限，自适应宽度等于下限并出现滚动条
	{
		$('#myCanvas').css('left', '250px');
		$('#gameoverContainer_dark').css('left', '250px');
		$('#gameoverContainer').css('left', '400px');
		$('.over').css('left', '400px');
		$('#menu').css('width', '250px');
		$('#score').css('width', '250px');
		$('#title').css('margin', '0 420px');
		$('footer>p').css('margin', '20px 670px');
		$('#score').css('width', '250px');
		$('#score').css('left', '1250px');
		$('.scoreContainer').css('left', '20px');
	}
}

//窗口载入完成
window.onload = function(){
	var storage = window.localStorage; //本地存储
	
	//预加载图片
	coinimage = new Image();
	coinimage.src = 'img/coin.png';
	leftbulletimage = new Image();
	leftbulletimage.src = 'img/bullet_left.png';
	rightbulletimage = new Image();
	rightbulletimage.src = 'img/bullet_right.png';
	bombimage = new Image();
	bombimage.src = 'img/bomb.png';
	leftplayerimage = [];
	for(var i = 0; i < 8; i++)
	{
		leftplayerimage[i] = new Image();
		leftplayerimage[i].src = 'img/player' + i + 'v.png';
	}
	rightplayerimage = [];
	for(var i = 0; i < 8; i++)
	{
		rightplayerimage[i] = new Image();
		rightplayerimage[i].src = 'img/player' + i + '.png';
	}
	
	load();	//游戏画布预绘制
	
	 //加载本地存储声音信息
	if(!storage.getItem("game_volume"))
	{
		storage.setItem("game_volume", 1);
	}
	if(!storage.getItem("background_volume"))
	{
		storage.setItem("background_volume", 1);
	}
	$('#background-music')[0].volume = parseFloat(storage.background_volume);
	$('#click-music')[0].volume = parseFloat(storage.game_volume);
	$('#jump-music')[0].volume = parseFloat(storage.game_volume);
	$('#coin-music')[0].volume = parseFloat(storage.game_volume);
	$('#gameover-music')[0].volume = parseFloat(storage.game_volume);
	
	 //加载本地存储排行榜信息
	if(!storage.getItem("time")){storage.setItem("time", "0,0,0,0,0,0,0,0,0,0");}
	if(!storage.getItem("coin")){storage.setItem("coin", "0,0,0,0,0,0,0,0,0,0");}
	if(!storage.getItem("is_time_coin")){storage.setItem("is_time_coin", "false");}
	time_rank = storage.time.split(",");
	for(var i = 0; i < 10; i++){time_rank[i] = parseInt(time_rank[i]);}
	coin_rank = storage.coin.split(",");
	for(var i = 0; i < 10; i++){coin_rank[i] = parseInt(coin_rank[i]);}
	if(storage.is_time_coin == "true")
	{
		$("#scoreTitle")[0].innerHTML = "时间排行榜";
		for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = time_rank[i];}
	}
	else
	{
		$("#scoreTitle")[0].innerHTML = "金币排行榜";
		for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = coin_rank[i];}
	}
	
	//初始定位
	if(document.body.clientWidth > 1500) //若窗口宽度不小于下限，自适应居中
	{
		$('#myCanvas').css('left', (document.body.clientWidth - 1006) / 2 + 'px');
		$('#gameoverContainer_dark').css('left', (document.body.clientWidth - 1006) / 2 + 'px');
		$('#gameoverContainer').css('left', (document.body.clientWidth - 700) / 2 + 'px');
		$('.over').css('left', (document.body.clientWidth - 700) / 2 + 'px');
		$('#menu').css('width', (document.body.clientWidth - 1006) / 2 + 'px');
		$('#score').css('width', (document.body.clientWidth - 1006) / 2 + 'px');
		$('#title').css('margin', '0 auto');
		$('footer>p').css('margin', '20px auto');
		$('#score').css('left', (document.body.clientWidth + 1006) / 2 + 'px');
		$('.scoreContainer').css('left', ((document.body.clientWidth - 1006) / 2 - 250) / 2 + 'px');
	}
	else //若窗口宽度小于下限，自适应宽度等于下限并出现滚动条
	{
		$('#myCanvas').css('left', '250px');
		$('#gameoverContainer_dark').css('left', '250px');
		$('#gameoverContainer').css('left', '400px');
		$('.over').css('left', '400px');
		$('#menu').css('width', '250px');
		$('#score').css('width', '250px');
		$('#title').css('margin', '0 420px');
		$('footer>p').css('margin', '20px 670px');
		$('#score').css('width', '250px');
		$('#score').css('left', '1250px');
		$('.scoreContainer').css('left', '20px');
	}
}

//返回主页
$('#backTomenu').click(function(){
	$('#click-music')[0].play();
	setTimeout(function(){window.location.href = "index.html"}, 500);
});

//重新开始
$('#restart').click(function(){
	$("#click-music")[0].play();
	$('#gameoverContainer').css('opacity', 0);
	$('#gameoverContainer').css('z-index', 0);
	$('#gameover').css('opacity', 0);
	$('#gameover').css('z-index', 0);
	$('#gameoverContainer_dark').css('opacity', 0);
	$('#gameoverContainer_dark').css('z-index', 0);
	
	//初始化游戏
	level = 0;
	wind = 0;
	wind = 0;
	windorigin = 0;
	windforce = (Math.random() - 0.5) * 10;
	windchange = 0;
	player.init(); 
	for(var i = 0; i < 50; i++){coins[i].init();}
	for(var i = 0; i < 2; i++){bullets_left[i].init();}
	for(var i = 0; i < 2; i++){bullets_right[i].init();}
	for(var i = 0; i < 5; i++){bombs[i].init();}
	coinCount = 0;
	deltaTime = 0;
	gameover = false;
	$("#coinCount")[0].innerHTML = coinCount;
	begin = new Date();
	myInter = setInterval(function(){update();}, 20);
	
	$("#background-music")[0].play();
});

var begin_pause = 0; //暂停开始时间
var pause = false; //是否游戏结束画面

//通关秘籍
$('#cheats').click(function(){
	$("#click-music")[0].play();
	$('#gameover').css('opacity', 0);
	$('#gameover').css('z-index', 0);
	$('#donate_box').css('opacity', 0);
	$('#donate_box').css('z-index', 0);
	$('#about_box').css('opacity', 0);
	$('#about_box').css('z-index', 0);
	$('#contact_box').css('opacity', 0);
	$('#contact_box').css('z-index', 0);
	$('#gameoverContainer').css('opacity', 0.6);
	$('#gameoverContainer').css('z-index', 2);
	$('#cheats_box').css('opacity', 1);
	$('#cheats_box').css('z-index', 3);
	$('#gameoverContainer_dark').css('opacity', 0.7);
	$('#gameoverContainer_dark').css('z-index', 1);
	
	if(!pause && !gameover){begin_pause = new Date(); pause = true;} //操作前不为暂停或游戏结束界面
	clearInterval(myInter);
});

//联系我们
$('#about').click(function(){
	$("#click-music")[0].play();
	$('#gameover').css('opacity', 0);
	$('#gameover').css('z-index', 0);
	$('#donate_box').css('opacity', 0);
	$('#donate_box').css('z-index', 0);
	$('#contact_box').css('opacity', 0);
	$('#contact_box').css('z-index', 0);
	$('#cheats_box').css('opacity', 0);
	$('#cheats_box').css('z-index', 0);
	$('#gameoverContainer').css('opacity', 0.6);
	$('#gameoverContainer').css('z-index', 2);
	$('#about_box').css('opacity', 1);
	$('#about_box').css('z-index', 3);
	$('#gameoverContainer_dark').css('opacity', 0.7);
	$('#gameoverContainer_dark').css('z-index', 1);

	if(!pause && !gameover){begin_pause = new Date(); pause = true;} //操作前不为暂停或游戏结束界面
	clearInterval(myInter); 
});

//捐助我们
$('#donate').click(function(){
	$("#click-music")[0].play();
	$('#gameover').css('opacity', 0);
	$('#gameover').css('z-index', 0);
	$('#contact_box').css('opacity', 0);
	$('#contact_box').css('z-index', 0);
	$('#about_box').css('opacity', 0);
	$('#about_box').css('z-index', 0);
	$('#cheats_box').css('opacity', 0);
	$('#cheats_box').css('z-index', 0);
	$('#gameoverContainer').css('opacity', 0.6);
	$('#gameoverContainer').css('z-index', 2);
	$('#donate_box').css('opacity', 1);
	$('#donate_box').css('z-index', 3);
	$('#gameoverContainer_dark').css('opacity', 0.7);
	$('#gameoverContainer_dark').css('z-index', 1);
	
	if(!pause && !gameover){begin_pause = new Date(); pause = true;} //操作前不为暂停或游戏结束界面
	clearInterval(myInter); 
});

//返回游戏
$('.back').click(function(){
	$("#click-music")[0].play();
	if(gameover) //操作前为游戏结束界面（返回游戏结束画面）
	{
		$('#gameover').css('opacity', 1);
		$('#gameover').css('z-index', 3);
		$('#contact_box').css('opacity', 0);
		$('#contact_box').css('z-index', 0);
		$('#about_box').css('opacity', 0);
		$('#about_box').css('z-index', 0);
		$('#cheats_box').css('opacity', 0);
		$('#cheats_box').css('z-index', 0);
		$('#donate_box').css('opacity', 0);
		$('#donate_box').css('z-index', 0);
	}
	else //操作前不为游戏结束界面
	{
		$('#contact_box').css('opacity', 0);
		$('#contact_box').css('z-index', 0);
		$('#about_box').css('opacity', 0);
		$('#about_box').css('z-index', 0);
		$('#cheats_box').css('opacity', 0);
		$('#cheats_box').css('z-index', 0);
		$('#donate_box').css('opacity', 0);
		$('#donate_box').css('z-index', 0);
		$('#gameoverContainer').css('opacity', 0);
		$('#gameoverContainer').css('z-index', 0);
		$('#gameoverContainer_dark').css('opacity', 0);
		$('#gameoverContainer_dark').css('z-index', 0);
		
		//继续游戏
		var end_pause = new Date(); //暂停结束时间
		deltaTime += (end_pause - begin_pause);
		pause = false;
		myInter = setInterval(function(){update();}, 20); 
	}
});

//时间排行榜
$('#rankByTime').click(function(){
	var storage = window.localStorage; //本地存储
	$("#click-music")[0].play();
	$("#scoreTitle")[0].innerHTML = "时间排行榜";
	for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = time_rank[i];} //切换排行榜
	storage.is_time_coin = "true";
});

//金币排行榜
$('#rankByCoin').click(function(){
	var storage = window.localStorage; //本地存储
	$("#click-music")[0].play();
	$("#scoreTitle")[0].innerHTML = "金币排行榜";
	for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = coin_rank[i];} //切换排行榜
	storage.is_time_coin = "false";
});