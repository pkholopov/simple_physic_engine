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
        this.gravity = 0
        this.lastUpdateTime = 0

        this.setCanvas()
    }

    setCanvas(){
        this.cnv.height = this.h
        this.cnv.width = this.w
    }

    setGravity(value, direction) {
        this.gravity = new Vector({
            length: value,
            direction: direction
        })
    }

    boundingBox(x1, y1, x2, y2) {
        this.boundingBox = new BoundingBox(x1, y1, x2, y2)
    }

    createObject(props) {
        if (props.type === 'circle') {
            let circle = new Circle(props.x, props.y, props.radius, this.canvasElement)
            this.objects.push(circle)
            return circle
        }
        
        // if...
        // and other types of objects

        console.error(`Can't create object with type ${props.type}`);
        
    }

    startAnimation() {
        requestAnimationFrame(this.tick.bind(this))
    }

    tick(timestamp) {
        let delta = timestamp - this.lastUpdateTime
        this.lastUpdateTime = timestamp

        let fps = Math.round(1000 / delta)

        this.update(fps)

        this.render()

        requestAnimationFrame(this.tick.bind(this))
    }

    update(fps) {
        for (const object of this.objects) {
            if (this.gravity) {
                object.velocity.addVector(this.gravity)
            }
            object.x += object.velocity.x / fps
            object.y += object.velocity.y / fps
        }
    }

    render() {
        this.c.clearRect(0, 0, this.w, this.h)
        for (const object of this.objects) {
            object.draw()
        }
    }
}