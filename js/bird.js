(function () {
    let Bird = function () {
        this.x = game.canvas.width * 0.4;//bird的初始位置
        this.y = game.canvas.height / 2 - 100;//bird的初始位置
        this.changeY = 0;
        this.rotate = 0;
        this.birdStatus = "drop";
        this.wing = 0;//煽动翅膀
        this.land = new Land();
    }
    Bird.prototype.update = function () {
       
       
        if (this.birdStatus == "drop") {
                this.changeY+=0.3;
                this.y+=this.changeY;
                this.rotate+=0.05;
        } else if (this.birdStatus == "fly") {
            this.changeY -= 0.6;
            if(this.changeY<=0){
                this.birdStatus = "drop";
                return;
            }
              this.wing++;
              if(this.wing>2){
                  this.wing=0;
              }
              this.y-=this.changeY;
              this.y<24?this.y=24:null;
        }
        if (this.y > game.canvas.height - this.land.h - 20) {
            game.senceManage.enter(3);
        }
    }
    Bird.prototype.fly = function () {
        this.birdStatus = "fly";
        this.rotate = -1;
        this.changeY=6;
        document.getElementsByClassName("wing")[0].load();
        document.getElementsByClassName("wing")[0].play();
    }
    Bird.prototype.render = function () {
        game.ctx.save();

        game.ctx.translate(this.x, this.y)
        game.ctx.rotate(this.rotate);
        game.ctx.drawImage(game.R["bird0_"+this.wing], -24, -24);


        game.ctx.restore();
    }
    window.Bird = Bird;
}())