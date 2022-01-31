class Boat{
    constructor(x,y,w,h,boatpos,boat_animation){
        this.animation = boat_animation;
        this.body = Bodies.rectangle(x,y,w,h);
        this.width = w ;
        this.height = h;
        this.image = loadImage("assets/boat.png");
        this.boatposition = boatpos;
        World.add(world,this.body);
        this.speed += 0.05
    }

    animate(){

        this.speed += 0.05;

    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        var index = floor(this.speed % this.animation.length);
        push()
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index], 0, this.boatposition, this.width, this.height);
        pop()
    }
    remove(index){
        setTimeout(()=>{
            World.remove(world, boats[index].body)
            delete boats[index]
        }, 2000)
    }

}