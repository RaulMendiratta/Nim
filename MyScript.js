//construtor de objeto de tabuleiro com todos os metedos necessarios
//retorna -1 para o erro de inicializar com um tamanho do tabuleiro que não seja compreendido entre o 3 e o 7
//retorna -2 para o erro de incializar o player não ser um "me" ou um "other"

function board(size,player){
    // player muda entre "me"  e "other"
    if(player!="me" && player!="other"){
        return -1;
    }
    
    this.player=player;
    
    //tamanho do tabuleiro que vai de 3 a 7
    if(size<3 || size>7){
        return -2;
    }
    this.size=size;
    
    switch(this.size){
        case 3: 
            this.board= [
                [1,0,0],
                [1,1,0],
                [1,1,1]
            ];
            break;
        case 4:
            this.board= [
                [1,0,0,0],
                [1,1,0,0],
                [1,1,1,0],
                [1,1,1,1]
            ];
            break;
        case 5:
            this.board= [
                [1,0,0,0,0],
                [1,1,0,0,0],
                [1,1,1,0,0],
                [1,1,1,1,0],
                [1,1,1,1,1]
            ];
            break;
        case 6:
            this.board= [
                [1,0,0,0,0,0],
                [1,1,0,0,0,0],
                [1,1,1,0,0,0],
                [1,1,1,1,0,0],
                [1,1,1,1,1,0],
                [1,1,1,1,1,1]
                
            ];
            break;
        case 7:
            this.board= [
                [1,0,0,0,0,0,0],
                [1,1,0,0,0,0,0],
                [1,1,1,0,0,0,0],
                [1,1,1,1,0,0,0],
                [1,1,1,1,1,0,0],
                [1,1,1,1,1,1,0],
                [1,1,1,1,1,1,1]
            ];
            break;
            
        };
    
    
    //metedo para jogar, retorna -1 se for jogado numa posição impssivel, muda automaticamente o player
    this.play = function(positionColumn,positionRow) {
        
        if(this.board[positionRow][positionColumn]==0){
            return -1;
        }
        for(var i=positionColumn; i<this.size; i++){
            this.board[positionRow][i] = 0;
        }
        if(this.player=="me"){
            this.player="other";
        }
        else if(this.player=="other"){
            this.player="me";
        } 
    };
    
    //metedo para ver se o tabuleiro está vazio
    this.isBoardEmpty= function(){
        for(var i=0; i<this.size; i++){
            for(var j=0; j<3; j++){
                if(this.board[i][j]==1){
                    return false;
                }
            }
        }
    return true;
        
    };
    
    //metedo para fazer uma jogada aleatoria
    this.computerRandomPlay= function(){
        var flag=true;
       while(flag==true) 
        if(this.play(Math.floor((Math.random()*this.size)),Math.floor((Math.random()*this.size)))!=-1){
            flag=false;
           
        }
    };
    
   
   
    
    
}

function player(playerName){
    
    this.playerName = playerName;
    this.totalGames = 0;
    this.wins=0;
    this.loss=0;
    
    this.incrementGames = function () {
        this.totalGames = this.totalGames + 1;
    }
        
    this.incrementWin=function(){
        this.wins=this.wins+1;
    }
    this.incrementLoss=function(){
        this.loss=this.loss+1;
    }
}

function multiRankDataBank(size){
    
    this.size=size;
    this.players= [];
    this.pushPlayer= function(player){
        this.players.push(player);
    }
    
    
    
}


