import React from 'react';
import { Circle, Rectangle, Shape } from '../models';

export type CanvasProps = {
  shapes: Shape[];
  selectedShapes: number[];
  onShapeSelected: (index: number[]) => void;
  onShapeMove: (index: number, x: number, y: number) => void;
};

export function Canvas(props: CanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [hoverShape, setHoverShape] = React.useState<number>(-1);
  const dragging = React.useRef(false);

  const drawCircle = (circle: Circle, outline = false) => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = circle.color;
      ctx.strokeStyle = circle.color;
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      outline ? ctx.stroke() : ctx.fill();
      ctx.closePath();
    }
  }

  const drawRectangle = (rect: Rectangle, outline = false) => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      ctx.fillStyle = rect.color;
      ctx.strokeStyle = rect.color;
      outline ?
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
        : ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
  }

  // Draw
  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (canvasRef.current && ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      props.shapes.forEach((shape) => {
        if (shape instanceof Circle) {
          drawCircle(shape);
        }
        else if (shape instanceof Rectangle) {
          drawRectangle(shape);
        }
      });

      if (hoverShape > -1) {
        const shape = props.shapes[hoverShape];
        if (shape instanceof Circle) {
          drawCircle(new Circle(shape.x, shape.y, shape.radius + 2, 'purple'), true);
        }
        else if (shape instanceof Rectangle) {
          drawRectangle(new Rectangle(shape.x - 1, shape.y - 1 , shape.width + 2, shape.height + 2, 'purple'), true);
        }
      }

      props.selectedShapes.forEach(i => {
        const shape = props.shapes[i];
        if (shape instanceof Circle) {
          drawCircle(new Circle(shape.x, shape.y, shape.radius + 4, 'orange'), true);
        }
        else if (shape instanceof Rectangle) {
          drawRectangle(new Rectangle(shape.x - 1, shape.y - 1 , shape.width + 2, shape.height + 2, 'orange'), true);
        }
      })
    }
  }, [props.shapes, hoverShape, props.selectedShapes])

  const mouseInShape = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;

    return props.shapes.findIndex((shape) => {
      return shape.pointInShape(offsetX, offsetY);
    });
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hoveredShape = mouseInShape(e);
    props.onShapeSelected(hoveredShape !== -1 ? [hoveredShape] : []);
  }

  const handleMouseDown = () => {
    if (props.selectedShapes.length) {
      dragging.current = true;
    }
  }

  const handleMouseUp = () => {
    dragging.current = false;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // TODO - click bug..
    if (dragging.current && props.selectedShapes.length) {
      const { offsetX, offsetY } = e.nativeEvent;
      const i = props.selectedShapes[0];
      props.onShapeMove(i, offsetX, offsetY);
    }
    else if (props.shapes.length) {
      setHoverShape(mouseInShape(e));
    }
  }

  return (
    <canvas
      ref={canvasRef}
      height="500"
      width="500"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
    </canvas>
  );
}
