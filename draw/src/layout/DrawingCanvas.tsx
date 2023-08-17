import React, { useRef, useState } from "react";
import { Button, Container, Icon } from "semantic-ui-react";
import {saveCanvasUtil, recogCanvasUtil} from "../utils/DrawUtils"

interface Props {
  setResult: React.Dispatch<React.SetStateAction<string>>
}

const DrawingCanvas = ({setResult}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  let previousPosition = useRef({ x: 0, y: 0 });

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      contextRef.current = canvas.getContext("2d");
      const { offsetX, offsetY } = event.nativeEvent;
      previousPosition.current = { x: offsetX, y: offsetY };
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const context = contextRef.current;
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.lineCap = "round";

    context.beginPath();
    context.moveTo(previousPosition.current.x, previousPosition.current.y);
    context.lineTo(offsetX, offsetY);
    context.stroke();

    previousPosition.current = { x: offsetX, y: offsetY };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current && contextRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    else{
      console.log("Warning: empty canvas or context!")
    }
  };

  const recogCanvas = async () => {
    const responseData = await recogCanvasUtil(canvasRef.current, contextRef.current)
    const result = String(responseData.result)
    // console.log("recogCanvasUtil returned:", typeof(responseData.result), responseData.result)
    setResult(result)
  };

  
  const saveCanvas = () => {
    saveCanvasUtil(canvasRef.current, contextRef.current)
  };

  return (
    <>
      <Container>
        <canvas
          ref={canvasRef}
          width={28}
          height={28}
          style={{
            border: "2px solid black",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </Container>
      <Container>
        <Button color="blue" size="tiny" onClick={clearCanvas} style={{ width: "85px", marginRight: "10px", marginLeft: "10px",}}>
          <Icon name="erase" />
          Clear
        </Button>
        <Button color="red" size="tiny" onClick={recogCanvas} style={{ width: "85px", marginRight: "10px", marginLeft: "10px",}}>
          <Icon name="eye" />
          AI
        </Button>
        <Button color="black" size="tiny" onClick={saveCanvas} style={{ width: "85px", marginRight: "10px", marginLeft: "10px",}}>
          <Icon name="save" />
          Save
        </Button>
      </Container>
    </>
  );
};

export default DrawingCanvas;
