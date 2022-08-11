import { Engine } from "./Engine.js";



const e = new Engine({
    canvas: 'canvas',
    width: 500,
    height: 400
})

e.setGravity(1, 90)
e.boundingBox(0, 0, 500, 400)

const circle = e.createObject({
    type: 'circle', 
    x: 100, 
    y: 100, 
    radius: 20
})

circle.setVelocity({
    length: 50,
    direction: 30
})

const c2 = e.createObject({
    type: 'circle',
    x: 300,
    y: 300,
    radius: 30
})

c2.setVelocity({
    length: 1,
    direction: 190
})

e.startAnimation()