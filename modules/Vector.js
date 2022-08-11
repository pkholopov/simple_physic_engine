export class Vector {
    constructor(data, c) {
        this.x = data.x || data.length * Math.cos((data.direction * Math.PI) / 180)
        this.y = data.y || data.length * Math.sin((data.direction * Math.PI) / 180)
        this.length = data.length || Math.hypot(data.x, data.y)
        this.direction = data.direction || this.getDirection()
    
        //temporal variable
        this.c = c
    }

    updateCoordinates() {
        this.x = this.length * Math.cos((this.direction * Math.PI) / 180)
        this.y = this.length * Math.sin((this.direction * Math.PI) / 180)
    }

    getlength() {
        this.length = Math.hypot(this.x, this.y)
    }

    getDirection() {
        if (this.x > 0 && this.y > 0) return this.direction = (Math.atan(this.y / this.x) * 180) / Math.PI
        if (this.x < 0 && this.y > 0) return this.direction = 180 + (Math.atan(this.y / this.x) * 180) / Math.PI
        if (this.x < 0 && this.y < 0) return this.direction = 180 + (Math.atan(this.y / this.x) * 180) / Math.PI
        if (this.x > 0 && this.y < 0) return this.direction = 360 + (Math.atan(this.y / this.x) * 180) / Math.PI
    }

    add(vector) {
        return new Vector({
            x: this.x + vector.x,
            y: this.y + vector.y
        }, this.c)
    }

    addVector(vector) {
        this.x += vector.x
        this.y += vector.y
        this.getDirection()
        this.getlength()
    }

    // temporal method
    draw(x = 0, y = 0) {
        this.c.beginPath()
        this.c.moveTo(x, y)
        this.c.lineTo(x + this.x, y + this.y)
        this.c.stroke()
        this.c.closePath()
    }
}