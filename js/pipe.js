(function(){
    let Pipe =window.Pipe = function(){
        this.totalHeight = game.canvas.height-112;//上下管道加上中间空隙的可用总高度;
        this.x=game.canvas.width;
        this.speed = 1;
        this.space = 150;//上下管道之间的空隙距离
        this.hTop = Math.round(Math.random()*(this.totalHeight*0.2)+120);//上管道随机高度
        this.hBottom = this.totalHeight-this.space-this.hTop;
        this.done = true;
        game.pipeArr.push(this);
    } 
    Pipe.prototype.update = function(){
       this.x-=this.speed;
       if(this.x<=-game.R['pipe_down'].width){
          for(let i=0;i<game.pipeArr.length;i++){
              if(game.pipeArr[i]==this){
                  game.pipeArr.splice(i,1);
                  i--;
              }
          }
       };
       if(game.bird.x+24>this.x+5&&game.bird.x+10<this.x+58&&game.bird.y<this.hTop
          ||game.bird.x+24>this.x+5&&game.bird.x+10<this.x+58&&game.bird.y>this.hTop+this.space){
             
                game.senceManage.enter(3);
                document.getElementsByClassName("hit")[0].load();
                document.getElementsByClassName("hit")[0].play();
          }
        if(this.done&&game.bird.x+10>this.x+58){
            game.score++;
            this.done=false;
            //播放音乐
            document.getElementsByClassName("point")[0].load();
            document.getElementsByClassName("point")[0].play();
        }
    }
    Pipe.prototype.render = function(){
        game.ctx.drawImage(game.R["pipe_down"],0,game.R['pipe_down'].height-this.hTop,52,this.hTop, this.x,0,52,this.hTop);
        game.ctx.drawImage(game.R["pipe_up"],0,0,52,this.hBottom, this.x,this.hTop+this.space,52,this.hBottom);
    }
}())