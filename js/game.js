(function () {
    let Game = window.Game = function () {
        this.canvas = document.getElementsByTagName("canvas")[0];
        let cWidth = document.documentElement.clientWidth;
        let cHeight = document.documentElement.clientHeight;
        this.canvas.width = cWidth > 420 ? 420 : cWidth;
        this.canvas.height = cHeight>750?750:cHeight;
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext("2d");
        }
        this.senceNumber = 0;//场景编号
        this.score = 0;//分数
        if(!localStorage.getItem("allScore","[]")){
           localStorage.setItem("allScore","[]")
        }
        this.R = {
            "bg_day": "img/bg_day.png",
            "land": "img/land.png",
            "pipe_down": "img/pipe_down.png",
            "pipe_up": "img/pipe_up.png",
            "bird0_0": "img/bird0_0.png",
            "bird0_1": "img/bird0_1.png",
            "bird0_2": "img/bird0_2.png",
            "title": "img/title.png",
            "button_play": "img/button_play.png",
            "tutorial": "img/tutorial.png",
            "shuzi0": "img/font_048.png",
            "shuzi1": "img/font_049.png",
            "shuzi2": "img/font_050.png",
            "shuzi3": "img/font_051.png",
            "shuzi4": "img/font_052.png",
            "shuzi5": "img/font_053.png",
            "shuzi6": "img/font_054.png",
            "shuzi7": "img/font_055.png",
            "shuzi8": "img/font_056.png",
            "shuzi9": "img/font_057.png",
            "number_context0":"img/number_context_00.png",
            "number_context1":"img/number_context_01.png",
            "number_context2":"img/number_context_02.png",
            "number_context3":"img/number_context_03.png",
            "number_context4":"img/number_context_04.png",
            "number_context5":"img/number_context_05.png",
            "number_context6":"img/number_context_06.png",
            "number_context7":"img/number_context_07.png",
            "number_context8":"img/number_context_08.png",
            "number_context9":"img/number_context_09.png",
            "baozha1": "img/1.png",
            "baozha2": "img/2.png",
            "baozha3": "img/3.png",
            "baozha4": "img/4.png",
            "baozha5": "img/5.png",
            "baozha6": "img/6.png",
            "baozha7": "img/7.png",
            "baozha8": "img/8.png",
            "baozha9": "img/9.png",
            "text_game_over": "img/text_game_over.png",
            "score_panel": "img/score_panel.png",
            "medals_0": "img/medals_0.png",
            "medals_1": "img/medals_1.png",
            "medals_2": "img/medals_2.png",
            "medals_3": "img/medals_3.png",
        };
        this.progress = new Progress(this.ctx, (this.canvas.width - 0.7 * this.canvas.width) / 2, (this.canvas.height - 30) / 2, 0, 30);
        //初始化进度条，x坐标为=(画布的总长度-进度条总长度)/2,y坐标=(画布的总高度-进度条的总高度)/2;
        this.loadImage();//加载游戏图片

    }
    Game.prototype.loadImage = function(){
        this.loadCount = 0;//加载的图片个数
        this.totalCount = Object.keys(this.R).length;//需要加载的总图片数
        for (let item in this.R) {//加载所有图片
            let image = new Image();
            image.src = this.R[item];
            this.R[item] = image;
            image.onload = () => {
                this.loadCount++;//加载完成的图片数加一
                this.clear();
                this.progress.update((this.loadCount / this.totalCount) * this.canvas.width * 0.7);
                this.progress.render();
                if (this.loadCount == this.totalCount) {
                    this.start();
                }
            }
           
        }
    }
    Game.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    Game.prototype.start = function () {
        this.clear();
        // this.pipeCount = 0;
        // this.background = new Background();
        // this.land = new Land();
        this.senceManage = new senceManage();
        this.senceManage.enter(this.senceNumber);
        this.pipeArr = [];
        this.timer = setInterval(()=>{
            // this.pipeCount++;
            this.clear();
            this.senceManage.updateAndRender();
            // this.ctx.fillStyle = "#4ec0ca";
            // this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height-this.background.h);
            // this.background.update();
            // this.background.render();
            // this.land.update();
            // this.land.render();
            // if(this.pipeCount%220==0){
            //     new Pipe();
                
            //    }
            // this.pipeArr.forEach(item=>{
            //     item.update();
            //     item.render();
            //   })
           
          
        },1000/60)
       
        // this.ctx.fillStyle = "blue";
        // this.ctx.font = "40px Arial";
        // this.ctx.fillText("游戏开始", 100, 100)
    }
}())