var overallScore = JSON.parse(localStorage.getItem("overallScore"));
var tempPlayer = new player();
var gameID;
var confPanel;
function menu() {
    
    
    
    var openScore = false;
    var openGame = false;
    var openInst = false;
    var find= false;
    var user = document.getElementById("userid").value;
  
    var element = document.getElementById("login");
    element.style.visibility = "hidden";

    /*
    for(var i=0; i<overallScore.length;i++){
        if(overallScore[i].playerName===user){
            tempPlayer.playerName=overallScore[i].playerName;
            tempPlayer.wins=overallScore[i].wins;
            find =true;
        }
    }
    if(find==false){
     tempPlayer = new player(user);
    }*/

    
    
    
    /*
    Navigation
    */
    
    var box = document.createElement("div");    //Div Nave
    box.id = "menu";
    var para = document.createElement("ul");
    
    var list = document.createElement("li");
    var node = document.createTextNode("Jogo");
    list.id = "jogo";
    
    
    var list2 = document.createElement("li");
    var node2 = document.createTextNode("ScoreBoard");
    list2.id = "scoreboard";
    
    var list3 = document.createElement("li");
    var node3 = document.createTextNode("Instruções");
    list3.id = "instrucoes";
    
    list.appendChild(node);
    list2.appendChild(node2);
    list3.append(node3);
    
    
    para.appendChild(list);
    para.appendChild(list2);
    para.appendChild(list3);
    
    
    /*
    Logout Button
    */
    
    var box2 = document.createElement("div");
    box2.id = "box2";
    var button = document.createElement("button");
    button.id = "bt1";
    var node3 = document.createTextNode("Logout");
    button.appendChild(node3);
    box2.appendChild(button); 
    box.appendChild(para);
    box.appendChild(box2);
    
    
    /*
    Add to the body element
    */ 
    var element = document.getElementById("body");
    element.appendChild(box);
    
    
      
    /*
    Logout button event
    */
    
    document.getElementById("bt1").addEventListener("click",function(){    
        
        document.getElementById("body").removeChild(box);
        document.getElementById("login").style.visibility = "visible";
        openScore = false;
        
    });
    
  
  
    
    /*
    Game Config display
    */ 
    
    
    document.getElementById("jogo").addEventListener("click", function(){
        
            var multiActive = false;
            var nick;
            var password;
            var gameID;
            var tableSize;
        
            openGame = true;
        
            if(openScore == true){
                var element = document.getElementById("menu");
                element.removeChild(document.getElementById("scoreDiv"));
                openScore = false;
            }
        
            if(openInst == true){
                
                var element = document.getElementById("menu");
                element.removeChild(document.getElementById("instDiv"));
                openInst = false;      
            }
        
        
        
             confPanel = document.createElement("div");
            confPanel.id = "confPanel";
            
            
            /*
            Configure
            */
            var sizeLabel = document.createElement("h2");
            var label = document.createTextNode("Configure");
            sizeLabel.appendChild(label);
            confPanel.appendChild(sizeLabel);
            
            
            
           
            var barPanel = document.createElement("div");
            barPanel.id = "barPanel";
            
            
            var sizeLabel = document.createElement("p");
            var label = document.createTextNode("Tamanho");
            sizeLabel.appendChild(label);
            sizeLabel.appendChild(document.createElement("br"));
            sizeLabel.appendChild(document.createTextNode("(3-7)"));
            barPanel.appendChild(sizeLabel);
            
            
            var bar = document.createElement("input");
            bar.id = "tableSize";
            bar.setAttribute("type", "text");
            sizeLabel.appendChild(document.createElement("br"));
            sizeLabel.appendChild(bar);
        
            
            /*
            Buttons
            */
            
            var buttons = document.createElement("div");
            buttons.id = "buttonsPanel"
            
            var multiPlayer = document.createElement("button");
            var multi = document.createTextNode("MultiPlayer");
            multiPlayer.appendChild(multi);
            
            var singlePlayer = document.createElement("button");
            var single = document.createTextNode("SinglePlayer");
            singlePlayer.appendChild(single);
            
            
            
            var selector = document.createElement("select");
            var option1 = document.createElement("option");
            option1.appendChild(document.createTextNode("Easy"));
            selector.appendChild(option1);
            var option1 = document.createElement("option");
            option1.appendChild(document.createTextNode("Hard"));
            selector.appendChild(option1);
            
            var ready = document.createElement("button");
            var readyLabel = document.createTextNode("Ready");
            ready.appendChild(readyLabel);
            ready.style.backgroundColor = "#4CAF50"
            ready.style.borderRadius = "4px";
            
            
            buttons.appendChild(barPanel);
            buttons.appendChild(document.createElement("br"));
            buttons.appendChild(document.createElement("br"));
            buttons.appendChild(selector);
            buttons.appendChild(document.createElement("br"));
            buttons.appendChild(document.createElement("br"));
            buttons.appendChild(multiPlayer);
            buttons.appendChild(document.createElement("br"));
            buttons.appendChild(document.createElement("br"));
            buttons.appendChild(singlePlayer);
            buttons.appendChild(document.createElement("br"));
            confPanel.appendChild(buttons);
             
            var menu = document.getElementById("menu");
            menu.appendChild(confPanel);
        
            
        
        
            /*
            Game
            */
            
            multiPlayer.addEventListener("click",function(){
                
                if(multiActive === false){
                    multiActive = true;
                    multiPlayer.style.backgroundColor = "red";
                }
                
                else{
                    multiActive = false;
                    multiPlayer.style.backgroundColor = "black";
                }
                
                nick = document.getElementById("userid").value;
                password = document.getElementById("password").value;
                tableSize = document.getElementById("tableSize").value;
                           
                var obj = {"group":"44", "nick":nick, "pass":password,"size":tableSize}
                var xhr = new XMLHttpRequest();
                xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8044/join",true);
        
                xhr.onreadystatechange = function(){
                    var response = xhr.responseText;
                
                    if(xhr.readyState == 4 && xhr.status == 200){
                        alert("Accepted");
                        var tmp = JSON.parse(response);
                        gameID = tmp.game;
                        multiModeRun(nick,password,gameID);
        
                    }
                    else 
                        if(xhr.readyState == 4 && xhr.status == 400){
                            alert(response);
                            multiActive = false;
                            multiPlayer.style.backgroundColor = "black";
                        }
                }   
        
                    xhr.send(JSON.stringify(obj));     
                    
                  
                });
        
        
            singlePlayer.addEventListener("click",function(){
                       
                var sizeTable= Number(document.getElementById("tableSize").value); 
                
                if(sizeTable < 3 || sizeTable > 7){
                    var aux = document.getElementById("tableSize");
                    aux.style.borderColor = "red";
                    aux.style.borderRadius = "10px";
                    aux.style.borderWidth = "5px";
                }
                
                else {
                    singleModeRun();
                }
    });
 
        
           
        
    });
    
    
    /*
    ScoreBoard Display
    */
    
    document.getElementById("scoreboard").addEventListener("click",function(){
        
        
        
        if(openGame == true){
            var element = document.getElementById("menu");
            element.removeChild(document.getElementById("confPanel"));
            openGame = false;
        }
        
        if(openInst == true){
                var element = document.getElementById("menu");
                element.removeChild(document.getElementById("instDiv"));
                openInst = false;      
        }
        
        if(openScore == false){
        
        var scoreDiv = document.createElement("div");
        scoreDiv.id = "scoreDiv"
   
        var scoreTable = document.createElement("table");
        scoreTable.id = "scoreTable"
    
        var rowHead = document.createElement("th");
        var aux1 = document.createTextNode("User");
        rowHead.appendChild(aux1);
    
        scoreTable.appendChild(rowHead);
    
        var rowHead = document.createElement("th");
        var aux1 = document.createTextNode("Wins");
        rowHead.appendChild(aux1);
        
        scoreTable.appendChild(rowHead);
        overallScore= JSON.parse(localStorage.getItem("overallScore"));
        overallScore.sort(function(a,b){
                 if(a.wins < b.wins)
                     return 1;
                 else if (a.wins > b.wins)
                     return -1;
            
                 else
                     return 0;
        });
        
    
        
        for(i=0;i<overallScore.length;i++){
            
            var flag = overallScore[i];
            
            var row = document.createElement("tr");
            row.appendChild(document.createTextNode(flag.playerName));
            
            var rowHead = document.createElement("td");
            var aux1 = document.createTextNode(flag.wins);
            rowHead.appendChild(aux1);
            
            row.appendChild(rowHead);
            scoreTable.appendChild(row);           
        }
        
            
        var multiRank = document.createElement("button");
        multiRank.appendChild(document.createTextNode("MutiPlayer Rank's"));
        multiRank.id = "multiButton";
            
            
        scoreDiv.appendChild(scoreTable);
        scoreDiv.appendChild(multiRank);
            
        var element = document.getElementById("menu");
        element.appendChild(scoreDiv);
        
        openScore = true;
            
            
            document.getElementById("multiButton").addEventListener("click",function(){
                scoreDiv.removeChild(scoreTable);
                scoreDiv.removeChild(multiRank);
                
                var multiRankDiv=document.createElement("div");
                multiRankDiv.id="multiRankDiv";
                
                
                
                var sizeLabel = document.createElement("p");
            var label = document.createTextNode("Tamanho");
            sizeLabel.appendChild(label);
            sizeLabel.appendChild(document.createElement("br"));
            sizeLabel.appendChild(document.createTextNode("(3-7)"));
            multiRankDiv.appendChild(sizeLabel);
            
                
                
                
                var bar = document.createElement("input");
            bar.id = "tableSizeForRank";
            bar.setAttribute("type", "text");
                
                var submitRankButton= document.createElement("button");
                submitRankButton.appendChild(document.createTextNode("Ranking"));
                
                submitRankButton.id="submitRankingButton";
                multiRankDiv.appendChild(bar);
                 multiRankDiv.appendChild(document.createElement("br"));
                multiRankDiv.appendChild(submitRankButton);
               
                scoreDiv.appendChild(multiRankDiv);
                
                
                submitRankButton.addEventListener("click",function(){
                     var size= document.getElementById("tableSizeForRank").value;
                    
                    multiRankDiv.removeChild(bar);
                    multiRankDiv.removeChild(sizeLabel);
                    multiRankDiv.removeChild(submitRankButton);
                    
                   //fazer erros de tamanho
                    
                    
                    showMultiRank(size);
                    
                    
                    
                    
                    
                });
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
            });
            
        }
        
        
    });
    
    
    document.getElementById("instrucoes").addEventListener("click",function(){
        
        openInst = true;
        
        if(openGame == true){
            var element = document.getElementById("menu");
            element.removeChild(document.getElementById("confPanel"));
            openGame = false;
        }
        
        if(openScore == true){
            var element = document.getElementById("menu");
            element.removeChild(document.getElementById("scoreDiv"));
            openScore = false;
        }

        if(openScore ==false){
        var instDiv = document.createElement("div");
        instDiv.id = "instDiv";
        
        var text = document.createElement("p");
        text.appendChild(document.createTextNode("In one move, you can remove any number of circles but only from one row. Select any circle to remove it, and the one's in 'front of it '. You win if you leave the LAST match for the computer."));
        instDiv.appendChild(text);
        
        var element = document.getElementById("menu");
        element.appendChild(instDiv);
        
        openScore = true;
        }
        
        
    });
    
}

