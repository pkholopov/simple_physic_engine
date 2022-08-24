export class detectCollision {
    constructor(object_1, object_2) {
        this.o1 = object_1;
        this.o2 = object_2;

        if (this.o1.type === 'circle' && this.o2.type === 'circle') {
            if (this.checkCircles(this.o1, this.o2)) {
                this.circlesCollision(this.o1, this.o2);
            }
        }
        if (this.o1.type === 'rectangle' && this.o2.type === 'rectangle') {
            this.checkRectangles(this.o1, this.o2);
        }
        if (this.o1.type === 'circle' && this.o2.type === 'rectangle') {
            this.checkCirclesToRectangle(this.o1, this.o2);
        }
        if (this.o1.type === 'rectangle' && this.o2.type === 'circle') {
            this.checkRectanglesToCircle(this.o1, this.o2);
        }

    }
    checkCircles(o1, o2) {
        return (o2.x - o1.x) ** 2 + (o2.y - o1.y) ** 2 <= (o1.radius + o2.radius) ** 2;
    }

    checkRectangles(o1, o2) {
    }

    checkCirclesToRectangle(o1, o2) {
    }

    checkRectanglesToCircle(o1, o2) {
    }

    circlesCollision(o1, o2) {
        let nCollisionVector = new Vector({
            x: o2.x - o1.x,
            y: o2.y - o1.y
        });
        nCollisionVector.normalize();
        let relVelocity = new Vector({
            x: o1.velocity.x - o2.velocity.x,
            y: o1.velocity.y - o2.velocity.y
        });
        let speed = relVelocity.dotProduct(nCollisionVector);
        if (speed < 0)
            return;
        let impulse = 2 * speed / (o1.mass + o2.mass);

        o1.velocity.substract(nCollisionVector.scaleToNew(o2.mass * impulse));
        o2.velocity.add(nCollisionVector.scaleToNew(o1.mass * impulse));
    }
}
