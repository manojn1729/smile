class Bubble{
    constructor(x,y,radius=10,hue=random(0,360)){
        this.pos=createVector(x,y)
        this.vel=p5.Vector.random2D()
        // this.vel=createVector(0,0)
        this.acc=p5.Vector.random2D()
        this.acc.limit(0.1)
        this.radius=radius
        this.color=hue
    }

    update(){
        this.vel.add(this.acc);
        this.vel.limit(1)
        this.pos.add(this.vel);
        this.show();
    }

    applayForce(){
        this.acc.add(force)
    }

    show(){
        strokeWeight(2)
        noFill()
        stroke(this.color,360,360)
        ellipse(this.pos.x,this.pos.y,this.radius,this.radius)
    }
}



class Dot{
    constructor(x,y,x1,y2,hue){
    this.color=hue
    this.pos=createVector(x, y) 
    this.dest=createVector(x1,y2)
    this.acc=p5.Vector.random2D().setMag(0.1)
    this.vel=createVector(0,0)
}

update(){
    let tmp=p5.Vector.sub(this.dest, this.pos)
    if (tmp.mag()>2){
        this.acc-this.acc.rotate(0.05)
        this.vel.add(tmp)
        this.vel.limit(2)
        this.pos.add(this.vel)
    }
    else{
        this.pos=this.dest
    }}

disp(a=255){
    this.update()
    fill(this.color,360,360,a)
    // fill(54,360,360)
    noStroke()
    circle(this.pos.x, this.pos.y,5)
}
}


class Partical{
    constructor(x=random(0,width),y=random(0,height)){
        this.pos=createVector(x,y)
        this.vel=p5.Vector.random2D()
        this.acc=createVector(0,0)
    }

    update(){
        this.followPath()
        this.vel.add(this.acc);
        this.vel.limit(1)
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.show()
    }

    applayForce(force){
        this.acc.add(force)
    }

    show(){
        point(this.pos.x,this.pos.y)
    }

    followPath(){
        let x=floor(this.pos.x/scl)
        let y=floor(this.pos.y/scl)
        this.applayForce(flowPath[x+y*cols])
    }

    bounce(){
        if(this.pos.x<0){
            this.pos.x=width
        }

        if(this.pos.x>width){
            this.pox.x=0
        }

        if(this.pos.y<0){
            this.pos.y=height
        }

        if(this.pos.y>width){
            this.pos.y=0
        }
    }
}