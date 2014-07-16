var storage = window.localStorage;
var coinimage;
var bombimage;
var leftbulletimage;
var rightbulletimage;
var leftplayerimage;
var rightplayerimage;

//定义键盘值  
var KEY = {RIGHT:39, UP:38, LEFT:37, DOWN:40, SPACE:32, ENTER:13};  
//定义输入对象  
var input = {  
	right   : false,  
	up  	: false,  
	uplimit : true,
	ground  : true,
	left    : false,  
	quick   : false  
};  
//小球对象  
var player = {  
    speed   : 6, 
    left    : 0,  
    top 	: 0,  
    xleft   : 0,  
    dleft   : 0,  
    xtop    : 0,  
    dtop    : 0,  
	gspeed  : 0
}  

var playerleft = true;

player.init = function(){  
    this.xleft = 0;  
    this.xtop = 0;  
    this.dleft = $("#myCanvas")[0].width-55;  
    this.dtop = $("#myCanvas")[0].height-74;  
      
    this.left = $("#myCanvas")[0].width/2;  
    this.top = $("#myCanvas")[0].height-74;  

    this.gspeed = 100;
      
}  
player.update = function(){   
    if (input.right)    player.left+=player.speed;  
    if (input.left)     player.left-=player.speed;  
    if (input.up && input.uplimit)     player.gspeed-=player.speed;
	if (player.gspeed<-25)  {player.gspeed=-25; input.uplimit=false;}
	player.top+=player.gspeed;  
	player.gspeed+=1;
    if (player.left>player.dleft)    player.left=player.dleft;  
    if (player.left<player.xleft)    player.left=player.xleft;  
    if (player.top>player.dtop)  {player.top=player.dtop; player.gspeed=0; input.up=false; input.ground=true;}    
       
    var cxt=$("#myCanvas")[0].getContext("2d");  
    var end = new Date();  
    var time = end-begin-deltaTime;  
    if(playerleft) cxt.drawImage(leftplayerimage[Math.floor(time/100)%8],player.left,player.top);
    else cxt.drawImage(rightplayerimage[Math.floor(time/100)%8],player.left,player.top);
}  
 
var coin = function(){  
    this.x = 0;  
    this.y = 0;     
    this.ay = 0; 
    this.speed = 10; 
      
    this.init = function(){  
        var rlon = Math.floor(Math.random()*($("#myCanvas")[0].width+1)); 
        this.x = rlon;  
        this.y = -30; 
        this.ay = -Math.random()*this.speed;   
    }  
      
      
    this.update = function(){//更新  
        this.y=this.y+this.ay;  
        this.ay+=0.1;
        if((this.y>$("#myCanvas")[0].height)){  
            this.init(); 
            return;  
        }  
        var x = this.x;
        var y = this.y;
  
        var cxt=$("#myCanvas")[0].getContext("2d");  
        cxt.drawImage(coinimage,x,y);   
    }  
    this.iscollide = function(){//判断是否被撞到  
        var x_player = player.left + 27.5;
        var y_player = player.top + 37;
        var x_coin = this.x + 12.5;
        var y_coin = this.y + 12;
        var x = Math.abs(x_player - x_coin);
        var y = Math.abs(y_player - y_coin);
        if(x<=40&&y<=49){
            this.init(); 
            return false;
        } 
        return true;  
    }  
}  


var bullet_left = function(){  
    this.x = 0;  
    this.y = 0; 
    this.ax = 0;  
      
    this.init = function(){  
        this.x = -120;  
        this.y = (Math.random()*0.1+0.9)*$("#myCanvas")[0].height - 50; 
        this.ax = (Math.random()+1)*3;   
    }  
      
      
    this.update = function(){//更新  
        this.x=this.x+this.ax;  
        if((this.x>$("#myCanvas")[0].width)){  
            this.init(); 
            return;  
        }  
        var x = this.x;
        var y = this.y;
 
        var cxt=$("#myCanvas")[0].getContext("2d");  
        cxt.drawImage(leftbulletimage,x,y);  
    }  
    this.iscollide = function(){//判断是否被撞到  
        var x_player = player.left + 27.5;
        var y_player = player.top + 37;
        var x_bullet = this.x + 47.5;
        var y_bullet = this.y + 19;
        var x = Math.abs(x_player - x_bullet);
        var y = Math.abs(y_player - y_bullet);
        if(x<=75&&y<=56){
            this.init(); 
            return false;
        } 
        return true;  
    } 
}  

