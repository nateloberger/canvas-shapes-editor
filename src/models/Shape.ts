export abstract class Shape {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public color: string = '#000000',
  ) {}

  public abstract pointInShape(x: number, y: number): boolean;
  public abstract clone(): Shape;
};
