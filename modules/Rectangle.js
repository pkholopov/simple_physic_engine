import { Vector } from "./Vector.js";

export class Rectangle {
  constructor(x, y, w, h, mass, canvas) {
    this.type = "rectangle";
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.mass = mass ?? h / 5;
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
    this.c.moveTo(this.x, this.y);
    this.c.strokeRect(this.x, this.y, this.width, this.height);
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
