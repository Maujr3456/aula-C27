class Cannonball{
    constructor(x, y){
        var options = {
            isStatic:true
        }
        this.image = loadImage('assets/cannonball.png')
        this.r = 30
        this.body = Bodies.circle(x, y, this.r, options)
        World.add(world, this.body)
    }
    display(){
        var pos = this.body.position
        push()
        imageMode(CENTER)
        image(this.image, pos.x, pos.y, this.r, this.r)
        pop()

    }
    shoot(){
        var newangle = cannon.angle -28
        newangle = newangle * (3.14/180)
        var velocity = p5.Vector.fromAngle(newangle)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body, false)
        Matter.Body.setVelocity(this.body, {
            x:velocity.x*(180/3.14), 
            y:velocity.y*(180/3.14)})

    }

    remove(index){
        Matter.Body.setVelocity(this.body, {x:0, y:0})
        setTimeout(()=>{
            World.remove(world, this.body)
            delete balls[index]
        }, 1000)
    }
}