function register() {
    
     
        var body = document.getElementById("body");
    
        var registerPanel = document.createElement("div");
        var componentPanel = document.createElement("div");
        registerPanel.id = "registerPanel";
        componentPanel.id = "component";
    
        var header = document.createElement("h2");
        var text = document.createTextNode("Register");
        header.appendChild(text);
    
        var bar = document.createElement("input");
        bar.setAttribute("type", "text");
    
        var bar2 = document.createElement("input");
        bar2.setAttribute("type", "password");
        bar2.id = "regPass"
    
        var btn = document.createElement("input");
        btn.setAttribute("type", "button");
        btn.setAttribute("value", "Submit");
    
        var btn2 = document.createElement("input");
        btn2.setAttribute("type", "button");
        btn2.setAttribute("value", "Back");
    
        var username = document.createElement("h3");
        var text = document.createTextNode("Username");
        username.appendChild(text);
    
        var password = document.createElement("h3");
        var text = document.createTextNode("Password");
        password.appendChild(text);
    
        componentPanel.appendChild(header);
        componentPanel.appendChild(username);
        componentPanel.appendChild(bar);
        componentPanel.appendChild(password);
        componentPanel.appendChild(bar2);
        componentPanel.appendChild(btn);
        componentPanel.appendChild(btn2);
    
        registerPanel.appendChild(componentPanel);
        body.appendChild(registerPanel);
    
    
    btn.addEventListener("click",function(){
        
            var obj = {"nick": bar.value, "pass": bar2.value}
            var xhr = new XMLHttpRequest();
            
            xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8044/register",true);
            xhr.withCredentials = true;
        
            xhr.onreadystatechange = function(){
                var response = xhr.responseText;
                
                if(xhr.readyState == 4 && xhr.status == 200){
                    alert("Accepted"); document.getElementById("body").removeChild(registerPanel);
                }
                else 
                    alert(response);    
            }   
        
        xhr.send(JSON.stringify(obj));     
    });
        
    
    btn2.addEventListener("click",function(){
        document.getElementById("body").removeChild(registerPanel);
    });
        
}

