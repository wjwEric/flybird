let Progress = function(ctx,x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
}
Progress.prototype.update=function(w){
   this.w = w;
}
Progress.prototype.render = function(){
    this.ctx.fillStyle = "yellowgreen"
    this.ctx.fillRect(this.x,this.y,this.w,this.h);
}