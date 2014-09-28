    TableSize=60;
    RefreshTime=100;
    PointNumber=0;
    map=new Array(TableSize);
    newmap =new Array(TableSize);
    
    pause=false;
    start=false;


function createMap(){
    for (var i = 0; i < TableSize; i++){
        line =new Array(TableSize);
        newline=new Array(TableSize);
        map[i]=line;
        newmap[i]=newline;
        for (var j = 0; j < TableSize; j++) {
           line[j]=false;
           newline[j]=false;
        }
    }
    createTable(map);
}

function createTable(map) {
    var t = document.createElement('table');
    t.cellSpacing="0";
    t.cellPadding="0";
    t.setAttribute('border', '1');
    t.setAttribute('borderColor', 'DCDCDC');
    for (var i = 0; i < TableSize; i++) {
            var r = t.insertRow(0);
            for (var j = 0; j < TableSize; j++) {
               var cell = r.insertCell(0);
               cell.height="10px";
               cell.width="10px";
               if(map[i][j]) {cell.bgColor = "Red";}
               else {cell.bgColor = "White";}
               cell.onclick=function(){clickCell(this.parentNode.rowIndex,this.cellIndex);};
            }
    }
    document.getElementById('table1').appendChild(t);  
    document.getElementById("RATE").value=RefreshTime.toString();
    document.getElementById("LENGTH").value=TableSize.toString();
}

function clickCell(x,y){
    if(start){return;}
    else{
        if(map[x][y]==true){
            clearPoint(x,y);
        }
        else{
            drawPoint(x,y);
        }
    }
}

function clearPoint(x,y){
    document.getElementById('table1').childNodes.item(2).rows[x].cells[y].bgColor="White";
    map[x][y] = false;
}

function drawPoint(x,y){
    document.getElementById('table1').childNodes.item(2).rows[x].cells[y].bgColor="Red";
    map[x][y] = true;
}

function Start(){
    start = true;
    document.getElementById("start").disabled=true;
    document.getElementById("pause").disabled=false;
    document.getElementById("reset").disabled=true;
    grow();
}

function Pause(){
    start=false;
    document.getElementById("start").disabled=false;
    document.getElementById("pause").disabled=true;
    document.getElementById("reset").disabled=false;
    clearTimeout(t);
}

function Reset(){
    while(document.getElementById("table1").childNodes.length>2){
        document.getElementById("table1").removeChild(document.getElementById('table1').childNodes.item(2));
    }
    createMap();
}

function grow(){
    pause = true;
    for(var i=0;i<TableSize;i++){
        for (var j=0;j<TableSize;j++){
            livePoint(i,j);  
        }
    }
    for(var i=0;i<TableSize;i++){
        for (var j=0;j<TableSize;j++){
            map[i][j]=newmap[i][j];
        }
    }
    if(!pause){
        t=setTimeout(function(){grow()},RefreshTime);
    }
    else{
        Pause();
        return;
    }
}

function livePoint(x,y){
    var live = 0;
    if(map[x][(y-1+TableSize)%TableSize]==true) {live++;}//Up
    if(map[x][(y+1)%TableSize]==true) {live++;}//Down
    if(map[(x+1)%TableSize][y]==true){live++;}//Right
    if(map[(x+1)%TableSize][(y+1)%TableSize]==true){live++;}//RightDown
    if(map[(x+1)%TableSize][(y-1+TableSize)%TableSize]==true){live++;}//RightUp
    if(map[(x-1+TableSize)%TableSize][y]==true){live++;}//Left
    if(map[(x-1+TableSize)%TableSize][(y-1+TableSize)%TableSize]==true){live++;}//LeftUp
    if(map[(x-1+TableSize)%TableSize][(y+1)%TableSize]==true){live++;}//LeftDown

    if(live == 3){
        document.getElementById('table1').childNodes.item(2).rows[x].cells[y].bgColor="Red";
        newmap[x][y] = true;
    }
    else if(live == 2 && map[x][y] == true){
        document.getElementById('table1').childNodes.item(2).rows[x].cells[y].bgColor="Red";
        newmap[x][y] = true;
    }
    else{
        document.getElementById('table1').childNodes.item(2).rows[x].cells[y].bgColor="White";
        newmap[x][y] = false;
    }

    pause = pause&&(map[x][y]==newmap[x][y]);
}

function inputTime(){
    if(document.getElementById("RATE").value>0){
        RefreshTime=parseInt(document.getElementById("RATE").value);
    }
    else{
        alert("输入时间不合法！请重新输入！");
        document.getElementById("RATE").value=RefreshTime.toString();
    }
}
function inputLength(){
    if(document.getElementById("LENGTH").value>0){
        TableSize=parseInt(document.getElementById("LENGTH").value);
        Reset();
    }
    else{
        alert("输入长度不合法！请重新输入！");
        document.getElementById("LENGTH").value=TableSize.toString();
    }
    
}
function inputRandom(){
    PointNumber=parseInt(document.getElementById("RANDOM").value);
    Reset();
    if(PointNumber>TableSize*TableSize){
        alert("随机点数超过地图总格数！请重新输入！");
        document.getElementById("RANDOM").value="";
    } 
    else if(PointNumber<0){
        alert("随机点数不合法！请重新输入！");
        document.getElementById("RANDOM").value="";
    } 
    else{
        var i=0;
        while(i<PointNumber){
            var x = parseInt(TableSize*Math.random());
            var y = parseInt(TableSize*Math.random());
            if(!map[x][y]){
                map[x][y]=true;
                i++;
            }
        }
        while(document.getElementById("table1").childNodes.length>2){
            document.getElementById("table1").removeChild(document.getElementById('table1').childNodes.item(2));
        }
        createTable(map);
    }   
}