function singleModeRun(){
    
    var sizeTable= Number(document.getElementById("tableSize").value); 
    var gameBoard = new board(sizeTable,"me");
    var boardDiv = document.createElement("div");
    var headerBoardDiv=document.createElement("h1");
    headerBoardDiv.id="headerBoard";
    boardDiv.id = "board";
    
            
                   
    function displayGame(player){              
       
        if(gameBoard.isBoardEmpty()==true){
            if(player=="other"){
                var flag=false;
                tempPlayer.incrementWin();
                
                alert("Ganhaste " + tempPlayer.playerName + "! Tens " + tempPlayer.wins + " vitorias e " + tempPlayer.loss + " derrotas.");
            
                    
                for(var i=0; i< overallScore.length; i++){
                    if(overallScore[i].playerName===tempPlayer.playerName){
                        overallScore[i]=tempPlayer;
                        flag=true;
                        
                    }
                    
                }
                    if(flag==false){
                    overallScore.push(tempPlayer);
                    }
                    localStorage.setItem("overallScore",JSON.stringify(overallScore))
            }
                   
            else if(player=="me"){
                tempPlayer.incrementLoss();
                alert("Perdeste " + tempPlayer.playerName + "! Tens " + tempPlayer.wins + "     vitorias e " + tempPlayer.loss + " derrotas.");
            }
           
            var menu = document.getElementById("menu");    
            menu.removeChild(boardDiv);
            menu.appendChild(confPanel);
        }
               
        var table = document.createElement("table");
        table.id = "mainTable";
            
        for(i = 0; i <sizeTable; i++){
            var row = document.createElement("tr");
            
            for(j = 0; j < sizeTable; j++){
                                
                if(gameBoard.board[i][j] == 1){
                                        
                    var column = document.createElement("td");
                                
                    column.setAttribute("data-x",i);
                    column.setAttribute("data-y",j);
                                    
                    if(player=="me"){
                                            
                        column.addEventListener("click",function(){
                                                
                            var tmpx = this.getAttribute("data-x");
                            var tmpy = this.getAttribute("data-y");
                            gameBoard.play(tmpy,tmpx);
                            displayGame(gameBoard.player);
                            boardDiv.removeChild(table);     
                        });
                    }
                    row.appendChild(column);
                }
            }
    
            table.appendChild(row);
        }
                
        boardDiv.appendChild(headerBoardDiv);
        boardDiv.appendChild(table);
            
        if(player=="me"){
            document.getElementById("headerBoard").innerHTML="És tu a jogar!";
        }
        
        else if(player=="other"){
            document.getElementById("headerBoard").innerHTML="É a vez do pc!";
        }
                    
        if(player=="other"){
            gameBoard.computerRandomPlay();
            setTimeout(myFunction,1000);
                        
            function myFunction(){
                displayGame(gameBoard.player);
                boardDiv.removeChild(table);
            }
        }
    }
        
    
    var element = document.getElementById("menu");
    element.removeChild(document.getElementById("confPanel"));
                   
    var back = document.createElement("button");
    back.id = "back";
                           
    var buttonStartMe=document.createElement("button");
    var buttonStartOther=document.createElement("button");
    var textButtonStartMe=document.createTextNode("Começo eu!");
    var textButtonStartOther=document.createTextNode("Começa Computador!");
    buttonStartMe.appendChild(textButtonStartMe);
    buttonStartMe.id= "buttonChoicePlayer";
    buttonStartOther.id="buttonChoicePlayer";    
    buttonStartOther.appendChild(textButtonStartOther);
            
                        
    var textButton = document.createTextNode("Back");
    back.appendChild(textButton);
        
    boardDiv.appendChild(back);
    boardDiv.appendChild(buttonStartMe);
    boardDiv.appendChild(buttonStartOther);
    element.appendChild(boardDiv);
                
                
    buttonStartMe.addEventListener("click",function(){
        boardDiv.removeChild(buttonStartMe);
        boardDiv.removeChild(buttonStartOther);
        displayGame(gameBoard.player);    
    } );
            
    buttonStartOther.addEventListener("click",function(){
        gameBoard.player="other";
        boardDiv.removeChild(buttonStartMe);
        boardDiv.removeChild(buttonStartOther);
        displayGame(gameBoard.player);
    });
            
    back.addEventListener("click",function(){
        var menu = document.getElementById("menu");
        var confPanel= document.getElementById("confPanel");
        menu.removeChild(boardDiv);
        menu.appendChild(confPanel);      
    });
}

