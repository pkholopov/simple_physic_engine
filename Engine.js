import { BoundingBox } from "./modules/BoundingBox.js"
import { Circle } from "./modules/Circle.js"
import { Vector } from "./modules/Vector.js"


export class Engine {
    constructor(props) {
        this.canvasElement = props.canvas
        this.cnv = document.querySelector(this.canvasElement)
        this.c = this.cnv.getContext('2d')
        this.h = props.height
        this.w = props.width
        this.objects = []

        this.boundingBox = 0
        this.gravity = 0
        this.lastUpdateTime = 0

        this.isRun = false
        this.showInfo = false

        this.setCanvas()
    }

    setCanvas(){
        this.cnv.height = this.h
        this.cnv.width = this.w
    }

    setGravity(value, direction) {
        this.gravity = new Vector({
            value: value,
            direction: direction
        })
    }

    setBoundingBox(x1, y1, x2, y2) {
        this.boundingBox = new BoundingBox(x1, y1, x2, y2)
    }

    createObject(props) {
        if (props.type === 'circle') {
            let circle = new Circle(props.x, props.y, props.radius, props.mass, this.canvasElement)
            this.objects.push(circle)
            return circle
        }
        
        // if...
        // and other types of objects

        console.error(`Can't create object with type ${props.type}`);
        
    }

    // TODO: переписать через forEach
    detectCollision() {
        let obj1, obj2

        for (const object of this.objects) {
            object.isColliding = false            
        }

        for (let i = 0; i < this.objects.length; i++) {
            obj1 = this.objects[i]
            for (let j = i + 1; j < this.objects.length; j++) {
                obj2 = this.objects[j]

                if(this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true
                    obj2.isColliding = true
                    let nCollisionVector = new Vector({
                        x: obj2.x - obj1.x,
                        y: obj2.y - obj1.y
                    })
                    nCollisionVector.normalize()
                    let relVelocity = new Vector({
                        x: obj1.velocity.x - obj2.velocity.x,
                        y: obj1.velocity.y - obj2.velocity.y
                    })
                    let speed = relVelocity.dotProduct(nCollisionVector)
                    if (speed < 0) break
                    let impulse = 2 * speed / (obj1.mass + obj2.mass)
                    nCollisionVector.scale(impulse)
                    

                    obj1.velocity.substract(nCollisionVector.scaleToNew(obj2.mass))
                    obj2.velocity.add(nCollisionVector.scaleToNew(obj1.mass))
                }
            }
        }
    }

    circleIntersect(x1, y1, r1, x2, y2, r2) {
        return (x2 - x1) ** 2 + (y2 - y1) ** 2 <= (r1 + r2) ** 2
    }

    run() {
        this.rAF = requestAnimationFrame(this.tick.bind(this))
        this.isRun = true
    }

    stop() {
        cancelAnimationFrame(this.rAF)
        this.isRun = false
    }

    tick(timestamp) {
        let delta = timestamp - this.lastUpdateTime
        delta = delta > 500 ? delta = 15 : delta     // исправить!!! костыль
        this.lastUpdateTime = timestamp

        let fps = Math.round(1000 / delta)

        this.update(fps)

        this.render()

        this.rAF = requestAnimationFrame(this.tick.bind(this))
    }

    update(fps) {
        for (const object of this.objects) {
            
            if (this.gravity) {
                object.velocity.add(this.gravity)
            }
            object.x += object.velocity.x / fps
            object.y += object.velocity.y / fps

            if (this.boundingBox) {
                if (this.boundingBox.isCollide(object, object.radius)) this.boundingBox.collide(object, object.radius) 
            }
        }
        this.detectCollision()
    }

    render() {
        this.c.clearRect(0, 0, this.w, this.h)
        for (const object of this.objects) {
            object.draw()
            if(this.showInfo) {
                object.drawVelocity()
                object.drawMass()
            }
        }
    }

    // TODO: deleteObject() {}
    //        свойство 'static' у объектов. Объекты с этим свойством не учавствуют в расчёте перемещения
}