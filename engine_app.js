import { Engine } from "./Engine.js";

const e = new Engine({
  canvas: "canvas",
  width: 600,
  height: 500,
});

e.setGravity(8, 90);
e.setBoundingBox(0, 0, 600, 500);

const circle = e.createObject({
  type: "circle",
  x: 450,
  y: 150,
  radius: 10,
});

circle.setVelocity({
  value: 100,
  direction: 130,
});

const c2 = e.createObject({
  type: "circle",
  x: 400,
  y: 400,
  radius: 30,
});

c2.setVelocity({
  value: 50,
  direction: 220,
});

const c3 = e.createObject({
  type: "circle",
  x: 100,
  y: 100,
  radius: 60,
});

c3.setVelocity({
  value: 50,
  direction: 30,
});

const r1 = e.createObject({
  type: "rectangle",
  x: 300,
  y: 300,
  w: 50,
  h: 50,
});

// const c1 = e.createObject({
//     type: 'circle',
//     x: 180,
//     y: 100,
//     radius: 20,
//     mass: 1
// }).setVelocity({
//     value: 200,
//     direction: 0
// })

// const c2 = e.createObject({
//     type: 'circle',
//     x: 242,
//     y: 100,
//     radius: 20
// }).setVelocity({
//     value: 0,
//     direction: 0
// })

// const c3 = e.createObject({
//     type: 'circle',
//     x: 284,
//     y: 100,
//     radius: 20
// }).setVelocity({
//     value: 0,
//     direction: 0
// })

// const c4 = e.createObject({
//     type: 'circle',
//     x: 326,
//     y: 100,
//     radius: 20,
//     mass: 1
// }).setVelocity({
//     value: 0,
//     direction: 0
// })

// const c5 = e.createObject({
//     type: 'circle',
//     x: 368,
//     y: 100,
//     radius: 20
// }).setVelocity({
//     value: 0,
//     direction: 0
// })

// const c6 = e.createObject({
//     type: 'circle',
//     x: 410,
//     y: 100,
//     radius: 20,
//     mass: 1
// }).setVelocity({
//     value: 0,
//     direction: 0
// })

e.render();
// e.showInfo = true

// buttons just for fun. Test

const gravSwitch = document.querySelector("#gravity");

let isGravity = Boolean(e.gravity);
gravSwitch.addEventListener("click", () => {
  if (isGravity) {
    e.gravity.value = 0;
    e.gravity.updateCoordinates();
    isGravity = false;
  } else {
    e.gravity.value = 8;
    e.gravity.updateCoordinates();
    isGravity = true;
  }
  showGravityInfo();
});

const left = document.querySelector("#left");
const right = document.querySelector("#right");

left.addEventListener("click", () => {
  e.gravity.direction += 30;
  e.gravity.updateCoordinates();
  showGravityInfo();
});

right.addEventListener("click", () => {
  e.gravity.direction -= 30;
  e.gravity.updateCoordinates();
  showGravityInfo();
});

const runBtn = document.querySelector("#start");

runBtn.addEventListener("click", () => {
  if (e.isRun) {
    e.stop();
    document.querySelector("#engine_status").innerHTML = "Engine stop";
  } else {
    e.run();
    document.querySelector("#engine_status").innerHTML = "Engine run";
  }
});

function showGravityInfo() {
  document.querySelector("#gravity_info").innerHTML = `<p>Gravity ${
    e.gravity.value ? "on" : "off"
  }.</p>
                                                         <p>Gravity value: ${
                                                           e.gravity.value
                                                         }</p>
                                                         <p>Gravity direction: ${
                                                           e.gravity.direction
                                                         }&deg</p>`;
}

const cnv = document.querySelector("canvas");
cnv.addEventListener("click", (event) => {
  e.createObject({
    type: "circle",
    x: event.offsetX,
    y: event.offsetY,
    radius: 50,
  });
  e.render();
});