var bullet_right = function(){  
    this.x = 0;  
    this.y = 0; 
    this.ax = 0;  
      
    this.init = function(){  
        this.x = $("#myCanvas")[0].width+120;  
        this.y = (Math.random()*0.1+0.9)*$("#myCanvas")[0].height - 50; 
        this.ax = (Math.random()+1)*3;   
    }  
      
      
    this.update = function(){//更新  
        this.x=this.x-this.ax;  
        if((this.x<-120)){  
            this.init(); 
            return;  
        }  
        var x = this.x;
        var y = this.y;
  
        var cxt=$("#myCanvas")[0].getContext("2d");  
        cxt.drawImage(rightbulletimage,x,y); 
    }  
    this.iscollide = function(){//判断是否被撞到  
        var x_player = player.left + 27.5;
        var y_player = player.top + 37;
        var x_bullet = this.x + 47.5;
        var y_bullet = this.y + 19;
        var x = Math.abs(x_player - x_bullet);
        var y = Math.abs(y_player - y_bullet);
        if(x<=75&&y<=56){
            this.init(); 
            return false;
        } 
        return true;  
    } 
}  

var bomb = function(){  
    this.x = 0;  
    this.y = 0;     
    this.ay = 0; 
    this.speed = 10; 
      
    this.init = function(){  
        this.x = Math.floor(Math.random()*($("#myCanvas")[0].width+1));  
        this.y = -120; 
        this.ay = -Math.random()*this.speed;   
    }  
      
      
    this.update = function(){//更新  
        this.y=this.y+this.ay;  
        this.ay+=0.1;
        if((this.y>$("#myCanvas")[0].height)){  
            this.init(); 
            return;  
        }  
        var x = this.x;
        var y = this.y;
 
        var cxt=$("#myCanvas")[0].getContext("2d");  
        cxt.drawImage(bombimage,x,y);
    }  
    this.iscollide = function(){//判断是否被撞到  
        var x_player = player.left + 27.5;
        var y_player = player.top + 37;
        var x_coin = this.x + 50;
        var y_coin = this.y + 57.5;
        var x = Math.abs(x_player - x_coin);
        var y = Math.abs(y_player - y_coin);
        if(x<=77.5&&y<=94.5){
            this.init(); 
            return false;
        } 
        return true;  
    }  
}  


var press = function(event){
    var code = event.keyCode || window.event;  
    switch(code) {  
        case KEY.RIGHT: playerleft = false; input.right = true; event.preventDefault(); break;  
        case KEY.UP: if(input.ground && input.uplimit){$("#jump-music")[0].play(); input.up = true; input.ground=false;} event.preventDefault(); break;  
        case KEY.LEFT: playerleft = true; input.left = true; event.preventDefault(); break;
        case KEY.DOWN: event.preventDefault(); break;
        case KEY.ENTER: event.preventDefault(); break;
        case KEY.SPACE: event.preventDefault(); break;		
    }  
}  
var release = function(event) {
    var code = event.keyCode || window.event;  
    switch(code) {  
        case KEY.RIGHT: input.right = false; break;  
        case KEY.UP: input.up = false; input.uplimit=true; break; 
        case KEY.LEFT:  input.left = false; break;
    }  
}  
var coins = new Array();  
var bullets_left = new Array(); 
var bullets_right = new Array(); 
var bombs = new Array(); 
var myInter;  
var begin;  
var time = 0;  
//加载事件  
var load = function(){  
    player.init(); 
    for(i=0;i<50;i++){  
        var s = new coin();  
        s.init();  
        coins[i] = s;  
    }  
    for(i=0;i<1;i++){
        var s = new bullet_left();  
        s.init();  
        bullets_left[i] = s;
    }   
    for(i=0;i<1;i++){
        var s = new bullet_right();  
        s.init();  
        bullets_right[i] = s;
    }   
    for(i=0;i<2;i++){
        var s = new bomb();  
        s.init();  
        bombs[i] = s;
    } 
    begin = new Date();  
    myInter = setInterval(function(){update();},20);  
}  
  
 

var coinCount = 0;
//更新方法  
var update = function(){  
    var c=$("#myCanvas")[0];  
    c.width = c.width; // Clears the canvas    
    player.update(); 
    for(i=0;i<coins.length;i++){  
        coins[i].update();  
    }   
    for(i=0;i<bullets_left.length;i++){  
        bullets_left[i].update();  
    }  
    for(i=0;i<bullets_right.length;i++){  
        bullets_right[i].update();  
    }  
    for(i=0;i<bombs.length;i++){  
        bombs[i].update();  
    }  
    updatetime(); 
    countCoin();
    isDead_bullet_left();
    isDead_bullet_right();
    isDead_bomb();
}  
//更新时间 
var deltaTime = 0;
var gameover = false;

var updatetime = function(){      
    var end = new Date();  
    var time = Math.round((end-begin-deltaTime)/1000);  
    $("#time")[0].innerHTML = time;  
}  

var countCoin = function(){  
    for(i=0;i<coins.length;i++){  
        var flag = coins[i].iscollide();  
        if(flag==false){
            $("#coin-music")[0].pause(); 
            $("#coin-music")[0].currentTime = 0.0;
            $("#coin-music")[0].play();
            coinCount++;
            $("#coinCount")[0].innerHTML = coinCount; 
            return;  
        }  
    }  
}  

