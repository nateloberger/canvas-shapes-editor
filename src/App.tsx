import React from 'react';
import './App.css';

class Circle {
  constructor(
    public x = 0,
    public y = 0,
    public radius = 5,
    // public color: CanvasFillStrokeStyles['fillStyle'] = 'black',
    public color: string = '#000000',
  ) { }
}

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = React.useState<Circle[]>([]);
  const [selectedShapes, setSelectedShapes] = React.useState<number[]>([]);
  const [hoverShape, setHoverShape] = React.useState<number>(-1);
  const dragging = React.useRef(false);
  // const shapes: Array<Circle> = [];

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

  const addCircle = () => {
    const p = shapes.length * 10;
    setShapes([
      ...shapes,
      new Circle(p, p),
    ])
  }

  const addRectangle = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.fillStyle = 'blue';
    ctx.fillRect(30, 30, 30, 30)
  }

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (canvasRef.current && ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      shapes.forEach((shape) => {
        drawCircle(shape);
      });

      if (hoverShape > -1) {
        const shape = shapes[hoverShape];
        drawCircle(new Circle(shape.x, shape.y, shape.radius + 2, 'purple'), true);
      }

      selectedShapes.forEach(i => {
        const shape = shapes[i];
        drawCircle(new Circle(shape.x, shape.y, shape.radius + 4, 'orange'), true);
      })
    }
  }, [shapes, hoverShape, selectedShapes])

  const mouseInShape = (e: React.MouseEvent) => {
    const { x: canvasX, y: canvasY } = e.currentTarget.getBoundingClientRect();
    const positionX = e.clientX - canvasX;
    const positionY = e.clientY - canvasY;

    return shapes.findIndex((shape) => {
      const diffX = Math.abs(shape.x - positionX);
      const diffY = Math.abs(shape.y - positionY);

      const distanceToOrigin = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

      return distanceToOrigin <= shape.radius;
    });

  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hoveredShape = mouseInShape(e);
    setSelectedShapes(hoveredShape !== -1 ? [hoveredShape] : []);
  }

  const handleMouseDown = () => {
    if (selectedShapes.length) {
      dragging.current = true;
    }
  }

  const handleMouseUp = () => {
    dragging.current = false;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // TODO - click bug..
    if (dragging.current && selectedShapes.length) {
      const { x: canvasX, y: canvasY } = e.currentTarget.getBoundingClientRect();
      const positionX = e.clientX - canvasX;
      const positionY = e.clientY - canvasY;

      // console.log(positionX, e.nativeEvent.offsetX);

      const i = selectedShapes[0];
      const shape = shapes[i];

      const newShape = {
        ...shape,
        x: positionX,
        y: positionY,
      };

      const shapesCopy = [...shapes];
      shapesCopy[i] = newShape;

      setShapes(shapesCopy);

    } else if (shapes.length) {
      setHoverShape(mouseInShape(e));
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={addCircle}>Add Circle</button>
        <br />
        <button onClick={addRectangle}>Add Rectangle</button>
      </div>
      <div>
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

      </div>
      <div className="flex flex-direction-column">
        {selectedShapes.map((i) => {
          const shape = shapes[i];
          return (
            // KEY
            <div>
              <div className="property">
                <button
                  onClick={() => {
                    setShapes(shapes.filter(s => s !== shape));
                    setSelectedShapes([]);
                  }}
                >
                  Delete
                </button>
                <span>Circle</span>
              </div>
              <div className="property">
                <div>center x</div>
                <div>{shape.x}</div>
              </div>
              <div className="property">
                <div>center y</div>
                <div>{shape.y}</div>
              </div>
              <div className="property">
                <div>radius</div>
                <input type="range" min={1} value={shape.radius}
                  onChange={(e) => {
                    const newShape = {
                      ...shape,
                      radius: Number(e.currentTarget.value)
                    };

                    const shapesCopy = [...shapes];
                    shapesCopy[i] = newShape;

                    setShapes(shapesCopy);
                  }}
                />
              </div>
              <div className="property">
                <div>color</div>
                <input type="color"
                  value={shape.color}
                  onChange={(e) => {
                    const newShape = {
                      ...shape,
                      color: e.currentTarget.value
                    };

                    const shapesCopy = [...shapes];
                    shapesCopy[i] = newShape;

                    setShapes(shapesCopy);
                  }}

                />
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default App;
