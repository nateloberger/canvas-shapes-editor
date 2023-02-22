import React from 'react';
import { Shape } from '../models';

import './Canvas.css';

export type CanvasProps = {
  shapes: Shape[];
  selectedShapes: Shape[];
  hoveredShape?: Shape;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
};

export function Canvas(props: CanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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

      if (shape === props.hoveredShape) {
        shape.drawHoverIndicator(ctx);
      }

      if (props.selectedShapes.find(s => s === shape)) {
        shape.drawSelectedIndicator(ctx);
      }
    });

  }, [props.shapes, props.hoveredShape, props.selectedShapes]);

  return (
    <canvas
      ref={canvasRef}
      height="500"
      width="500"
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
    >
    </canvas>
  );
}
