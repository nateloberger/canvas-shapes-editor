export abstract class Shape {
  constructor(
    public id: number,
    public x: number = 0,
    public y: number = 0,
    public color: string = '#000000',
  ) {}

  /** Determines if x/y coordinate is within the area of the shape. */
  public abstract pointInShape(x: number, y: number): boolean;
  /** Draws the filled shape. */
  public abstract draw(ctx: CanvasRenderingContext2D): void;
  /** Draws a hover indicator around the shape. */
  public abstract drawHoverIndicator(ctx: CanvasRenderingContext2D): void;
  /** Draws a selection indicator around the shape. */
  public abstract drawSelectedIndicator(ctx: CanvasRenderingContext2D): void;
  /** Returns a copy of the shape. */
  public abstract clone(): Shape;
};
