let wBox
let font
let font1
let sData='Happy Birthday'
let wData='AKKA'
let points=[]
let dots=[]
let check=0
let alphaB=255

let flowers=[]
let bubbles=[]
let flowerImages=[]

let noiseX=0
let textPoints=[]
let fontn
let start=0;
let xOff=0
let yOff=0;
let zOff=0
let inc=0.09;
let scl=12;
let rows,cols;
let particals=[]
flowPath=[];
let flag=-1;
let textP=[]
let cordinate=0;


function preload(){
    font1=loadFont('fonts/font1.ttf')
    font=loadFont('fonts/Gloomy.ttf')
    for(let i=0;i<6;i++){
        flowerImages.push(loadImage(`flower/flower${i+1}.png`))
    }
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    pixelDensity(1)
    imageMode(CENTER)
    for(let i=0;i<6;i++){
        flowers.push(new Flower(flowerImages[i]))
    }
    getPoints()
    setupNoise()
    let temp=points.length
    for(let i=0;i<temp;i++){
       flowers[floor(random(0,6))].points.push(points.splice(floor(random(0,points.length)),1)[0])
    }
    background(255)
    
}

function draw(){
    colorMode(HSB,360,360,360,255)

    if(bubbles.length>0 || flowers.length>0){
        background(0)
        drawPoints()
        drawBubbles()
    }
    else{
        if(cordinate==0){
            getAxis()
        }
        if(alphaB>0){
                alphaB-=1
            if(cordinate==1 || cordinate==3 || cordinate==-1){
                background(0)
            }
            else{
                background(255-alphaB)
            }
            drawPoints()
        }
        else{
            drawNoise()
    }}

    // noLoop()
}
function getAxis(){
    if(mouseIsPressed){
        if(mouseY<height/2){
            if(mouseX<width/2){
                cordinate=1

            }
            else{
                cordinate=2
            }
        }
        else{
            if(mouseX<width/2){
                cordinate=3
            }
            else{
                cordinate=4
            }

        }
    }
    else{
        cordinate=-1
    }
    print(cordinate)
}

function drawNoise(){
    yOff=start
    colorMode(HSB,360,360,360,255)
    strokeWeight(0.1)
    for(let j=0;j<rows;j++){
        xOff=start;
        for(let i=0;i<cols;i++){
            let index=(i+j*cols)
            let dis=noise(xOff,yOff,zOff)*PI*2
            let v=p5.Vector.fromAngle(dis).setMag(0.1)
            flowPath[index]=v
            xOff+=inc;
        }
        yOff+=inc;
    }

    for(let i=0;i<textPoints.length;i++){
        let x=floor(textPoints[i].x/scl)
        let y=floor(textPoints[i].y/scl)
        let pointLine=p5.Vector.fromAngle(textPoints[i].alpha*2*PI/360)
        pointLine.mult(1)
        if(pointLine.heading()>0){
            // pointLine.mult(-1)
        }
        pointLine.mult(flag)
        flowPath[x+y*cols].add(pointLine)
    }

    stroke(noise(zOff)*360,360,360,2)

    for(let i=0;i<particals.length;i++){
        particals[i].update()
    }

    zOff+=0.005;

    for(let i=particals.length-1;i>0;i--){
        let tempX=particals[i].pos.x,
        tempY=particals[i].pos.y
        if(tempX>width || tempX<0 || tempY<0 || tempY>height){
            particals.splice(i,1)
        }
        if(particals.length<2400){
            addParticals()
            flag*=-1
        }
    }
}

function addParticals(){
    for(let i=0;i<200;i++){
        particals.push(new Partical(0+scl,random(height-scl)))
        particals.push(new Partical(width-scl,random(height-scl)))
        particals.push(new Partical(random(width-scl),0+scl))
        particals.push(new Partical(random(width-scl),height-scl))
        particals.push(new Partical(random(width),random(height)))
        particals.push(new Partical(random(width),random(height)))
    }
    for(let j=0;j<1;j++){
        for(let i=0;i<textPoints.length;i++){
            particals.push(new Partical(textPoints[i].x+random(-scl-10,scl-10),textPoints[i].y+random(-scl-10,scl+10)))
        }
    }
}

function getPoints(){
    textFont(font)
    tSize=1000
    while(1){
        let tmp=font.textBounds (sData,0,0,tSize)
        if(tmp.w>width-40 || tmp.h>height/5.5){
            tSize-=5
        }
        else{
            break
        }
    }
    wBox=font.textBounds (sData,0,0,tSize)
    wxdt=(width/2-wBox.x)-wBox.w/2
    wydt=height/2-90
    tpoints=font.textToPoints (sData,0,0,tSize,{
    sampleFactor:0.07
    })
    tSize=1000
    while(1){
        let tmp=font.textBounds (wData,0,0,tSize)
        if(tmp.w>width-40 || tmp.h>height/2.5){
            tSize-=5
        }
        else{
            break
        }
    }
    nBox=font.textBounds (wData,0,0,tSize)
    nxdt=(width/2-nBox.x)-nBox.w/2
    nydt=wydt+nBox.h+50
    t1points=font.textToPoints (wData,0,0,tSize,{
        sampleFactor:0.05})
    points=[...tpoints.map(point=> ({x:point.x+wxdt,y: point.y+wydt,z:0})),
    ...t1points.map(point=>({x:point.x+nxdt,y:point.y+nydt,z:1}))]
}

function setupNoise(){
    textFont(font1)
    textBox=getTextBound("def")
    textSize(textBox.s)
    textP=font1.textToPoints(textBox.t,0,height,textBox.s,{sampleFactor:0.2})
    dx=width/2-(textBox.x+textBox.w/2)
    dy=height/2-(textBox.y+textBox.h/2)
    for(let i=0;i<textP.length;i++){
        let x=textP[i]
        x.x=x.x+dx;
        x.y=x.y+dy;
        textPoints[i]=x
    }
    rows=floor(windowHeight/scl)
    cols=floor(windowWidth/scl)
    addParticals()
}

function drawPoints(){
    for (let i=0;i<dots.length;i++){
        dots[i].disp(alphaB)
    }
}


function drawBubbles(){
    for(let i=0;i<bubbles.length;i++){
        bubbles[i].update()
    }

    for(let i=0;i<flowers.length;i++){
        flowers[i].show()
    }

    deleteBubbles()

}

function deleteBubbles(){
    for(let i=bubbles.length-1;i>=0;i--){
        if(bubbles[i].pos.x<-bubbles[i].radius || bubbles[i].pos.x>width+bubbles[i].radius|| bubbles[i].pos.y<-bubbles[i].radius || bubbles[i].pos.y>height+bubbles[i].radius)
        {
            bubbles.splice(i,1)
        }
    }
}


function mouseClicked(){
    for(let i=flowers.length-1;i>=0;i--){
        if(flowers[i].inBound(mouseX,mouseY)){
            let temp=flowers.splice(i,1)[0]
            for(let i=0;i<temp.points.length;i++){
                    dots.push(new Dot(temp.x, temp.y, temp.points[i].x,temp.points[i].y,temp.points[i].z==0?54:random(0,360)))
            }
        }
    }
}


function getTextBound(text="hello"){
    let tSize=1000
    while(true){
        let textBox=font1.textBounds(text,0,height,tSize)
        if(textBox.w+textBox.x>width-50 || textBox.h>(height-50)){
            tSize-=5
            if(tSize>1000 || tSize<0){
                // print({"s":tSize,"t":text,...textBox})
                // print(textBox)
                break
            }
        }
        else{
            return {"s":tSize,"t":text,...textBox}
        }
    }
}