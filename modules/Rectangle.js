import { Vector } from './Vector.js'

export class Rectangle {
  constructor({x,y,width,height,canvas, staticObject, direction, speed}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.c = document.querySelector(canvas).getContext('2d')
    this.A = [10,10] // нужно получить начальное значение опираяся на X Y и DIRECTION
    this.B = [50,10]
    this.C = [50,50]
    this.D = [10,50]
    this.staticObject = staticObject ?? false
    this.direction = direction ?? 0
    this.speed = speed ?? 0
  }

  setVelocity(data) {
    this.velocity = new Vector(data, this.c)
  }

  updatePosition(){
    // обновлять значения А B C D
  }

  draw() {
    if(this.speed) updatePosition()
    this.c.beginPath()
    this.c.moveTo(...this.A)
    this.c.lineTo(...this.B)
    this.c.stroke()

    this.c.beginPath()
    this.c.moveTo(...this.B)
    this.c.lineTo(...this.C)
    this.c.stroke()

    this.c.beginPath()
    this.c.moveTo(...this.C)
    this.c.lineTo(...this.D)
    this.c.stroke()

    this.c.beginPath()
    this.c.moveTo(...this.D)
    this.c.lineTo(...this.A)
    this.c.stroke()
  }

  // drawVelocity() {
    
  // }
}
