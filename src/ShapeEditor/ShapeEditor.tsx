import React from 'react';
import { Circle } from '../models/Circle';

export type ShapeEditorProps = {
  shape: Circle;
  onChange: (newShape: Circle) => void;
  onDelete: () => void;
};

export function ShapeEditor(props: ShapeEditorProps) {
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      ...props.shape,
      radius: Number(e.currentTarget.value),
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      ...props.shape,
      color: e.currentTarget.value,
    });
  };

  return (
    <div>
      <div className="property">
        <button onClick={props.onDelete}>
          Delete
        </button>
        <span>Circle</span>
      </div>
      <div className="property">
        <div>center x</div>
        <div>{props.shape.x}</div>
      </div>
      <div className="property">
        <div>center y</div>
        <div>{props.shape.y}</div>
      </div>
      <div className="property">
        <div>radius</div>
        <input
          type="range"
          min="1"
          value={props.shape.radius}
          onChange={handleRadiusChange}
        />
      </div>
      <div className="property">
        <div>color</div>
        <input
          type="color"
          value={props.shape.color}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
}
