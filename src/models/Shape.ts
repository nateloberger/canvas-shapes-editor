export abstract class Shape {
  constructor(
    public id: number,
    public x: number = 0,
    public y: number = 0,
    public color: string = '#000000',
    public selected: boolean = false,
  ) {}

  public abstract pointInShape(x: number, y: number): boolean;
  public abstract draw(ctx: CanvasRenderingContext2D): void;
  public abstract drawHoverIndicator(ctx: CanvasRenderingContext2D): void;
  public abstract clone(): Shape;
};
