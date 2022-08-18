export class Vector {
    constructor(data, c) {                                                             // data --> object {x:x координата вектора, y:y координата вектора, value: длина (значение), direction: направление}
        this.x = data.x ?? data.value * Math.cos((data.direction * Math.PI) / 180)
        this.y = data.y ?? data.value * Math.sin((data.direction * Math.PI) / 180)
        this.value = data.value ?? Math.hypot(data.x, data.y)
        this.direction = data.direction ?? this.getDirection()
    
        //temporal variable. Контекст для рисования векторов. См метод draw()
        this.c = c
    }

    // !!! TODO: убрать присвоение в return некоторых методов

    updateCoordinates() {
        this.x = this.value * Math.cos((this.direction * Math.PI) / 180)
        this.y = this.value * Math.sin((this.direction * Math.PI) / 180)
    }

    getValue() {
        this.value = Math.hypot(this.x, this.y)
    }

    // устаревший метод. Отрабатывает с ошибкой при this.x === 0

    // getDirection() {
    //     if (this.x > 0 && this.y > 0) return this.direction = (Math.atan(this.y / this.x) * 180) / Math.PI
    //     if (this.x < 0 && this.y > 0) return this.direction = 180 + (Math.atan(this.y / this.x) * 180) / Math.PI
    //     if (this.x < 0 && this.y < 0) return this.direction = 180 + (Math.atan(this.y / this.x) * 180) / Math.PI
    //     if (this.x > 0 && this.y < 0) return this.direction = 360 + (Math.atan(this.y / this.x) * 180) / Math.PI
    // }

    // получаем направление вектора 
    getDirection() {
        if (this.value === 0) return this.direction = 0  
        if (this.y < 0) return this.direction = 180 + Math.cos(this.x / this.value) * 180 / Math.PI
        return this.direction = Math.cos(this.x / this.value) * 180 / Math.PI
    }

    // addVector(vector) {                  пока нет смысла в методе, который возвращает новый вектор
    //     return new Vector({              метод add ниже добавляет другой вектор к существующему и изменяет его
    //         x: this.x + vector.x,
    //         y: this.y + vector.y
    //     }, this.c)
    // }

    // векторное сложение
    add(vector) {
        this.x += vector.x
        this.y += vector.y
        this.getDirection()
        this.getValue()
    }

    // векторное вычитание
    substract(vector) {
        this.x -= vector.x
        this.y -= vector.y
        this.getDirection()
        this.getValue()
    }

    // скалярное произведение векторов. Важно!!!! Результат выполненмя - число (Number)
    dotProduct(vector) {
        return this.x * vector.x + this.y * vector.y
    }

    // умножение вектора на число (которое, по сути, просто увеличивает его длину)
    scale(number) {
        this.x *= number
        this.y *= number
        this.getDirection()
        this.getValue()
    }

    scaleToNew(number) {
        return new Vector({x: this.x * number, y: this.y * number})
    }

    // нормализация. Содаём единичный вектор с тем же направлением, что и исходный
    normalize() {
        this.x /= this.value
        this.y /= this.value
        this.getDirection()
        this.getValue()
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