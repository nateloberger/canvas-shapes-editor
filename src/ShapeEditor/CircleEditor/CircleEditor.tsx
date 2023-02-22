import React from 'react';
import { Circle } from '../../models';

export type CircleEditorProps = {
  circle: Circle;
  onChange: (newCircle: Circle) => void;
  onDelete: () => void;
};

export function CircleEditor(props: CircleEditorProps) {
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCircle = props.circle.clone();
    newCircle.radius = Number(e.currentTarget.value);
    props.onChange(newCircle);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCircle = props.circle.clone();
    newCircle.color = e.currentTarget.value;
    props.onChange(newCircle);
  };

  return (
    <div className="editor">
      <div className="property">
        <button onClick={props.onDelete} aria-label="Delete">
          🗑
        </button>
        <span>Circle</span>
      </div>
      <div className="property">
        <div>center x</div>
        <div>{props.circle.x}</div>
      </div>
      <div className="property">
        <div>center y</div>
        <div>{props.circle.y}</div>
      </div>
      <div className="property">
        <div>radius</div>
        <input
          type="range"
          min="1"
          value={props.circle.radius}
          onChange={handleRadiusChange}
        />
      </div>
      <div className="property">
        <div>color</div>
        <div>
          <input
            type="color"
            value={props.circle.color}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}
