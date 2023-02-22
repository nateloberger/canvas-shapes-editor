import React from 'react';
import { Rectangle } from '../../models';

export type RectangleEditorProps = {
  rectangle: Rectangle;
  onChange: (newRectangle: Rectangle) => void;
  onDelete: () => void;
};

export function RectangleEditor(props: RectangleEditorProps) {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRectangle = props.rectangle.clone();
    newRectangle.width = Number(e.currentTarget.value);
    props.onChange(newRectangle);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRectangle = props.rectangle.clone();
    newRectangle.height = Number(e.currentTarget.value);
    props.onChange(newRectangle);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCircle = props.rectangle.clone();
    newCircle.color = e.currentTarget.value;
    props.onChange(newCircle);
  };

  return (
    <div className="editor">
      <div className="property">
        <button onClick={props.onDelete} aria-label="Delete">
          🗑
        </button>
        <span>Rectangle</span>
      </div>
      <div className="property">
        <div>center x</div>
        <div>{props.rectangle.x}</div>
      </div>
      <div className="property">
        <div>center y</div>
        <div>{props.rectangle.y}</div>
      </div>
      <div className="property">
        <div>width</div>
        <input
          type="range"
          min="5"
          value={props.rectangle.width}
          onChange={handleWidthChange}
        />
      </div>
      <div className="property">
        <div>height</div>
        <input
          type="range"
          min="5"
          value={props.rectangle.height}
          onChange={handleHeightChange}
        />
      </div>
      <div className="property">
        <div>color</div>
        <div>
          <input
            type="color"
            value={props.rectangle.color}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}
