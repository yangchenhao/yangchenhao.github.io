var coinimage; //金币图片
var bombimage; //炸弹图片
var leftbulletimage; //左炮弹图片
var rightbulletimage; //右炮弹图片
var leftplayerimage; //左玩家图片
var rightplayerimage; //右玩家图片
var level; //等级
var wind; //风速
var windchange; //风速变化次数
var windforce; //风力加速度
var windorigin; //上次风速
var coins = new Array(); //金币
var bullets_left = new Array(); //左导弹
var bullets_right = new Array(); //右导弹
var bombs = new Array(); //炸弹
var myInter; //循环刷新
var begin; //开始时间
var coinCount = 0; //金币计数
var deltaTime = 0; //暂停时间 
var gameover = false; //是否游戏结束画面
var time_rank = new Array(); //时间排行榜
var coin_rank = new Array(); //金币排行榜

//键盘值
var KEY = {RIGHT:39, UP:38, LEFT:37, DOWN:40, SPACE:32, ENTER:13};

//输入对象
var input = {
	right : false, //是否按下右键
	up : false, //是否按下上键
	uplimit : true, //是否到达最大高度
	ground : true, //是否接触地面
	left : false //是否按下左键
};

//羊驼对象
var player = {
	speed : 8, //速度
	left : 0, //左坐标
	top : 0, //上坐标
	xleft : 0, //左极限
	dleft : 0, //右极限
	xtop : 0, //上极限
	dtop : 0, //下极限
	gspeed : 0 //重力速度
}  

var playerleft = true; //羊驼是否朝左

//玩家初始化
player.init = function(){
	this.xleft = 0;
	this.xtop = 0;
	this.dleft = $("#myCanvas")[0].width - 55;
	this.dtop = $("#myCanvas")[0].height - 74;
	this.left = $("#myCanvas")[0].width / 2;
	this.top = $("#myCanvas")[0].height - 74;
	this.gspeed = 100;
}

//玩家更新
player.update = function(){
	if(input.right){player.left += player.speed;} //右键按下
	if(input.left){player.left -= player.speed;} //左键按下
	if(input.up && input.uplimit){player.gspeed -= player.speed;} //上键按下且未到跳跃高度限制
	if(player.gspeed <- 20) //跳跃速度超过限制
	{
		player.gspeed = -20;
		input.uplimit = false;
	}
	player.top += player.gspeed; //竖直位移为重力速度
	player.gspeed += 1; //重力速度增加
	
	if(player.left > player.dleft){player.left = player.dleft;} //玩家不能超过右边框
	if(player.left < player.xleft){player.left = player.xleft;} //玩家不能超过左边框
	if(player.top > player.dtop) //玩家不能超过下边框
	{
		player.top = player.dtop;
		player.gspeed = 0;
		input.up = false;
		input.ground = true;
	}

	var cxt = $("#myCanvas")[0].getContext("2d"); //画笔
	var end = new Date(); //当前时间
	var time = end - begin - deltaTime; //当前游戏时间
	
	//加载玩家图像
	if(playerleft){cxt.drawImage(leftplayerimage[Math.floor(time / 100) % 8], player.left, player.top);} //若玩家朝左
	else{cxt.drawImage(rightplayerimage[Math.floor(time / 100) % 8], player.left, player.top);} //若玩家朝右
}

//金币对象
var coin = function(){
	this.x = 0;
	this.y = 0;
	this.ay = 0;
	this.speed = 10;

	//初始化
	this.init = function(){
		this.x = Math.floor(Math.random() * $("#myCanvas")[0].width - wind * 200);
		this.y = -30;
		this.ay = -Math.random() * this.speed;
	}

	//更新
	this.update = function(){
		this.y = this.y + this.ay;
		this.x = this.x + wind;
		this.ay += 0.1;

		//若超出画布则更新
		if(this.y > $("#myCanvas")[0].height)
		{
			this.init();
			return;
		}

		//加载图像
		var x = this.x;
		var y = this.y;
		var cxt=$("#myCanvas")[0].getContext("2d");
		cxt.drawImage(coinimage, x, y);
	}

	//是否被撞到
	this.iscollide = function(){
		var x_player = player.left + 27.5;
		var y_player = player.top + 37;
		var x_coin = this.x + 12.5;
		var y_coin = this.y + 12;
		var x = Math.abs(x_player - x_coin);
		var y = Math.abs(y_player - y_coin);
		if(x <= 40 && y <= 49)
		{
			this.init();
			return false;
		}
		return true;
	}
}