function multiModeRun(nick,pass,gameID){
    
    console.log("nick:" + nick);
    
    
    var sizeTable= Number(document.getElementById("tableSize").value); 
    var gameBoard = new board(sizeTable,"me");
    var boardDiv = document.createElement("div");
    var headerBoardDiv=document.createElement("h1");        
    boardDiv.id = "board";
    headerBoardDiv.id="headerBoard";
    
    var element = document.getElementById("menu");
    element.removeChild(document.getElementById("confPanel"));
                   
    var back = document.createElement("button");
    back.id = "back";
                           
            
    var leaveButton = document.createElement("button");
    leaveButton.appendChild(document.createTextNode("Leave"));
    leaveButton.id = "leaveButton";
                        
    element.appendChild(leaveButton);
    element.appendChild(boardDiv);
    
    
    update(nick,gameID,gameBoard,pass);
            
    
    

    leaveButton.addEventListener("click",function(){
            
                  
                var xhr = new XMLHttpRequest();
                var obj = {"nick": nick, "pass": pass, "game": gameID }
                xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8008/leave",true);
        
                xhr.onreadystatechange = function(){
                    var response = xhr.responseText;
                
                    if(xhr.readyState == 4 && xhr.status == 200){
                        element.removeChild(leaveButton);
                    }
                    else 
                        if(xhr.readyState == 4 && xhr.status == 400){
                            alert(response);
                        }
                }   
        
                    xhr.send(JSON.stringify(obj)); 
            });
    
     

}

