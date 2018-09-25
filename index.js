var crypto = require('crypto');
var connect = require('connect');
var route_connect = require('connect-route');
var cors = require('cors');
var bodyParser = require('body-parser');
var Storage = require('node-storage');
var http = require("http");
var url = require('url');
var qs = require('querystring');

var userStorage = new Storage('~/public_html/userStorage');
var gameStorage= new Storage('~/public_html/gameStorage');
var globalUpdater= new updater();

//criar objeto para jogador com nome, pass, quantas vitorias, e jogo
function player(playerName){
    
    this.playerName = playerName;
    this.password="";
    this.totalGames = 0;
    this.wins=0;
    this.loss=0;
    this.game="";
    
    this.incrementGames = function () {
        this.totalGames = this.totalGames + 1;
    }
        
    this.incrementWin=function(){
        this.wins=this.wins+1;
    }
    this.incrementLoss=function(){
        this.loss=this.loss+1;
    }
    
    //função para gerar passwords
    this.generatePass= function(pass){
        this.password = crypto.createHash('md5').update(pass).digest('hex');
        
    }
}


//criar jogo como chave de referencia

function board(size,player1, player2){
    
    this.player1=player1;
    this.player2=player2;
    var turn;
    
    //tamanho do tabuleiro que vai de 3 a 7
    if(size<3 || size>7){
        return -2;
    }
    this.size=size;
    
    switch(this.size){
        case "3": 
            this.board= [
                [1,0,0],
                [1,1,0],
                [1,1,1]
            ];
            break;
        case "4":
            this.board= [
                [1,0,0,0],
                [1,1,0,0],
                [1,1,1,0],
                [1,1,1,1]
            ];
            break;
        case "5":
            this.board= [
                [1,0,0,0,0],
                [1,1,0,0,0],
                [1,1,1,0,0],
                [1,1,1,1,0],
                [1,1,1,1,1]
            ];
            break;
        case "6":
            this.board= [
                [1,0,0,0,0,0],
                [1,1,0,0,0,0],
                [1,1,1,0,0,0],
                [1,1,1,1,0,0],
                [1,1,1,1,1,0],
                [1,1,1,1,1,1]
                
            ];
            break;
        case "7":
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
        if(this.turn==this.player1.playerName){
            this.turn=this.player2.playerName;
        }
        else if(turn==this.player2.playerName){
            this.turn=this.player1.playerName;
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
    
    this.convertToRack= function(){
         var rack= [];
        
        switch(size){
            case "3": 
                rack= [0,0,0];
                break;
            case "4":
                rack= [0,0,0,0];
                break;
            case "5":
                rack= [0,0,0,0,0];
                break;
            case "6":
                rack= [0,0,0,0,0,0];
                break;
            case "7":
                rack=[0,0,0,0,0,0,0];
                break;
        }
                
                
        
        for(var i =0; i< size; i++){
            for(var j=0; j<size; j++){
                if(this.board[i][j]==1){
                    rack[i]++;
                }
                
            }
            
        }
        return rack;
        
    };
    
   
}
    
    



//criação de servidor
var application = http.createServer(function (request,response) {
        var preq = url.parse(request.url,true);
        var pathname = preq.pathname;

        switch(request.method) {

                case "POST":
                
                        response.writeHead(200, {
                            'Content-Type': 'application/javascript',
                            'Cache-Control': 'no-cache',
                            'Access-Control-Allow-Origin': '*' 
                        });
                        postHandler(request,response, pathname);
                        break;
                //tenho de fazer
                case "GET":
                        response.writeHead(200, {
                            'Content-Type': 'text/event-stream',
                            'Cache-Control': 'no-cache',
                            'Access-Control-Allow-Origin': '*',
                            'Connection': 'keep-alive'
                        });
                        
                        getHandler(request,response,
                        pathname);
                        break;
                
                default:
                        response.writeHead(501);
                        response.end();

        }


});

//estas funções todas em modulos

function postHandler(request, response, pathname){



                switch(pathname){
                        case '/register':
                                register(request,response);
                                break;

                        case '/ranking':
                                ranking(request, response);
                                break;
                        
                        //tenho de fzr
                        case '/join':
                                join(request, response);
                                break;
                        //tenho de fzr
                        case '/notify':
                                notify(request,response);
                                break;
                        
                        //tenho de fzr
                        case '/leave':
                                leave(request, response);
                                break;

                        default:
                                response.write('{"error"}');
                                response.end();
                }

}


function getHandler(request, response, pathname){
    
    switch(pathname){
            
        case '/update':
            var preq = url.parse(request.url,true);
            var query = preq.query;
            var game= query.game;
            var tmpBoard= gameStorage.get(game);
            globalUpdater.remember(response);
            if(tmpBoard.player1!=undefined && tmpBoard.player2!=undefined){
                //enviar a primeira informação
                var obj = {"turn":tmpBoard.turn, "rack": tmpBoard.convertToRack()};
                
                globalUpdater.update(JSON.stringify(obj));
                
            }
            
            
            break;    
            
            
    }
    
}

function join(request, response){
    var post, user, pass;
    var body='';
    var size;
    
    request.on('data', function(data){
        body += data;
    });
    
    request.on('end', function () {
        //tratamento de dados
        post= JSON.parse(body);
        user = post.nick;
        pass= post.pass;
        var tmpPlayer=userStorage.get(user);
        
        //verificar se já está registado
        
        if(tmpPlayer==undefined){
            response.write("{error:User not registred}");
            response.end();
            
            
        }
        
        else{
       //verificar se tem a pass certa
         if(tmpPlayer.password!=pass){
             response.write("{error:User registred with different password}");
             response.end();
             
         }
            
            else{
        
        
                size= post.size;
            var hash= crypto.createHash('md5');
            var mystr= hash.update(size);
            var key=mystr.digest('hex');
               
            var game= {"game": key};    
                //se não existe um jogo já criado
            if(gameStorage.get(key)==undefined){
            
                var tmpBoard= new board(size, tmpPlayer, undefined);
                tmpBoard.turn=tmpPlayer.playerName;
                
                gameStorage.put(key, tmpBoard);
                response.write(JSON.stringify(game));
                response.end();
                
                
               
                
            }
                //se já existe um jogo criado
                else{
                    var tmpBoard=gameStorage.get(key);
                    var player1=tmpBoard.player1;
                    tmpBoard.player2=tmpPlayer;
                    var player2=tmpBoard.player2;
                    
                    gameStorage.put(key,tmpBoard);
                    console.log("jogo criado com o jogador " + player2.playerName + " e o " + player1.playerName);
                    response.write('{"game": "' + key + '"}');
                    response.end();
                        
                }
            
            }
        }
        
        
        
    });
    
    
}

function leave(request, response){ }


//objeto que contem faz update para cada jogo a ser executado

function updater (){
    this.responses= [];
    this.remember= function(response) {
        this.responses.push(response);
    } 
    
    this.update= function(message){
        for(var r in this.responses){
            this.responses[r].write("data: " + message+ "\n\n");
        }
    }
  
    
}





function notify(request, response){
    
    var game,stack, pieces
    var body= '';
    
    request.on('data', function(data){
               body += data;
               });
    
    request.on('end', function(){
        
        post = JSON.parse(body);
        game= post.game;
        stack=post.stack;
        pieces= post.pieces;
        
        var tmpBoard = gameStorage.get(game);
        tmpBoard.play(pieces,stack);
       
        
        var obj={"turn": tmpBoard.turn, "rack": tmpBoard.convertToRack(), "stack": stack , "pieces": pieces};
        response.write("{}");
        response.end();
        globalUpdater.update(JSON.stringify(obj));
        
        
    });
    
    
}



function ranking(request, response){

        var size;
        var post;
        var body = '';

        request.on('data', function (data){
                body += data;
        });

        request.on('end', function (){
                post = JSON.parse(body);
                size = post.size;

                if(size == undefined){
                        response.write('{"error":"Missing arguments."}');
                        response.end();
                }

                else {
                        console.log("No ranking table yet");
                        response.write('{}');
                        response.end();
                }

        });
}

function register (request, response){

        var post,user,pass;
        var body = '';

        request.on('data', function (data) {
                body += data;
        });

        request.on('end', function () {

                post = JSON.parse(body);
                user = post.nick;
                pass = post.pass;

                var aux = userStorage.get(user);


                if(user == undefined || pass == undefined){
                        console.log(user);
                        response.write("{error}");
                        response.end();
                }


                if(userStorage.get(user)!= undefined){
                        console.log("User already exists");
                        response.write("{error: User regitered with different password");
                        response.end();
                }
                else {

                        var tmpPlayer= new player(user);
                        tmpPlayer.password=pass;
                    
                        userStorage.put(user,tmpPlayer);
                        response.write("{}");
                        response.end();
                        console.log("Utilizador Inserido");
                }
        });
}

application.listen(8044);
console.log("server is listening");