//左炮弹对象
var bullet_left = function(){
	this.x = 0;
	this.y = 0;
	this.ax = 0;

	//初始化
	this.init = function(){
		this.x = -120;
		this.y = (Math.random() * 0.1 + 0.9) * $("#myCanvas")[0].height - 50;
		this.ax = (Math.random() + 1) * 3;
	}

	//更新
	this.update = function(){
		this.x = this.x + this.ax;

		//若超出画布则更新
		if(this.x > $("#myCanvas")[0].width)
		{
			this.init();
			return;
		}

		//加载图像
		var x = this.x;
		var y = this.y;
		var cxt = $("#myCanvas")[0].getContext("2d");
		cxt.drawImage(leftbulletimage, x, y);
	}

	//是否被撞到
	this.iscollide = function(){
		var x_player = player.left + 27.5;
		var y_player = player.top + 37;
		var x_bullet = this.x + 47.5;
		var y_bullet = this.y + 19;
		var x = Math.abs(x_player - x_bullet);
		var y = Math.abs(y_player - y_bullet);
		if(x <= 75 && y <= 56)
		{
				this.init();
				return false;
		}
		return true;
	}
}

//右炮弹对象
var bullet_right = function(){
	this.x = 0;
	this.y = 0;
	this.ax = 0;

	//初始化
	this.init = function(){
		this.x = $("#myCanvas")[0].width + 120;
		this.y = (Math.random() * 0.1 + 0.9) * $("#myCanvas")[0].height - 50;
		this.ax = (Math.random() + 1) * 3;
	}

	//更新
	this.update = function(){
		this.x = this.x - this.ax;

		//若超出画布则更新
		if(this.x < -120)
		{
			this.init();
			return;
		}

		//加载图像
		var x = this.x;
		var y = this.y;
		var cxt=$("#myCanvas")[0].getContext("2d");
		cxt.drawImage(rightbulletimage, x, y);
	}

	//是否被撞到
	this.iscollide = function(){
		var x_player = player.left + 27.5;
		var y_player = player.top + 37;
		var x_bullet = this.x + 47.5;
		var y_bullet = this.y + 19;
		var x = Math.abs(x_player - x_bullet);
		var y = Math.abs(y_player - y_bullet);
		if(x <= 75 && y <= 56)
		{
			this.init();
			return false;
		}
		return true;
	}
}

//炸弹对象
var bomb = function(){
	this.x = 0;
	this.y = 0;
	this.ay = 0;
	this.speed = 10;

	//初始化
	this.init = function(){
		this.x = Math.floor(Math.random() * $("#myCanvas")[0].width - wind * 200);
		this.y = -120;
		this.ay = -Math.random() * this.speed / 2;
	}

	//更新
	this.update = function(){
		this.y = this.y + this.ay;
		this.x = this.x + wind;
		this.ay += 0.1;

		//若超出画布则更新
		if(this.y > $("#myCanvas")[0].height)
		{
			this.init();
			return;
		}

		//加载图像
		var x = this.x;
		var y = this.y;
		var cxt=$("#myCanvas")[0].getContext("2d");
		cxt.drawImage(bombimage, x, y);
	}

	//是否被撞到
	this.iscollide = function(){
		var x_player = player.left + 27.5;
		var y_player = player.top + 37;
		var x_coin = this.x + 50;
		var y_coin = this.y + 57.5;
		var x = Math.abs(x_player - x_coin);
		var y = Math.abs(y_player - y_coin);
		if(x <= 77.5 && y <= 94.5)
		{
			this.init();
			return false;
		}
		return true;
	}
}

//按键响应
var press = function(event){
	var code = event.keyCode || window.event;
	switch(code){
		case KEY.RIGHT: playerleft = false; input.right = true; event.preventDefault(); break;
		case KEY.UP: if(input.ground && input.uplimit){$("#jump-music")[0].play(); input.up = true; input.ground=false;} event.preventDefault(); break;
		case KEY.LEFT: playerleft = true; input.left = true; event.preventDefault(); break;
		case KEY.DOWN: event.preventDefault(); break;
		case KEY.ENTER: event.preventDefault(); break;
		case KEY.SPACE: event.preventDefault(); break;
	}
}

