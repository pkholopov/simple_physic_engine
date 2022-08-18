import { Engine } from "./Engine.js";


const e = new Engine({
    canvas: 'canvas',
    width: 800,
    height: 600
})

e.setGravity(15, 90)
e.setBoundingBox(0, 0, 800, 600)

const circle = e.createObject({
    type: 'circle', 
    x: 150, 
    y: 150, 
    radius: 20
})

circle.setVelocity({
    value: 100,
    direction: 30
})

const c2 = e.createObject({
    type: 'circle',
    x: 300,
    y: 300,
    radius: 30
})

c2.setVelocity({
    value: 50,
    direction: 220
})

const c3 = e.createObject({
    type: 'circle',
    x: 100,
    y: 100,
    radius: 30
})

c3.setVelocity({
    value: 50,
    direction: 330
})

e.render()


// buttons just for fun. Test 

const gravSwitch = document.querySelector('#gravity')

let isGravity = Boolean(e.gravity)
gravSwitch.addEventListener('click', () => {
    if (isGravity) {
        e.gravity.value = 0
        e.gravity.updateCoordinates()
        isGravity = false
    } else {
        e.gravity.value = 15
        e.gravity.updateCoordinates()
        isGravity = true
    }
})

const left = document.querySelector('#left')
const right = document.querySelector('#right')

left.addEventListener('click', () => {
    e.gravity.direction += 30
    e.gravity.updateCoordinates()
})

right.addEventListener('click', () => {
    e.gravity.direction -= 30
    e.gravity.updateCoordinates()
})

const runBtn = document.querySelector('#start')

runBtn.addEventListener('click', () => e.isRun ? e.stop() : e.run())

const cnv = document.querySelector('canvas')
cnv.addEventListener('click', (event) => {
    e.createObject({
        type: 'circle',
        x: event.offsetX,
        y: event.offsetY,
        radius: 20
    }).setVelocity({
        value: 0,
        direction: 0
    })
    e.render()
})