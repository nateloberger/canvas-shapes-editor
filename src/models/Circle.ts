import { Shape } from './Shape';
export class Circle extends Shape {
  constructor(
    public id: number,
    public x: number = 0,
    public y: number = 0,
    public radius = 20,
    public color: string = '#000000',
    public selected: boolean = false,
    public hovered: boolean = false,
  ) {
    super(id, x, y, color);
  }

  public pointInShape(pointX: number, pointY: number): boolean {
    const diffX = Math.abs(this.x - pointX);
    const diffY = Math.abs(this.y - pointY);
    const distanceFromOrigin = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

    return distanceFromOrigin <= this.radius;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    if (this.selected) {
      ctx.beginPath();
      ctx.strokeStyle = 'orange';
      ctx.arc(this.x, this.y, this.radius + 4, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
  }

  public drawHoverIndicator(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = 'purple';
    ctx.arc(this.x, this.y, this.radius + 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  public clone(): Circle {
    return new Circle(this.id, this.x, this.y, this.radius, this.color, this.selected, this.hovered);
  }
}
