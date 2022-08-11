import { Vector } from "./Vector.js"

export class Circle {
    constructor(x, y, radius, canvas) {
        this.x = x
        this.y = y
        this.radius = radius
        this.c = document.querySelector(canvas).getContext('2d')
    }

    setVelocity(data) {
        this.velocity = new Vector(data, this.c)
    }
    
    draw() {
        this.c.beginPath()
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