function notifyServer(nick,password,gameID,stack,pieces){
    
    var stackInt=parseInt(stack);
    var piecesInt=parseInt(pieces);
    
    console.log("stack:" + stack + " pieces:" + pieces);
  
    var obj = {"nick":nick, "pass":password,"game":gameID, "stack":stackInt,"pieces":piecesInt};
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8044/notify",true);
        
    xhr.onreadystatechange = function(){
        var response = xhr.responseText;
                    
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log("Worked!");
        }
        else 
            if( xhr.status == 400){
                alert(response);
            }
    }   
    
    console.log(obj);
    xhr.send(JSON.stringify(obj));   
    
}

function displayGame(nick,turn,gameBoard,gameID,pass){              
       
        var boardDiv = document.getElementById("board");
        var headerBoardDiv=document.createElement("h1");
        headerBoardDiv.id="headerBoard";
    
        console.log("nick:" + nick);
        console.log("turn:" + turn);
    
        var sizeTable = gameBoard.size;
        
        if(gameBoard.isBoardEmpty()==true){
            
            if(player=="other"){
                tempPlayer.incrementWin();
                
                alert("Ganhaste " + tempPlayer.playerName + "! Tens " + tempPlayer.wins + " vitorias e " + tempPlayer.loss + " derrotas.");
                
                var count = 0;            
                
                for(i=0;i<overallScore.length;i++){
                    if(overallScore[i].playerName == tempPlayer.playerName){
                        count++;
                    }
                }
                    
                if(count == 0){
                    overallScore.push(tempPlayer);
                }
                else{
                    count = 0;
                }
            }
                   
            else if(player == "me"){
                tempPlayer.incrementLoss();
                alert("Perdeste " + tempPlayer.playerName + "! Tens " + tempPlayer.wins + "     vitorias e " + tempPlayer.loss + " derrotas.");
            }
                   
            menu.removeChild(boardDiv);
            menu.appendChild(confPanel);
        }
               
        var table = document.createElement("table");
        table.id = "mainTable";
            
        for(i = 0; i <sizeTable; i++){
            var row = document.createElement("tr");
            
            for(j = 0; j < sizeTable; j++){
                                
                if(gameBoard.board[i][j] == 1){
                                        
                    var column = document.createElement("td");
                                
                    column.setAttribute("data-x",i);
                    column.setAttribute("data-y",j);
                                    
                    if(nick === turn){
                        
                                  
                        
                        column.addEventListener("click",function(){ 
                            
                            var tmpx = this.getAttribute("data-x");
                            var tmpy = this.getAttribute("data-y");
                            gameBoard.play(tmpy,tmpx);
                            notifyServer(nick,pass,gameID,tmpx,tmpy);
                          
                            
                        
                        });
                    }
                    
                    row.appendChild(column);
                }
            }
    
            table.appendChild(row);
        }
                
        boardDiv.appendChild(headerBoardDiv);
        boardDiv.appendChild(table);
        
        
        if(turn === nick){
            document.getElementById("headerBoard").innerHTML="És tu a jogar!";
        }
        
        else if(turn !== nick){
            document.getElementById("headerBoard").innerHTML="É a vez do jogador <br>" + turn + "!";
           /* var brk= document.createElement("br");
            document.getElementById("headerBoard").appendChild(brk);
            */
            
        }
        
                    
  
    }
   
    
