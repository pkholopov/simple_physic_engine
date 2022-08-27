export class Vector {
  constructor(data, c) {
    // data --> object {x:x координата вектора, y:y координата вектора, value: длина (значение), direction: направление}
    this.x = data.x ?? data.value * Math.cos((data.direction * Math.PI) / 180);
    this.y = data.y ?? data.value * Math.sin((data.direction * Math.PI) / 180);
    this.value = data.value ?? Math.hypot(data.x, data.y);
    this.direction = data.direction ?? this.getDirection();

    //temporal variable. Контекст для рисования векторов. См метод draw()
    this.c = c;
  }

  updateCoordinates() {
    this.x = this.value * Math.cos((this.direction * Math.PI) / 180);
    this.y = this.value * Math.sin((this.direction * Math.PI) / 180);
  }

  updateValue() {
    this.value = Math.hypot(this.x, this.y);
  }

  // получаем направление вектора
  getDirection() {
    this.updateValue();
    if (this.value === 0) return 0;
    const angle = (Math.acos(this.x / this.value) * 180) / Math.PI;
    if (this.y < 0) return 360 - angle;
    return angle;
  }

  // векторное сложение  (здесь и далее: аргумент returnNew указывает на то, стоит ли вернуть новый объект класса Vector, или изменить существующий)
  add(vector, returnNew = false) {
    if (returnNew) {
      return new Vector({
        x: this.x + vector.x,
        y: this.y + vector.y,
      });
    } else {
      this.x += vector.x;
      this.y += vector.y;
    }
  }

  // векторное вычитание
  substract(vector, returnNew = false) {
    if (returnNew) {
      return new Vector({
        x: this.x - vector.x,
        y: this.y - vector.y,
      });
    } else {
      this.x -= vector.x;
      this.y -= vector.y;
    }
  }

  // скалярное произведение векторов. Важно!!!! Результат выполненмя - число (Number)
  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  // умножение вектора на число (которое, по сути, просто увеличивает его длину)
  scale(number, returnNew = false) {
    if (returnNew) {
      return new Vector({
        x: this.x * number,
        y: this.y * number,
      });
    } else {
      this.x *= number;
      this.y *= number;
    }
  }

  // scaleToNew(number) {
  //   return new Vector({ x: this.x * number, y: this.y * number }, this.c);
  // }

  // нормализация. Содаём единичный вектор с тем же направлением, что и исходный
  normalize(returnNew = false) {
    this.updateValue();
    if (returnNew) {
      return new Vector({
        x: (this.x /= this.value),
        y: (this.y /= this.value),
      });
    } else {
      this.x /= this.value;
      this.y /= this.value;
    }
  }

  // отражение вектора от прямой. Для расчёта необходимо передать вектор-нормаль к прямой
  reflect(normal) {
    if (normal.value !== 1) normal.normalize();
    normal.scale(2 * this.dotProduct(normal));
    this.substract(normal);
  }

  // клонирование вектора
  clone() {
    return new Vector({
      x: this.x,
      y: this.y,
    });
  }

  // temporal method
  draw(x = 0, y = 0) {
    this.c.beginPath();
    this.c.moveTo(x, y);
    this.c.lineTo(x + this.x, y + this.y);
    this.c.stroke();
    this.c.closePath();
  }
}
