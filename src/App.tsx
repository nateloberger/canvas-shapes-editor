import React from 'react';
import { Shape, Circle, Rectangle } from './models';
import { Canvas } from './Canvas';
import { ShapeEditor } from './ShapeEditor';

import './App.css';

function App() {
  const [shapes, setShapes] = React.useState<Shape[]>([]);
  const [selectedShapes, setSelectedShapes] = React.useState<number[]>([]);

  const addCircle = () => {
    const p = shapes.length * 10;
    setShapes([
      ...shapes,
      new Circle(p, p),
    ])
  }

  const addRectangle = () => {
    setShapes([
      ...shapes,
      new Rectangle(),
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
          selectedShapes={selectedShapes}
          onShapeSelected={setSelectedShapes}
          onShapeMove={(i, x, y) => {
            const shapesCopy = [...shapes];
            const shapeCopy = shapes[i].clone();
            shapeCopy.x = x;
            shapeCopy.y = y;
            shapesCopy[i] = shapeCopy;

            setShapes(shapesCopy);
          }}
        />
      </div>
      <div className="flex flex-direction-column">
        {selectedShapes.map((i) => {
          const shape = shapes[i];
          return (
            <ShapeEditor
              shape={shape}
              onChange={(newShape) => {
                const shapesCopy = [...shapes];
                shapesCopy[i] = newShape;

                setShapes(shapesCopy);
              }}
              onDelete={() => {
                setShapes(shapes.filter(s => s !== shape));
                setSelectedShapes([]);
              }}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
