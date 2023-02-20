import { Shape } from './Shape';
export class Circle extends Shape {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public radius = 5,
    public color: string = '#000000',
  ) {
    super(x, y, color);
  }

  public pointInShape(pointX: number, pointY: number): boolean {
    const diffX = Math.abs(this.x - pointX);
    const diffY = Math.abs(this.y - pointY);
    const distanceFromOrigin = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

    return distanceFromOrigin <= this.radius;
  }

   public clone() {
    return new Circle(this.x, this.y, this.radius, this.color);
  }
}