//松键响应
var release = function(event){
	var code = event.keyCode || window.event;
	switch(code){
		case KEY.RIGHT: input.right = false; break;
		case KEY.UP: input.up = false; input.uplimit=true; break;
		case KEY.LEFT:  input.left = false; break;
	}
}

//初始加载
var load = function(){
	level = 0;
	wind = 0;
	windorigin = 0;
	windforce = (Math.random() - 0.5) * 10;
	windchange = 0;
	player.init();
	for(var i = 0; i < 50; i++)
	{
		var s = new coin();
		s.init();
		coins[i] = s;
	}
	for(var i = 0; i < 2; i++)
	{
		var s = new bullet_left();
		s.init();
		bullets_left[i] = s;
	}
	for(var i = 0; i < 2; i++)
	{
		var s = new bullet_right();
		s.init();
		bullets_right[i] = s;
	}
	for(var i = 0; i < 5; i++)
	{
		var s = new bomb();
		s.init();
		bombs[i] = s;
	}
	begin = new Date();
	myInter = setInterval(function(){update();}, 20);
}

//更新
var update = function(){
	var c = $("#myCanvas")[0];
	c.width = c.width; //清除画布
	player.update();
	for(var i = 0; i < coins.length; i++){coins[i].update();}
	for(var i = 0; i < Math.floor((level + 2) / 4); i++){bullets_left[i].update();}
	for(var i = 0; i < Math.floor(level / 4); i++){bullets_right[i].update();}
	for(var i = 0; i < Math.floor((level + 1) / 2); i++){bombs[i].update();}
	updatetime();
	countCoin();
	isDead_bullet_left();
	isDead_bullet_right();
	isDead_bomb();
}

//更新时间
var updatetime = function(){
	var end = new Date(); //当前时间
	var time = Math.round((end - begin - deltaTime) / 1000); //游戏时间

	//变换风向
	if(Math.floor(time / 5) - windchange == 1)
	{
		windforce = (Math.random() - 0.5) * 10;
		windorigin = wind;
	}
	windchange = Math.floor(time / 5);
	wind = windorigin + windforce * (time / 5 - windchange);
	if(wind > 5){wind = 5;}
	if(wind < -5){wind = -5;}
	
	//变换等级
	level = Math.floor(time / 10);
	if(level > 9){level = 9;}

	$("#level")[0].innerHTML = level + 1;
	$("#time")[0].innerHTML = time;
}

//是否碰到金币
var countCoin = function(){
	for(var i = 0; i < coins.length; i++)
	{
		var flag = coins[i].iscollide();
		if(flag == false) //若和羊驼重叠
		{
			$("#coin-music")[0].pause();
			$("#coin-music")[0].currentTime = 0.0;
			$("#coin-music")[0].play();
			coinCount++;
			$("#coinCount")[0].innerHTML = coinCount;
			return;
		}
	}
}

//是否碰到左导弹
var isDead_bullet_left = function(){
	var storage = window.localStorage; //本地存储
	for(var i = 0; i < bullets_left.length; i++)
	{
		var flag = bullets_left[i].iscollide();
		if(flag == false) //若和羊驼重叠
		{
			$('#gameoverContainer').css('opacity', 0.6);
			$('#gameoverContainer').css('z-index', 2);
			$('#gameover').css('opacity', 1);
			$('#gameover').css('z-index', 3);
			$('#gameoverContainer_dark').css('opacity', 0.7);
			$('#gameoverContainer_dark').css('z-index', 1);
			clearInterval(myInter);
			gameover = true;

			//更新排行榜
			for(var i = 0; i < 10; i++)
			{
				if(time_rank[i] < parseInt($("#time")[0].innerHTML))
				{
					for(var j = 9; j > i; j--){time_rank[j] = time_rank[j - 1];}
					time_rank[i] = parseInt($("#time")[0].innerHTML);
					break;
				}
			}
			for(var i = 0; i < 10; i++)
			{
				if(coin_rank[i] < parseInt($("#coinCount")[0].innerHTML))
				{
					for(var j = 9; j > i; j--){coin_rank[j] = coin_rank[j - 1];}
					coin_rank[i] = parseInt($("#coinCount")[0].innerHTML);
					break;
				}
			}
			if($("#scoreTitle")[0].innerHTML == "时间排行榜")
			{
				for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = time_rank[i];}
			}
			else
			{
				for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = coin_rank[i];}
			}
			storage.time = time_rank.join(",");
			storage.coin = coin_rank.join(",");

			$("#gameover-music")[0].play();
			$("#background-music")[0].pause();
			$("#background-music")[0].currentTime = 0.0;
			return;
		}
	}
}

