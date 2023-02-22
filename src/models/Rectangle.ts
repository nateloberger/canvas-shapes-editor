import { Shape } from './Shape';

export class Rectangle extends Shape {
  constructor(
    public id: number,
    public x: number = 0,
    public y: number = 0,
    public width: number = 40,
    public height: number = 40,
    public color: string = '#000000',
  ) {
    super(id, x, y, color);
  }

  public pointInShape(pointX: number, pointY: number): boolean {
    const inXBound = pointX >= this.x && pointX <= this.x + this.width;
    const inYBound = pointY >= this.y && pointY <= this.y + this.height;

    return inXBound && inYBound;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  public drawHoverIndicator(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'purple'; // TODO - supposed to be semi transparent and could move to Shape class.
    ctx.strokeRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
  }

  public drawSelectedIndicator(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'orange';
    ctx.strokeRect(this.x - 3, this.y - 3, this.width + 6, this.height + 6);
  }

  public clone() {
    return new Rectangle(this.id, this.x, this.y, this.width, this.height, this.color);
  }
}
