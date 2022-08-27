import { Vector } from "./Vector.js";

export function Collision(o1, o2) {
  if (o1.type === "circle" && o2.type === "circle") {
    if (checkCircles(o1, o2)) {
      circlesCollision(o1, o2);
    }
  }

  if (o1.type === "rectangle" && o2.type === "rectangle") {
    checkRectangles(o1, o2);
  }

  if (o1.type === "circle" && o2.type === "rectangle") {
    if (checkCirclesVsRectangle(o1, o2)) {
      circleRectCollision(o1, o2);
    }
  }

  if (o1.type === "rectangle" && o2.type === "circle") {
    if (checkCirclesVsRectangle(o1, o2)) {
      circleRectCollision(o1, o2);
    }
  }
}

function checkCircles(o1, o2) {
  return (
    (o2.x - o1.x) ** 2 + (o2.y - o1.y) ** 2 <= (o1.radius + o2.radius) ** 2
  );
}

function checkCirclesVsRectangle(o1, o2) {
  let rect, circle, testX, testY;
  if (o1.type === "rectangle") {
    rect = o1;
    circle = o2;
  } else {
    rect = o2;
    circle = o1;
  }
  if (circle.x < rect.x) testX = rect.x;
  if (circle.x > rect.x + rect.width) testX = rect.x + rect.width;
  if (circle.y < rect.y) testY = rect.y;
  if (circle.y > rect.y + rect.height) testY = rect.y + rect.height;

  let distX = circle.x - testX;
  let distY = circle.y - testY;

  if (distX ** 2 + distY ** 2 <= circle.radius ** 2) return true;

  return false;
}

function checkRectangles(o1, o2) {}

function circlesCollision(o1, o2) {
  let nCollisionVector = new Vector({
    x: o2.x - o1.x,
    y: o2.y - o1.y,
  });
  nCollisionVector.normalize();
  let relVelocity = new Vector({
    x: o1.velocity.x - o2.velocity.x,
    y: o1.velocity.y - o2.velocity.y,
  });
  let speed = relVelocity.dotProduct(nCollisionVector);
  if (speed < 0) return;
  let impulse = (2 * speed) / (o1.mass + o2.mass);

  o1.velocity.substract(nCollisionVector.scale(o2.mass * impulse, "new"));
  o2.velocity.add(nCollisionVector.scale(o1.mass * impulse, "new"));
}

function circleRectCollision(o1, o2) {
  // просто копия решения коллизии для кругов. Нужно переписать. Оно ж не работает!
  let nCollisionVector = new Vector({
    x: o2.x - o1.x,
    y: o2.y - o1.y,
  });
  nCollisionVector.normalize();
  let relVelocity = new Vector({
    x: o1.velocity.x - o2.velocity.x,
    y: o1.velocity.y - o2.velocity.y,
  });
  let speed = relVelocity.dotProduct(nCollisionVector);
  if (speed < 0) return;
  let impulse = (2 * speed) / (o1.mass + o2.mass);

  o1.velocity.substract(nCollisionVector.scale(o2.mass * impulse, "new"));
  o2.velocity.add(nCollisionVector.scale(o1.mass * impulse, "new"));
}
