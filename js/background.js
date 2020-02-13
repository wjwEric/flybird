(function(){
    let Background =window.Background = function(){
        this.x = 0;
        this.h = 512;
        this.w = 288;
        this.step = 1;
    }
    Background.prototype.update=function(){
         this.x-= this.step;
         if(this.x <-this.w){
             this.x=0;
         }
    }
    Background.prototype.render=function(){
        game.ctx.fillStyle = "#4ec0ca";
        game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height-game.R["bg_day"].height)
        game.ctx.drawImage(game.R['bg_day'],this.x,game.canvas.height-this.h);
        game.ctx.drawImage(game.R['bg_day'],this.x+this.w,game.canvas.height-this.h);
        game.ctx.drawImage(game.R['bg_day'],this.x+this.w*2,game.canvas.height-this.h);
    }
}())