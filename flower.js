class Flower{
    constructor(img,x=random(width),y=random(height)){
        this.img=img;
        this.x=x;
        this.y=y;
        this.xSpeed=1*random(0.3,0.8);
        this.ySpeed=1*random(0.3,0.8);
        this.angle=0
        this.aSpeed=random(-0.005,0.005)
        this.width=100;
        this.height=100;
        this.points=[]
    }

    update(){
        this.angle+=this.aSpeed
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
        if(this.x-this.width/2<0 ){ 
            this.x=this.width/2
            this.xSpeed/=(-1*abs(this.xSpeed))
            this.xSpeed*=random(0.6,0.9)
        }
        if(this.x+this.width/2>width){
            this.x=width-this.width/2
            this.xSpeed/=(-1*abs(this.xSpeed))
            this.xSpeed*=random(0.6,0.9)
        }
        if(this.y-this.height/2<0){ 
            this.y=this.height/2
            this.ySpeed/=(-1*abs(this.ySpeed))
            this.ySpeed*=random(0.6,0.9)
        }
        if(this.y+this.height/2>height){
            this.y=height-this.height/2
            this.ySpeed/=(-1*abs(this.ySpeed))
            this.ySpeed*=random(0.6,0.9)
        }

    }

    show(){
        this.update()
        push()
        translate(this.x,this.y)
        rotate(this.angle)
        image(this.img,0,0,this.width,this.height)
        pop()
        if(floor(this.x)%30==0)
            bubbles.push(new Bubble(this.x,this.y,random(10,20)))
    }

    inBound(x,y){

        if(abs(this.x-x)<(this.width/2.5) && abs(this.y-y)<(this.height/2.5))
        {
            return true
        }
        else{
            return false
        }
    }
}