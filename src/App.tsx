import React from 'react';
import { Shape, Circle, Rectangle } from './models';
import { Canvas } from './Canvas';
import { ShapeEditor } from './ShapeEditor';

import './App.css';

const generateShapeId = () => {
  return Date.now(); // easy way to create unique numbers
}

function App() {
  const [shapes, setShapes] = React.useState<Shape[]>([]);
  const [selectedShapeIds, setSelectedShapeIds] = React.useState<number[]>([]);
  const [hoveredShapeId, setHoveredShapeId] = React.useState<number>();
  // The following don't need to trigger renders so they are stored as refs
  const mouseDownRef = React.useRef(false);
  const shapeMovedRef = React.useRef(false);

  const selectedShapes = shapes.filter(s => selectedShapeIds.find(id => id === s.id));

  const addCircle = () => {
    setShapes([
      ...shapes,
      new Circle(generateShapeId(), 50, 50),
    ])
  }

  const addRectangle = () => {
    setShapes([
      ...shapes,
      new Rectangle(generateShapeId(), 75, 75),
    ]);
  }

  const handleMouseDown = () => {
    mouseDownRef.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseDownRef.current = false;

    // If shapes are moved don't change the selection state.
    if (shapeMovedRef.current) {
      shapeMovedRef.current = false;
      return;
    }

    let newSelectedShapes: number[] = [];

    const clickedShape = shapes.find(s => {
      return s.pointInShape(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    });

    if (clickedShape) {
      // Deselect shape if it's already selected.
      newSelectedShapes = selectedShapeIds.filter(id => id !== clickedShape.id);

      // If no shape deselected then added it to selection.
      if (newSelectedShapes.length === selectedShapeIds.length) {
        if (e.shiftKey) {
          newSelectedShapes.push(clickedShape.id);
        }
        else {
          newSelectedShapes = [clickedShape.id];
        }
      }
    }

    setSelectedShapeIds(newSelectedShapes);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hoveredShape = shapes.find(s => {
      return s.pointInShape(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    });

    setHoveredShapeId(hoveredShape?.id);

    // Only move the values if the hoveredShape is a selected shape otherwise moving
    // the mouse on a non-selected shape could move the selected shapes.
    if (mouseDownRef.current && selectedShapeIds.find((id) => id === hoveredShapeId)) {
      setShapes(shapes.map(s => {
        if (!selectedShapes.find(selectedShape => selectedShape === s)) {
          return s;
        }

        shapeMovedRef.current = true;

        const shapeCopy = s.clone();
        shapeCopy.x += e.movementX;
        shapeCopy.y += e.movementY;

        return shapeCopy;
      }));
    }
  };

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
          hoveredShape={shapes.find(({id}) => id === hoveredShapeId)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>
      <div className="flex flex-direction-column">
        {selectedShapes.map((shape) => {
          return (
            <ShapeEditor
              key={shape.id}
              shape={shape}
              onChange={(editedShape) => {
                setShapes(shapes.map(s => s === shape ? editedShape : s));
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
