import { Vector } from "./Vector.js"

export class BoundingBox {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.h = y2 - y1
        this.w = x2 - x1
    }

    isCollide(obj, size) {
        if (obj.x - size < this.x1 ||
            obj.x + size > this.x2 ||
            obj.y - size < this.y1 ||
            obj.y + size > this.y2) return true
        return false
    }

    // функция, в которой я захардкодил нормали. Естественно, следует переделать
    collide(obj, size) {
        let n
        if (obj.x - size < this.x1) {
            obj.x = this.x1 + size
            n = new Vector({x: 1, y: 0})
        }
        if (obj.x + size > this.x2) {
            obj.x = this.x2 - size
            n = new Vector({x: -1, y: 0})
        }
        if (obj.y - size < this.y1) {
            obj.y = this.y1 + size
            n = new Vector({x: 0, y: 1})
        }
        if (obj.y + size > this.y2) {
            obj.y = this.y2 - size
            n = new Vector({x: 0, y: -1})
        }
        // n.scale(2 * obj.velocity.dotProduct(n))
        // obj.velocity.substract(n)

        obj.velocity.reflect(n)
    }

}