function update(nick,gameID,board,pass){

    	var updater = new EventSource("http://twserver.alunos.dcc.fc.up.pt:8044/update?nick=" + nick + "&game="+gameID);
    	
    	updater.onmessage = function(event){
    		var message = JSON.parse(event.data);
            
        console.log(message);
            
            if(!message.error){
                
        
                
                 
            
                jogador = message.turn;
                
                if("turn" in message){
                    if("stack" in message){
                        var table= document.getElementById("mainTable");
                        var boardDiv = document.getElementById("board");
                        boardDiv.removeChild(table);
                        board.play(message.pieces, message.stack);
                        displayGame(nick,message.turn,board,gameID,pass);
                        
                    }
                    
                   
                   else{ 
                       displayGame(nick,message.turn,board,gameID,pass);
                       }
                    
                }
                
                 else if ("winner" in message){
                        var table= document.getElementById("mainTable");
                        var boardDiv = document.getElementById("board");
                        boardDiv.removeChild(table);
                        if(message.winner===nick){
                            document.getElementById("headerBoard").innerHTML="Ganhaste!!";
                            
                        }
                        else{
                            document.getElementById("headerBoard").innerHTML="Perdeste!!";
                        }
                     updater.close();
                    }
                
                    
            
            }
    		    		
    		
        };
}  


function showMultiRank(size){
    var sizeInt= parseInt(size);
    var obj= {"size": sizeInt};
    
    var xhr= new XMLHttpRequest();
    
    xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8008/ranking",true);
    
    xhr.onreadystatechange= function(){
        var response= xhr.responseText;
        
        if(xhr.readyState==4 && xhr.status==200){
           
            //codigo para mostrar
            
            
            var dataRank = new multiRankDataBank(size);
            var parseResponse= JSON.parse(response);
            
            var ranking= parseResponse["ranking"];
            
            for(var i=0; i< ranking.length; i++){
                var person= ranking[i];
                var name= person["nick"]
                var tmpPlayer= new player(JSON.stringify(name));
                tmpPlayer.wins=person["victories"];
                tmpPlayer.totalGames=person["games"];
                
                dataRank.pushPlayer(tmpPlayer);    
            }
            
            displayMultiRank(dataRank);
            
            
            
            
            
        }
        else{
            //alert(response);
        }
        
    }
    
    xhr.send(JSON.stringify(obj));
        
        
    }

function displayMultiRank(dataRank){
    
    var multiScoreTable= document.createElement("table");
    multiScoreTable.id="multiScoreTable";
    
    var rowHead= document.createElement("th");
    var aux1 = document.createTextNode("User");
    rowHead.appendChild(aux1);
    
    multiScoreTable.appendChild(rowHead);
    
    var rowHead= document.createElement("th");
    var aux1 = document.createTextNode("Wins");
    rowHead.appendChild(aux1);
    
    multiScoreTable.appendChild(rowHead);
    
    var rowHead= document.createElement("th");
    var aux1 = document.createTextNode("Games");
    rowHead.appendChild(aux1);
    
    multiScoreTable.appendChild(rowHead);
    
    for(var i=0; i< dataRank.players.length; i++){
        
        var row = document.createElement("tr");
        
        row.appendChild(document.createTextNode(dataRank.players[i].playerName));
        
        var rowColumnWins = document.createElement("td");
        
        var auxWins = document.createTextNode(dataRank.players[i].wins);
        rowColumnWins.appendChild(auxWins);
        row.appendChild(rowColumnWins);
       
        var rowTotalGames = document.createElement("td");
        
        var auxGames = document.createTextNode(dataRank.players[i].totalGames);
        rowTotalGames.appendChild(auxGames);
        row.appendChild(rowTotalGames);
        
        
        
        
        multiScoreTable.appendChild(row);
       
        
        
        
        
    }
    
    
    var multi= document.getElementById("multiRankDiv");
    multi.appendChild(multiScoreTable);
    
    
}
    
    



    