//是否碰到右导弹
var isDead_bullet_right = function(){
	var storage = window.localStorage; //本地存储
	for(var i = 0; i < bullets_right.length; i++)
	{
		var flag = bullets_right[i].iscollide();
		if(flag == false) //若和羊驼重叠
		{
			$('#gameoverContainer').css('opacity', 0.6);
			$('#gameoverContainer').css('z-index', 2);
			$('#gameover').css('opacity', 1);
			$('#gameover').css('z-index', 3);
			$('#gameoverContainer_dark').css('opacity', 0.7);
			$('#gameoverContainer_dark').css('z-index', 1);
			clearInterval(myInter);
			gameover = true;

			//更新排行榜
			for(var i = 0; i < 10; i++)
			{
				if(time_rank[i] < parseInt($("#time")[0].innerHTML))
				{
					for(var j = 9; j > i; j--){time_rank[j] = time_rank[j - 1];}
					time_rank[i] = parseInt($("#time")[0].innerHTML);
					break;
				}
			}
			for(var i = 0; i < 10; i++)
			{
				if(coin_rank[i] < parseInt($("#coinCount")[0].innerHTML))
				{
					for(var j = 9; j > i; j--){coin_rank[j] = coin_rank[j - 1];}
					coin_rank[i] = parseInt($("#coinCount")[0].innerHTML);
					break;
				}
			}
			if($("#scoreTitle")[0].innerHTML == "时间排行榜")
			{
				for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = time_rank[i];}
			}
			else
			{
				for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = coin_rank[i];}
			}
			storage.time = time_rank.join(",");
			storage.coin = coin_rank.join(",");

			$("#gameover-music")[0].play();
			$("#background-music")[0].pause();
			$("#background-music")[0].currentTime = 0.0;
			return;
		}
	}
}

//是否碰到炸弹
var isDead_bomb = function(){
	var storage = window.localStorage; //本地存储
	for(var i = 0; i < bombs.length; i++)
	{
		var flag = bombs[i].iscollide();
		if(flag == false) //若和羊驼重叠
		{
			$('#gameoverContainer').css('opacity', 0.6);
			$('#gameoverContainer').css('z-index', 2);
			$('#gameover').css('opacity', 1);
			$('#gameover').css('z-index', 3);
			$('#gameoverContainer_dark').css('opacity', 0.7);
			$('#gameoverContainer_dark').css('z-index', 1);
			clearInterval(myInter);
			gameover = true;

			//更新排行榜
			for(var i = 0; i < 10; i++)
			{
				if(time_rank[i] < parseInt($("#time")[0].innerHTML))
				{
					for(var j = 9; j > i; j--){time_rank[j] = time_rank[j - 1];}
					time_rank[i] = parseInt($("#time")[0].innerHTML);
					break;
				}
			}
			for(var i = 0; i < 10; i++)
			{
				if(coin_rank[i] < parseInt($("#coinCount")[0].innerHTML))
				{
					for(var j = 9; j > i; j--){coin_rank[j] = coin_rank[j - 1];}
					coin_rank[i] = parseInt($("#coinCount")[0].innerHTML);
					break;
				}
			}
			if($("#scoreTitle")[0].innerHTML == "时间排行榜")
			{
				for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = time_rank[i];}
			}
			else
			{
				for(var i = 0; i < 10; i++){$("#rank"+i)[0].innerHTML = coin_rank[i];}
			}
			storage.time = time_rank.join(",");
			storage.coin = coin_rank.join(",");

			$("#gameover-music")[0].play();
			$("#background-music")[0].pause();
			$("#background-music")[0].currentTime = 0.0;
			return;
		}
	}
}