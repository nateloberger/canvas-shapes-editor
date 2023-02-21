import React from 'react';
import { Shape } from '../models';

export type CanvasProps = {
  shapes: Shape[];
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
};

export function Canvas(props: CanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [hoveredShapeId, setHoveredShapeId] = React.useState<number>();

  // Canvas render function
  React.useEffect(() => {
    if (!canvasRef.current) {
      throw new Error('Canvas not available.');
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      throw new Error('Canvas context not available.');
    }

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    props.shapes.forEach(shape => {
      shape.draw(ctx);

      if (shape.id === hoveredShapeId) {
        shape.drawHoverIndicator(ctx);
      }
    });

  }, [props.shapes, hoveredShapeId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hoveredShape = props.shapes.find(s => {
      return s.pointInShape(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    });

    setHoveredShapeId(hoveredShape?.id);

    props.onMouseMove(e);
  }

  return (
    <canvas
      ref={canvasRef}
      height="500"
      width="500"
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={handleMouseMove}
    >
    </canvas>
  );
}
