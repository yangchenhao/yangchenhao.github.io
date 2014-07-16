window.onresize = function(){
	if(document.body.clientWidth > 1500) {
		$('#myCanvas').css('left', (document.body.clientWidth  - 1006) / 2 +'px');
		$('#gameoverContainer_dark').css('left', (document.body.clientWidth  - 1006) / 2 +'px');
		$('#gameoverContainer').css('left', (document.body.clientWidth  - 700) / 2 +'px');
		$('.over').css('left', (document.body.clientWidth  - 700) / 2 +'px');
		$('#menu').css('width', (document.body.clientWidth  - 1006) / 2 +'px');
		$('#score').css('width', (document.body.clientWidth  - 1006) / 2 +'px');
		$('#title').css('margin', '0 auto');
		$('footer>p').css('margin', '20px auto');
		$('#score').css('left', (document.body.clientWidth  + 1006) / 2 +'px');
		$('.scoreContainer').css('left', ((document.body.clientWidth  - 1006)/2 - 250)/2 +'px');
	}
	else {
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

window.onload = function(){
	coinimage = new Image();
	coinimage.src = 'img/coin.png';
	leftbulletimage = new Image();
    leftbulletimage.src = 'img/bullet_left.png';
	rightbulletimage = new Image();
    rightbulletimage.src = 'img/bullet_right.png';
    bombimage = new Image();
    bombimage.src = 'img/bomb.png';
    leftplayerimage = [];
    for(var i=0; i<8; i++)
    {
    	leftplayerimage[i] = new Image();
    	leftplayerimage[i].src = 'img/player' + i + 'v.png';
    }
    rightplayerimage = [];
    for(var i=0; i<8; i++)
    {
    	rightplayerimage[i] = new Image();
    	rightplayerimage[i].src = 'img/player' + i + '.png';
    }
	load();
	storage = window.localStorage;
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
	if(!storage.getItem("time"))
	{
		storage.setItem("time", "0,0,0,0,0,0,0,0,0,0");
	}
	if(!storage.getItem("coin"))
	{
		storage.setItem("coin", "0,0,0,0,0,0,0,0,0,0");
	}
	if(!storage.getItem("is_time_coin"))
	{
		storage.setItem("is_time_coin", "false");
	}
	time_rank = storage.time.split(",");
	for(var i=0; i<10; i++){
        time_rank[i] = parseInt(time_rank[i]); 
    }
	coin_rank = storage.coin.split(",");
	for(var i=0; i<10; i++){
        coin_rank[i] = parseInt(coin_rank[i]); 
    }
	if(storage.is_time_coin == "true"){
		$("#scoreTitle")[0].innerHTML = "时间排行榜"
        for(var i=0; i<10; i++){
            $("#rank"+i)[0].innerHTML = time_rank[i]; 
        }
    }
    else {
		$("#scoreTitle")[0].innerHTML = "金币排行榜"
        for(var i=0; i<10; i++){
            $("#rank"+i)[0].innerHTML = coin_rank[i]; 
        }
    }
	if(document.body.clientWidth > 1500) {
		$('#myCanvas').css('left', (document.body.clientWidth  - 1006) / 2 +'px');
		$('#gameoverContainer_dark').css('left', (document.body.clientWidth  - 1006) / 2 +'px');
		$('#gameoverContainer').css('left', (document.body.clientWidth  - 700) / 2 +'px');
		$('.over').css('left', (document.body.clientWidth  - 700) / 2 +'px');
		$('#menu').css('width', (document.body.clientWidth  - 1006) / 2 +'px');
		$('#score').css('width', (document.body.clientWidth  - 1006) / 2 +'px');
		$('#title').css('margin', '0 auto');
		$('footer>p').css('margin', '20px auto');
		$('#score').css('left', (document.body.clientWidth  + 1006) / 2 +'px');
		$('.scoreContainer').css('left', ((document.body.clientWidth  - 1006)/2 - 250)/2 +'px');
	}
	else {
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


