import { Circle } from './modules/Circle.js'
import { Vector } from './modules/Vector.js'

function degToRad(angle) {
    return (angle * Math.PI) / 180
}

const infoBox = document.querySelector('.infobox')

const cnv = document.querySelector('canvas')
const c = cnv.getContext('2d')
c.strokeStyle = 'red'

let h = cnv.height = 400
let w = cnv.width = 400



let circles = generateCircles(25)

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function generateCircles(n) {
    let circles = []
    for (let i = 0; i < n; i++) {
        const circle = new Circle(getRandom(60, 340),
            getRandom(60, 340),
            getRandom(10, 25),
            'canvas')
        circle.setVelocity({
            length: getRandom(30, 150),
            direction: getRandom(10, 360)
        })
        circles.push(circle)
    }
    return circles
}

let gravity = new Vector({
    length: 10,
    direction: 90
})




let lastUpdateTime = 0
function tick(timestamp) {

    let delta = timestamp - lastUpdateTime
    lastUpdateTime = timestamp

    let fps = Math.round(1000 / delta)

    infoBox.innerHTML = `FPS: ${fps}<br>
                         Animation time: ${(timestamp / 1000).toFixed(2)}<br>
                         Velocity: ${(circles[0].velocity.length).toFixed(2)} pixels per second<br>
                         Direction angle: ${(circles[0].velocity.direction).toFixed(2)} degrees<br>
                         VelX: ${(circles[0].velocity.x).toFixed(2)}<br>
                         VelY: ${(circles[0].velocity.y).toFixed(2)}`

    update(fps)

    render()

    requestAnimationFrame(tick)
}

document.addEventListener("DOMContentLoaded", requestAnimationFrame(tick))


function update(fps) {


    for (const circle of circles) {


        circle.velocity = circle.velocity.sumVectors(gravity)

        if (circle.x > w - (circle.radius) || circle.x < circle.radius) {
            circle.velocity.length < 0 ? circle.velocity.length = 0 : circle.velocity.length -= circle.velocity.length / 5
            circle.velocity.direction = 180 - circle.velocity.direction
            circle.velocity.updateCoordinates()
        }

        if (circle.y > h - (circle.radius) || circle.y < circle.radius) {
            circle.velocity.length < 0 ? circle.velocity.length = 0 : circle.velocity.length -= circle.velocity.length / 5
            circle.velocity.direction = 360 - circle.velocity.direction
            circle.velocity.updateCoordinates()
        }

        circle.x += circle.velocity.x / fps
        circle.y += circle.velocity.y / fps
    }
}

function render() {
    c.clearRect(0, 0, w, h)
    for (const circle of circles) {
        circle.draw()
        // circle.drawVelocity()
    }
}



// let v1 = new Vector({
//     length: 50,
//     direction: 360
// }, c)

// let v2 = new Vector({
//     length: 100,
//     direction: 270
// }, c)

// let v3 = v1.sumVectors(v2, c)

// v3.direction = 360 - v3.direction
// v3.updateCoordinates()



// c.fillStyle = 'blue'
// c.beginPath()
// c.arc(200, 200, 3, 0, Math.PI * 2)
// c.fill()
// c.closePath()

// c.strokeStyle = 'red'
// v1.drawVector(200, 200)
// v2.drawVector(200, 200)
// c.strokeStyle = 'green'
// v3.drawVector(200, 200)

// console.log(`X: ${v3.x}, Y: ${v3.y}, length: ${v3.length}, direction: ${v3.direction}`);