var isDead_bullet_left = function(){  
    for(i=0;i<bullets_left.length;i++){  
        var flag = bullets_left[i].iscollide();  
        if(flag==false){  
            $('#gameoverContainer').css('opacity', 0.6);
            $('#gameoverContainer').css('z-index', 2);
            $('#gameover').css('opacity', 1);
            $('#gameover').css('z-index', 3);
            $('#gameoverContainer_dark').css('opacity', 0.7);
            $('#gameoverContainer_dark').css('z-index', 1);
            clearInterval(myInter); 
            gameover = true;
            for(var i=0; i<10; i++){
                if(time_rank[i] < parseInt($("#time")[0].innerHTML)){
                    for(var j=9; j>i; j--){
                        time_rank[j] = time_rank[j-1];
                    }
                    time_rank[i] = parseInt($("#time")[0].innerHTML);
                    break;
                }
            }
            
            for(var i=0; i<10; i++){
                if(coin_rank[i] < parseInt($("#coinCount")[0].innerHTML)){
                    for(var j=9; j>i; j--){
                        coin_rank[j] = coin_rank[j-1];
                    }
                    coin_rank[i] = parseInt($("#coinCount")[0].innerHTML);
                    break;
                }
            }
            if($("#scoreTitle")[0].innerHTML == "时间排行榜"){
                for(var i=0; i<10; i++){
                    $("#rank"+i)[0].innerHTML = time_rank[i];		
                }
            }
            else {
                for(var i=0; i<10; i++){
                    $("#rank"+i)[0].innerHTML = coin_rank[i]; 
                }
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

var isDead_bullet_right = function(){  
    for(i=0;i<bullets_right.length;i++){  
        var flag = bullets_right[i].iscollide();  
        if(flag==false){ 

            $('#gameoverContainer').css('opacity', 0.6);
            $('#gameoverContainer').css('z-index', 2);
            $('#gameover').css('opacity', 1);
            $('#gameover').css('z-index', 3);
            $('#gameoverContainer_dark').css('opacity', 0.7);
            $('#gameoverContainer_dark').css('z-index', 1);
            clearInterval(myInter); 
            gameover = true;
            for(var i=0; i<10; i++){
                if(time_rank[i] < parseInt($("#time")[0].innerHTML)){
                    for(var j=9; j>i; j--){
                        time_rank[j] = time_rank[j-1];
                    }
                    time_rank[i] = parseInt($("#time")[0].innerHTML);
                    break;
                }
            }
            
            for(var i=0; i<10; i++){
                if(coin_rank[i] < parseInt($("#coinCount")[0].innerHTML)){
                    for(var j=9; j>i; j--){
                        coin_rank[j] = coin_rank[j-1];
                    }
                    coin_rank[i] = parseInt($("#coinCount")[0].innerHTML);
                    break;
                }
            }
            if($("#scoreTitle")[0].innerHTML == "时间排行榜"){
                for(var i=0; i<10; i++){
                    $("#rank"+i)[0].innerHTML = time_rank[i]; 
                }
            }
            else {
                for(var i=0; i<10; i++){
                    $("#rank"+i)[0].innerHTML = coin_rank[i]; 
                }
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

var isDead_bomb = function(){  
    for(i=0;i<bombs.length;i++){  
        var flag = bombs[i].iscollide();  
        if(flag==false){  
            $('#gameoverContainer').css('opacity', 0.6);
            $('#gameoverContainer').css('z-index', 2);
            $('#gameover').css('opacity', 1);
            $('#gameover').css('z-index', 3);
            $('#gameoverContainer_dark').css('opacity', 0.7);
            $('#gameoverContainer_dark').css('z-index', 1);
            clearInterval(myInter); 
            gameover = true;
            for(var i=0; i<10; i++){
                if(time_rank[i] < parseInt($("#time")[0].innerHTML)){
                    for(var j=9; j>i; j--){
                        time_rank[j] = time_rank[j-1];
                    }
                    time_rank[i] = parseInt($("#time")[0].innerHTML);
                    break;
                }
            }
            
            for(var i=0; i<10; i++){
                if(coin_rank[i] < parseInt($("#coinCount")[0].innerHTML)){
                    for(var j=9; j>i; j--){
                        coin_rank[j] = coin_rank[j-1];
                    }
                    coin_rank[i] = parseInt($("#coinCount")[0].innerHTML);
                    break;
                }
            }
            if($("#scoreTitle")[0].innerHTML == "时间排行榜"){
				for(var i=0; i<10; i++){
                    $("#rank"+i)[0].innerHTML = time_rank[i];
                }
            }
            else {
                for(var i=0; i<10; i++){
                    $("#rank"+i)[0].innerHTML = coin_rank[i];
                }
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

var time_rank = new Array();
for(var i=0; i<10; i++) time_rank[i] = 0;
var coin_rank = new Array();
for(var i=0; i<10; i++) coin_rank[i] = 0;

