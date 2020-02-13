//场景管理器
// 0.初始化界面
// 1.教学场景
// 2.游戏场景
// 3.爆炸场景
// 4.颁奖场景
(function(){
    let senceManage = function(){
        this.canvasHeight = game.canvas.height;
        this.canvasWidth = game.canvas.width;
        this.bindEvent();
    }
    senceManage.prototype.enter = function(senceNumber){
        game.senceNumber = senceNumber;
        switch(senceNumber){
            case 0:
               this.titleY = 0;
               this.titleChangeY = 3;
               this.buttonY = this.canvasHeight;
               this.buttonChangeY = 6;
               this.birdY = Math.round(this.canvasHeight*0.4);
               this.birdChangeY = -2;
               this.birdImageCount = 0;//用于切换小鸟图
               this.birdImageCountChange = 1;
            break;
            case 1:
              this.birdY = this.canvasHeight*0.2;
              this.tutorialY = this.canvasHeight*0.4;
              this.birdImageCount = 0;
              this.birdImageCountChange = 1;
              this.globalAlpha = 1;
              this.globalAlphaChange = 0.02;
            break;
            case 2:
              game.score = 0;
              this.background = new Background();
              this.land = new Land();
              this.bird = game.bird = new Bird();
              this.pipeCount = 0;
            break;
            case 3:
              this.background = new Background();
              this.land = new Land();
              this.isBoom = false;
              this.boomCount = 1;
              this.boomPing = 0;//控制爆炸图切换的频率
              document.getElementsByClassName("die")[0].load();
              document.getElementsByClassName("die")[0].play();
            break;
            case 4:
              this.background = new Background();
              this.land = new Land();
              this.game_over_y = 0;
              this.score_panel_y=game.canvas.height;
              this.arr =JSON.parse(localStorage.getItem("allScore"));
              console.log(this.arr);
              this.arr.sort((a,b)=>b-a)
              this.best = this.arr[0];
              if(game.score>this.arr[0]||this.arr.length==0){
                  this.modalNumber = 1;
                  this.best = game.score;
              }else if(game.score>this.arr[1]){
                  this.modalNumber = 2;
              }else if(game.score>this.arr[2]){
                  this.modalNumber = 3;
              }else{
                  this.modalNumber = 0;
              }
              console.log(this.modalNumber);
              if(!this.arr.includes(game.score)){
                this.arr.push(game.score);
              }
              
              localStorage.setItem("allScore",JSON.stringify(this.arr));
              break

        }
    }
    senceManage.prototype.updateAndRender = function(){
        switch(game.senceNumber){
            case 0:
               game.ctx.fillStyle = "#4ec0ca";
               game.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight-game.R["bg_day"].height)
               game.ctx.drawImage(game.R["bg_day"],0,this.canvasHeight-game.R["bg_day"].height)
               game.ctx.drawImage(game.R["bg_day"],game.R["bg_day"].width,this.canvasHeight-game.R["bg_day"].height)
               game.ctx.drawImage(game.R["land"],0,this.canvasHeight-game.R["land"].height);
               game.ctx.drawImage(game.R["land"],game.R["land"].width,this.canvasHeight-game.R["land"].height)
               this.titleY+=this.titleChangeY;
               if(this.titleY>Math.round(this.canvasHeight*0.2)){
                   this.titleY=Math.round(this.canvasHeight*0.2);
               }
               game.ctx.drawImage(game.R["title"],(this.canvasWidth-game.R["title"].width)/2,this.titleY);
               this.buttonY-=this.buttonChangeY;
               if(this.buttonY<Math.round(this.canvasHeight*0.55)){
                   this.buttonY=Math.round(this.canvasHeight*0.55);
               }
               game.ctx.drawImage(game.R["button_play"],(this.canvasWidth-game.R["button_play"].width)/2,this.buttonY);
               //画小鸟
               this.birdY += this.birdChangeY;
               if(this.birdY<Math.round(this.canvasHeight*0.3)){
                   this.birdChangeY=2;
               }
               if(this.birdY>Math.round(this.canvasHeight*0.45)){
                   this.birdChangeY=-2;
               }
               game.ctx.drawImage(game.R["bird0_"+this.birdImageCount],(this.canvasWidth-game.R["bird0_0"].width)/2,this.birdY)
               this.birdImageCount+=this.birdImageCountChange;
               if(this.birdImageCount>=2){
                   this.birdImageCountChange=-1;
               }
               if(this.birdImageCount<=0){
                   this.birdImageCountChange=1
               }
               break;
               case 1://新手教学场景
               game.ctx.fillStyle = "#4ec0ca";
               game.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight-game.R["bg_day"].height)
               game.ctx.drawImage(game.R["bg_day"],0,this.canvasHeight-game.R["bg_day"].height)
               game.ctx.drawImage(game.R["bg_day"],game.R["bg_day"].width,this.canvasHeight-game.R["bg_day"].height)
               game.ctx.drawImage(game.R["land"],0,this.canvasHeight-game.R["land"].height);
               game.ctx.drawImage(game.R["land"],game.R["land"].width,this.canvasHeight-game.R["land"].height)
               game.ctx.drawImage(game.R["bird0_"+this.birdImageCount],(this.canvasWidth-game.R["bird0_0"].width)/2,this.birdY)
               this.birdImageCount+=this.birdImageCountChange;
               if(this.birdImageCount>=2){
                   this.birdImageCountChange=-1;
               }
               if(this.birdImageCount<=0){
                   this.birdImageCountChange=1
               }
               this.globalAlpha-=this.globalAlphaChange;
               if(this.globalAlpha<0.2){
                   this.globalAlphaChange = -0.02
               }
               if(this.globalAlpha>0.8){
                   this.globalAlphaChange = 0.02
               }
               game.ctx.save();
               game.ctx.globalAlpha = this.globalAlpha;
               game.ctx.drawImage(game.R["tutorial"],(this.canvasWidth-game.R["tutorial"].width)/2,this.tutorialY)
               game.ctx.restore();
               break;
               case 2:
              
               this.background.update();
               this.background.render();
               this.land.update();
               this.land.render();
               this.bird.update();
               this.bird.render();
               this.pipeCount++;
               if(this.pipeCount%200 ==0){
                   new Pipe();
               }
               game.pipeArr.forEach(item=>{
                   item.update();
                   item.render();
               })
               renderScore();
               break;
               case 3:
                 this.background.render();
                 this.land.render();
                 this.bird.render();
                 game.pipeArr.forEach(item=>{
                     item.render();
                 })
                 if(this.isBoom){
                     this.boomPing++;
                     game.ctx.drawImage(game.R["baozha"+this.boomCount],game.bird.x-50,game.bird.y-50,100,100);
                     if(this.boomPing%2==0){
                         this.boomCount++
                     }
                     if(this.boomCount>8){
                         this.enter(4)
                     }
                 }else{
                     game.bird.y+=6;
                     if(game.bird.y>game.canvas.height-112){
                         this.isBoom = true;
                     }
                     this.bird.render();
                 }
                 renderScore();
               break;
               case 4:
                  this.background.render();
                  this.land.render();
                  game.pipeArr.forEach(item=>{
                      item.render();
                  })
                  this.game_over_y+=6;
                  if(this.game_over_y>200){
                      this.game_over_y=200;
                  }
                  this.score_panel_y-=8;
                  if(this.score_panel_y<300){
                      this.score_panel_y=300
                  }
                  game.ctx.drawImage(game.R["text_game_over"],(this.canvasWidth-204)/2,this.game_over_y)
                  game.ctx.drawImage(game.R["score_panel"],(this.canvasWidth-238)/2,this.score_panel_y)
                  game.ctx.drawImage(game.R["medals_"+this.modalNumber],(this.canvasWidth-204)/2+12,this.score_panel_y+40)
                  for(let i=0;i<this.best.toString().length;i++){
                      game.ctx.drawImage(game.R['shuzi'+this.best.toString()[i]],(this.canvasWidth-204)/2+170+i*10,this.score_panel_y+80,10,20)
                  }
                  for(let i=0;i<game.score.toString().length;i++){
                      game.ctx.drawImage(game.R['shuzi'+game.score.toString()[i]],(this.canvasWidth-204)/2+170+i*10,this.score_panel_y+40,10,20)
                  }
                  break;
        }
    }
    senceManage.prototype.bindEvent = function(){
        game.canvas.onclick = (e)=>{
            e = e || window.e;
           
            switch(game.senceNumber){
                case 0:
                console.log(game.canvas.offsetLeft)
                if(e.clientX-game.canvas.offsetLeft>(this.canvasWidth-116)/2&&
                e.clientX<(this.canvasWidth-116)/2+116+game.canvas.offsetLeft&&
                e.clientY>this.buttonY&&
                e.clientY<this.buttonY+70){
                    this.enter(1)//进入第二个新手教学场景
                }
                break;
                case 1:
                this.enter(2)//进入游戏场景
                break;
                case 2:
                this.bird.fly();
                break;
                case 3:
                break;
                case 4:
                this.land = null;
                game.pipeArr = [];
                game.bird = null;
                this.enter(0)
               
                break;
            }
        }
    }
    function renderScore(){
        let score = game.score.toString();
        for(let i=0;i<score.length;i++){
            game.ctx.drawImage(game.R["shuzi"+score[i]],game.canvas.width/2-score.length/2*30+i*30,100);
        }
    }
    window.senceManage = senceManage;
}())