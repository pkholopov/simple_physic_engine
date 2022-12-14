import { Vector } from "./Vector.js";

export class Circle {
  constructor(x, y, radius, mass, canvas) {
    this.type = "circle";
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = mass ?? radius / 5;
    this.c = document.querySelector(canvas).getContext("2d");
    this.velocity = new Vector({ x: 0, y: 0 }, this.c);
  }

  setVelocity(data) {
    this.velocity.value = data.value;
    this.velocity.direction = data.direction;
    this.velocity.updateCoordinates();
  }

  draw() {
    this.c.beginPath();
    // this.c.lineWidth = 2
    this.c.strokeStyle = "black";
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.c.stroke();
    this.c.closePath();
  }

  drawVelocity() {
    this.c.beginPath();
    this.c.moveTo(this.x, this.y);
    this.c.lineTo(this.x + this.velocity.x, this.y + this.velocity.y);
    this.c.stroke();
    this.c.closePath();
  }

  drawMass() {
    this.c.font = "20px serif";
    this.c.fillStyle = "blue";
    this.c.textAlign = "center";
    this.c.fillText(this.mass, this.x, this.y);
  }
}
