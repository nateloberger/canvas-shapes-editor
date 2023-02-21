import React from 'react';
import { Shape, Circle, Rectangle } from './models';
import { Canvas } from './Canvas';
import { ShapeEditor } from './ShapeEditor';

import './App.css';

function App() {
  const [shapes, setShapes] = React.useState<Shape[]>([]);
  const [mouseDown, setMouseDown] = React.useState(false);
  const newShapeIdRef = React.useRef(0);
  const selectedShapes = shapes.filter(s => s.selected);

  const addCircle = () => {
    setShapes([
      ...shapes,
      new Circle(newShapeIdRef.current++, 50, 50),
    ])
  }

  const addRectangle = () => {
    setShapes([
      ...shapes,
      new Rectangle(newShapeIdRef.current++, 75, 75),
    ]);
  }

  return (
    <div className="App">
      <div>
        <button onClick={addCircle}>Add Circle</button>
        <br />
        <button onClick={addRectangle}>Add Rectangle</button>
      </div>
      <div>
        <Canvas
          shapes={shapes}
          onMouseDown={e => {
            setMouseDown(true);

            const clickedShape = shapes.find(s => {
              return s.pointInShape(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            });

            if (clickedShape) {
              if (clickedShape.selected) {
                return;
              }

              setShapes(shapes.map(s => {
                const shapeCopy = s.clone();
                shapeCopy.selected = false;

                if (clickedShape === s || (s.selected && e.shiftKey)) {
                  shapeCopy.selected = true;
                }

                return shapeCopy;
              }));
            }
            else if (selectedShapes.length) {
              setShapes(shapes.map(s => {
                if (s.selected) {
                  const shapeCopy = s.clone();
                  shapeCopy.selected = false;
                  return shapeCopy;
                }

                return s;
              }));
            }
          }}
          onMouseUp={e => {
            setMouseDown(false);
          }}
          onMouseMove={e => {
            if (mouseDown && selectedShapes.length) {
              setShapes(shapes.map(s => {
                if (!s.selected) {
                  return s;
                }

                const shapeCopy = s.clone();
                shapeCopy.x += e.movementX;
                shapeCopy.y += e.movementY;

                return shapeCopy;
              }));
            }
          }}
        />
      </div>
      <div className="flex flex-direction-column">
        {selectedShapes.map((shape) => {
          return (
            <ShapeEditor
              key={shape.id}
              shape={shape}
              onChange={(editedShape) => {
                setShapes(shapes.map(s => {
                  if (s === shape) {
                    return editedShape;
                  }

                  return s;
                }));
              }}
              onDelete={() => {
                setShapes(shapes.filter(s => s !== shape));
              }}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
