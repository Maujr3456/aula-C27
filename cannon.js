class Cannon {
    constructor(x, y, width,height,angle){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.angle = angle
        this.cannonimg = loadImage("assets/canon.png")
        this.cannonbase = loadImage("assets/cannonBase.png") 
    }

    display(){
        //topo
        if (keyIsDown(RIGHT_ARROW)&& this.angle <70){
            this.angle +=1;
        }
        if (keyIsDown(LEFT_ARROW)&& this.angle >-30){
            this.angle -=1;
        }

        push();
        translate(this.x, this.y);
        rotate(this.angle)
        imageMode(CENTER);
        image(this.cannonimg, 0, 0, this.width, this.height);

        pop();
        //base


        image(this.cannonbase,70,20,200,200);
        noFill();
    }

}