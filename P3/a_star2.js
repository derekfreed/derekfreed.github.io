var height=45;
var width=45;
var margin=5;
var started;
var finished;
var rowLen=15;
var colLen=15;
var open = [];
var close = [];
var steps=0;
var guess;
var done;
var steps;
var notStartedYet;

var c = document.getElementById("Game");
var ctx = c.getContext("2d");

c.addEventListener("click", onClick, false);
window.addEventListener("keydown", keyHandler,false);

var gridMap = new Array();

init();
function init(){
    started=false;
    finished=false;
    done=false;
    open=[];
    close=[];
    sRow=-1;
    sCol=-1;
    steps=0;
    done=false;
    notStartedYet=true;
    //make the background 
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,c.width,c.height);

    //create the grid initiated with nodes
    for(var row=0; row<rowLen; row++){
        gridMap[row]= new Array();
        for(var col=0; col<colLen; col++){
            if (Math.random() > 0.9){
                var x = new Node(row,col,1);
                gridMap[row][col] = x;
            }
            else{
                var x = new Node(row,col);
                gridMap[row][col] = x;
            }
        }
    }
    //draw the gridMap based from the 'nature' of the Node
    draw();
}
function ManhattanDistance(){
    //find out where the finish is and store as x and y
    for(var row=0; row<rowLen; row++){
        for(var col=0; col<colLen; col++){
            if(gridMap[row][col].isFinish){
                var x=row;
                var y=col;
            }
        }
    }
    //calculate all h values for all nodes
    for(var row=0; row<rowLen; row++){
        for(var col=0; col<colLen; col++){
            gridMap[row][col].h=(Math.abs(x-row)+Math.abs(y-col))*10;
        }
    }
}
//Only difference in Dstar from Astar is that you make h 0 in Dstar
function dijkstra(){
    //initializes values if we are just starting the search algorithm
    if(notStartedYet){
        guess=document.getElementById("guess").value;
        //find the starting node
        for(var row=0; row<rowLen; row++){
            for(var col=0; col<colLen; col++){
                if(gridMap[row][col].isStart){
                    var x=row;
                    var y=col;
                }
                gridMap[row][col].h=0;
            }
        }
        var start= gridMap[x][y];
    
        open.push(start);
        notStartedYet=false;
    }
    aStar();
}
//****I used the wikipedia psuedo code in order to derive my algorithm****
function aStar(){
    //initializes values if we are just starting the search algorithm
    if(notStartedYet){
        ManhattanDistance();
        guess=document.getElementById("guess").value;
        //find the starting node
        for(var row=0; row<rowLen; row++){
            for(var col=0; col<colLen; col++){
                if(gridMap[row][col].isStart){
                    var x=row;
                    var y=col;
                }
            }
        }
        var start= gridMap[x][y];
    
        open.push(start);
        notStartedYet=false;
    }
    if(open.length>0&&!done){
        steps++;
        document.getElementById("steps").innerHTML="Steps: "+steps;
        var min;
        var minIndex;
        //find index of min f in open
        for(var i=0; i<open.length;i++){
            if(i==0){
                min=open[i].f;
                minIndex=i;
            }
            else{
                if(open[i].f<min){
                    min=open[i].f;
                    minIndex=i;
                }
            }
        }
        var current=open[minIndex];
        open.splice(minIndex,1);
        getNeighbors(current);
        var length=0;
        if(current.isFinish){
            while(!current.isStart){
                if(!current.isFinish ){
                    current.finalPath=true;
                }
                current=current.parent;
                length++;

                document.getElementById("distance").innerHTML="Distance: "+length+" blocks";
                
            }
            draw();
            ctx.font="15px Arial";
            for(var row=0; row<rowLen; row++){
                for(var col=0; col<colLen; col++){
                    ctx.fillStyle = "#000000";
                    ctx.fillText(gridMap[row][col].f,(margin+width)*col+margin*2,(margin+width)*row+margin*4);
                }
            }
            //we found the finish so we are done!
            done=true;
            return;
        }
    
        close.push(current);
        current.path=true;
        //look at neighbors to calculate their f values
        for(var i=0; i<current.neighbors.length; i++) {
                var tentativeG;
                var neighbor = current.neighbors[i];
                if(current.row==neighbor.row||current.col==neighbor.col){
                    tentativeG=current.g+10;
                }
                else{
                    tentativeG= current.g+14;
                }
                if(contains(close,neighbor) && tentativeG>=neighbor.g){
                    continue;
                }
                if(!(contains(open,neighbor)) || tentativeG<neighbor.g){
                    neighbor.parent=current;
                    neighbor.g=tentativeG;
                    neighbor.f=neighbor.g+neighbor.h;
                    if(!(contains(open,neighbor))){
                        open.push(neighbor);
                    }
                }
            
        }
        //update the GUI
        draw();
    }
    //if the Path is not found and the finish has not been reached
    else if(!done){
        alert("no path found");
    }
    //if you are done then, tell the user if the guess was correct
    if(done){
        if(guess==steps){
            alert("oh my god you got the steps correct!It was "+steps);
        }
        else{
            alert("Guess was incorrect. The answer was "+steps);
        }
    }

}
//used when user resizes grid
function newGrid(){
    var numRows=document.getElementById("rows");
    var numCols=document.getElementById("cols");
    rowLen=numRows.value;
    colLen=numCols.value;
    if(rowLen>15){
        rowLen=15;
    }
    if(colLen>15){
        colLen=15;
    }
    init();
}
function draw(){
    for(var row=0; row<rowLen; row++){
        for(var col=0; col<colLen; col++){
            if(gridMap[row][col].isEmpty){
                ctx.fillStyle = "#ffffff";
                ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
            }
            else if(gridMap[row][col].isStart){
                ctx.fillStyle = "#ff0000";
                ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
                ctx.font="15px Arial";
                ctx.fillStyle = "#000000";
                ctx.fillText("S",(margin+width)*col+margin*4,(margin+width)*row+margin*6);
            }
            else if(gridMap[row][col].isWall){
                ctx.fillStyle = "#000000";
                ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
            }
            else if(gridMap[row][col].isFinish){
                ctx.fillStyle = "#00ff00";
                ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
                ctx.font="15px Arial";
                ctx.fillStyle = "#000000";
                ctx.fillText("F",(margin+width)*col+margin*4,(margin+width)*row+margin*6);
            }
            if(gridMap[row][col].path && !gridMap[row][col].isStart){
                ctx.fillStyle = "#AAD4F4";
                ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
            }
            if(gridMap[row][col].finalPath){
                ctx.fillStyle = "#EDE139";
                ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
            }
        }
    }
}
function keyHandler(e){
    //********f pressed***********
    if(e.keyCode==70){
        ctx.font="15px Arial";
        draw();
        for(var row=0; row<rowLen; row++){
            for(var col=0; col<colLen; col++){
                    ctx.fillStyle = "#000000";
                    ctx.fillText(gridMap[row][col].f,(margin+width)*col+margin*2,(margin+width)*row+margin*4);
            }
        }
    }
    //********g pressed***********
    if(e.keyCode==71){
        ctx.font="15px Arial";
        draw();
        for(var row=0; row<rowLen; row++){
            for(var col=0; col<colLen; col++){
                    ctx.fillStyle = "#000000";
                    ctx.fillText(gridMap[row][col].g,(margin+width)*col+margin*2,(margin+width)*row+margin*4);
            }
        }
    }
    //********h pressed***********
    if(e.keyCode==72){
        ctx.font="15px Arial";
        draw();
        for(var row=0; row<rowLen; row++){
            for(var col=0; col<colLen; col++){
                ctx.fillStyle = "#000000";
                ctx.fillText(gridMap[row][col].h,(margin+width)*col+margin*2,(margin+width)*row+margin*4);
            }
        }
    }
    //********h pressed***********
    //CLEAR THE F,G,H FROM GRID
    if(e.keyCode==67){
        draw();
    }
    if(e.keyCode==39){
        aStar();
    }
    if(e.keyCode==37){
        dijkstra();
    }
}
//This is where the user can change the function or 'nature' of a certain node, such as wall, finish, start
function onClick(e) {
    var element = c;
    var offsetX = 0;
    var offsetY = 0;

    if (element.offsetParent) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    x = e.pageX - offsetX;
    y = e.pageY - offsetY;
    row = Math.floor(y/(width+margin));
    col = Math.floor(x/(height+margin));
    if(row>=rowLen){
        return;
    }
    if(col>=colLen){
        return;
    }
    /*
     ****Handles Changing the Nodes to different kinds of Nodes when clicked*****
     *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
     */
    //if selected node is blank
    if(gridMap[row][col].isEmpty){
        
        if(!finished){
            ctx.fillStyle = "#00FF00";
            ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
            ctx.font="15px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText("F",(margin+width)*col+margin*4,(margin+width)*row+margin*6);
            finished=true;
            gridMap[row][col].changeNature(3);
        }
        else{
            ctx.fillStyle = "#000000";
            ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
            gridMap[row][col].changeNature(1);

        }
    }
    //if selected node is start
    else if(gridMap[row][col].isStart){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
        started=false;
        gridMap[row][col].changeNature(0);
    }
    //if selected node is wall
    else if(gridMap[row][col].isWall){
        if(!started){
            ctx.fillStyle = "#FF0000";
            ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
            ctx.font="15px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText("S",(margin+width)*col+margin*4,(margin+width)*row+margin*6);
            started=true;
            gridMap[row][col].changeNature(2);
        }
        else{
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
            gridMap[row][col].changeNature(0);
        }
    }
    //if selected node is end
    else if(gridMap[row][col].isFinish){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect((margin+width)*col+margin,(margin+width)*row+margin,width,height);
        finished=false;
        gridMap[row][col].changeNature(1);
    }

    //alert("row:"+row+"column:"+column+gridMap[row][column]);
}
//changes the neighbor array in each node in the gridMap
function getNeighbors(node){
            var nodeNeighbors = new Array();
            var westWall=false;
            var eastWall=false;
            var southWall=false;
            var northWall=false;
            // West
            if(node.col-1>=0){
                if(gridMap[node.row][node.col-1].isWall){
                    westWall=true;
                }
                if(gridMap[node.row][node.col-1] && !(gridMap[node.row][node.col-1].isWall)) {
                    nodeNeighbors.push(gridMap[node.row][node.col-1]);
                }
            }
            // East
            if(node.col+1<gridMap[node.row].length){ 
                if (gridMap[node.row][node.col+1].isWall){
                    eastWall=true;
                }
                if(gridMap[node.row][node.col+1] && !(gridMap[node.row][node.col+1].isWall)) {
                    nodeNeighbors.push(gridMap[node.row][node.col+1]);
                }
            }
            // South
            if(node.row+1<gridMap.length){
                if(gridMap[node.row+1][node.col].isWall){
                    southWall=true;
                }
                if(gridMap[node.row+1][node.col] && !(gridMap[node.row+1][node.col].isWall)) {
                    nodeNeighbors.push(gridMap[node.row+1][node.col]);
                }
            }
            // North
            if(node.row-1>=0){
                if(gridMap[node.row-1][node.col].isWall){
                    northWall=true;
                }
                if(gridMap[node.row-1][node.col] && !(gridMap[node.row-1][node.col].isWall)) {
                    nodeNeighbors.push(gridMap[node.row-1][node.col]);
                }
            }
            // Southwest
            if(node.row+1<gridMap.length && node.col-1>=0){
                if(gridMap[node.row+1][node.col-1] && !(gridMap[node.row+1][node.col-1].isWall)&&!southWall&&!westWall) {
                    nodeNeighbors.push(gridMap[node.row+1][node.col-1]);
                    gridMap[node.row+1][node.col-1].cost=14;
                }
            }
            // Southeast
            if(node.row+1<gridMap.length){
                if(node.col+1<gridMap[node.row+1].length){
                    if(gridMap[node.row+1][node.col+1] && !(gridMap[node.row+1][node.col+1].isWall)&&!southWall&&!eastWall) {
                        nodeNeighbors.push(gridMap[node.row+1][node.col+1]);
                        gridMap[node.row+1][node.col+1].cost=14;
                    }
                }
            }
            // Northwest
            if(node.row-1>=0 && node.col-1>=0){
                if(gridMap[node.row-1][node.col-1] && !(gridMap[node.row-1][node.col-1].isWall)&&!northWall&&!westWall) {
                    nodeNeighbors.push(gridMap[node.row-1][node.col-1]);
                    gridMap[node.row-1][node.col-1].cost=14;
                }
            }
            // Northeast
            if(node.row-1>=0){
                if(node.col+1<gridMap[node.row-1].length){
                    if(gridMap[node.row-1][node.col+1] && !(gridMap[node.row-1][node.col+1].isWall)&&!northWall&&!eastWall) {
                        nodeNeighbors.push(gridMap[node.row-1][node.col+1]);
                        gridMap[node.row-1][node.col+1].cost=14;
                    }
                }
            }
            node.neighbors=nodeNeighbors;
            
         
}
//determines whether or not the node is in the given array
function contains(array,node){
    for(var i=0;i<array.length;i++){
        if(array[i]==node){
            return true;
        }
    }
    return false;
}
function Node(x,y,nature){
    this.neighbors = new Array();
    this.row=x;
    this.col=y;
    this.f=0;
    this.g=0;
    this.h=0;
    this.parent;
    this.path=false;
    this.finalPath=false;
    this.cost=10;
    this.isWall=false;
    this.isStart=false;
    this.isFinish=false;
    this.isEmpty=true;
    if(nature==1){
        this.isWall=true;
        this.isStart=false;
        this.isFinish=false;
        this.isEmpty=false;
    }
    if(nature==2){
        this.isStart=true;
        this.isWall=false;
        this.isFinish=false;
        this.isEmpty=false;
    }
    if(nature==3){
        this.isFinish=true;
        this.isStart=false;
        this.isWall=false;
        this.isEmpty=false;
    }

    this.changeNature=function(newNature){
        if(newNature==0){
            this.isEmpty=true;
            this.isWall=false;
            this.isStart=false;
            this.isFinish=false;
        }
        if(newNature==1){
            this.isWall=true;
            this.isStart=false;
            this.isFinish=false;
            this.isEmpty=false;
        }
        if(newNature==2){
            this.isStart=true;
            this.isWall=false;
            this.isFinish=false;
            this.isEmpty=false;
        }
        if(newNature==3){
            this.isFinish=true;
            this.isWall=false;
            this.isStart=false;
            this.isEmpty=false;
        }
    };
}


