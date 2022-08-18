import { Vector } from "./Vector.js"

export class Circle {
    constructor(x, y, radius, mass = 1, canvas) {
        this.x = x
        this.y = y
        this.radius = radius
        this.mass = mass
        this.c = document.querySelector(canvas).getContext('2d')

        this.isColliding = false
    }

    setVelocity(data) {
        this.velocity = new Vector(data, this.c)
    }
    
    draw() {
        this.c.beginPath()
        this.c.lineWidth = 2
        this.c.strokeStyle = this.isColliding ? 'red' : 'lightblue'
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.c.stroke()
        this.c.closePath()
    }

    drawVelocity() {
        this.c.beginPath()
        this.c.moveTo(this.x, this.y)
        this.c.lineTo(this.x + this.velocity.x, this.y + this.velocity.y)
        this.c.stroke()
        this.c.closePath()
    }
}