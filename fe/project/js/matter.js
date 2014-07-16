$('#backTomenu').click(function(){
    $('#click-music')[0].play();
    setTimeout(function(){window.location.href="index.html"}, 500);
});

$('#restart').click(function(){
    $("#click-music")[0].play();
    $('#gameoverContainer').css('opacity', 0);
    $('#gameoverContainer').css('z-index', 0);
    $('#gameover').css('opacity', 0);
    $('#gameover').css('z-index', 0);
    $('#gameoverContainer_dark').css('opacity', 0);
    $('#gameoverContainer_dark').css('z-index', 0);

    player.init(); 
    for(i=0;i<50;i++){  
        coins[i].init();  
    }  
    for(i=0;i<1;i++){
        bullets_left[i].init();
    }   
    for(i=0;i<1;i++){
        bullets_right[i].init();
    }   
    for(i=0;i<2;i++){
        bombs[i].init();
    }

    coinCount = 0;
    deltaTime = 0;
    gameover = false;
    $("#coinCount")[0].innerHTML = coinCount;  
    begin = new Date();  
    myInter = setInterval(function(){update();},20); 
    $("#background-music")[0].play();
});
    
var begin_pause = 0;
var pause = false;

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
    if(!pause && !gameover){begin_pause = new Date(); pause = true;}
    clearInterval(myInter); 
});
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
    if(!pause && !gameover){begin_pause = new Date(); pause = true;}
    clearInterval(myInter); 
});
$('#contact').click(function(){
    $("#click-music")[0].play();
    $('#gameover').css('opacity', 0);
    $('#gameover').css('z-index', 0);
    $('#donate_box').css('opacity', 0);
    $('#donate_box').css('z-index', 0);
    $('#about_box').css('opacity', 0);
    $('#about_box').css('z-index', 0);
    $('#cheats_box').css('opacity', 0);
    $('#cheats_box').css('z-index', 0);
    $('#gameoverContainer').css('opacity', 0.6);
    $('#gameoverContainer').css('z-index', 2);
    $('#contact_box').css('opacity', 1);
    $('#contact_box').css('z-index', 3);
    $('#gameoverContainer_dark').css('opacity', 0.7);
    $('#gameoverContainer_dark').css('z-index', 1);
    if(!pause && !gameover){begin_pause = new Date(); pause = true;}
    clearInterval(myInter); 
});
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
    if(!pause && !gameover){begin_pause = new Date(); pause = true;}
    clearInterval(myInter); 
});

$('.back').click(function(){
    $("#click-music")[0].play();
    if(gameover)
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
    else
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
        var end_pause = new Date();
        deltaTime += (end_pause - begin_pause);
        pause = false;
        myInter = setInterval(function(){update();},20); 
    }
});

$('#rankByTime').click(function(){
    $("#click-music")[0].play();
    $("#scoreTitle")[0].innerHTML = "时间排行榜";
    for(var i=0; i<10; i++){
        $("#rank"+i)[0].innerHTML = time_rank[i]; 
    }
	storage.is_time_coin = "true";
});
$('#rankByCoin').click(function(){
    $("#click-music")[0].play();
    $("#scoreTitle")[0].innerHTML = "金币排行榜";
    for(var i=0; i<10; i++){
        $("#rank"+i)[0].innerHTML = coin_rank[i]; 
    }
	storage.is_time_coin = "false";
});

