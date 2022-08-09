export class Vector {
    constructor(data, c) {
        this.x = data.x || data.length * Math.cos((data.direction * Math.PI) / 180)
        this.y = data.y || data.length * Math.sin((data.direction * Math.PI) / 180)
        this.length = data.length || Math.sqrt(data.x ** 2 + data.y ** 2)
        this.direction = data.direction || this.getRightDirection()
    
        //temporal variable
        this.c = c
    }

    updateCoordinates() {
        this.x = this.length * Math.cos((this.direction * Math.PI) / 180)
        this.y = this.length * Math.sin((this.direction * Math.PI) / 180)
    }

    getlength() {
        this.length = Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    getRightDirection() {
        if (this.x > 0 && this.y > 0) return this.direction = (Math.atan(this.y / this.x) * 180) / Math.PI
        if (this.x < 0 && this.y > 0) return this.direction = 180 + (Math.atan(this.y / this.x) * 180) / Math.PI
        if (this.x < 0 && this.y < 0) return this.direction = 180 + (Math.atan(this.y / this.x) * 180) / Math.PI
        if (this.x > 0 && this.y < 0) return this.direction = 360 + (Math.atan(this.y / this.x) * 180) / Math.PI
    }

    getDirection() {
        this.direction = (Math.acos(this.x / this.length) * 180) / Math.PI
    }

    sumVectors(vector) {
        return new Vector({
            x: this.x + vector.x,
            y: this.y + vector.y
        }, this.c)
    }

    // temporal method
    drawVector(x, y) {
        this.c.beginPath()
        this.c.moveTo(x, y)
        this.c.lineTo(x + this.x, y + this.y)
        this.c.stroke()
        this.c.closePath()
    }
}