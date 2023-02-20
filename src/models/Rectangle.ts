import { Shape } from './Shape';

export class Rectangle extends Shape {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public width: number = 5,
    public height: number = 5,
    public color: string = '#000000',
  ) {
    super(x, y, color);
  }

  public pointInShape(pointX: number, pointY: number): boolean {
    const inXBound = pointX >= this.x && pointX <= this.x + this.width;
    const inYBound = pointY >= this.y && pointY <= this.y + this.height;

    return inXBound && inYBound;
  }

   public clone() {
    return new Rectangle(this.x, this.y, this.width, this.height, this.color);
  }
}
