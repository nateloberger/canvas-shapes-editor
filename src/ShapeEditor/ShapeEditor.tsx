import React from 'react';
import { Shape, Circle, Rectangle } from '../models';
import { CircleEditor } from './CircleEditor';
import { RectangleEditor } from './RectangleEditor';

import './ShapeEditor.css';

export type ShapeEditorProps = {
  shape: Shape;
  onChange: (editedShape: Shape) => void;
  onDelete: () => void;
};

export function ShapeEditor(props: ShapeEditorProps) {
  if (props.shape instanceof Circle) {
    return (
      <CircleEditor
        circle={props.shape}
        onChange={props.onChange}
        onDelete={props.onDelete}
      />
    );
  }

  if (props.shape instanceof Rectangle) {
    return (
      <RectangleEditor
        rectangle={props.shape}
        onChange={props.onChange}
        onDelete={props.onDelete}
      />
    );
  }

  return null;
}
