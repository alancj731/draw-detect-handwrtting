import {postData} from "../agent/PostData"

export const saveCanvasUtil = (
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null
) => {
  const userConfirmed = window.confirm("Do you want to download the file?");

  if (userConfirmed && canvas && context) {
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "draw.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    console.log("empty canvas or context");
  }
};

export const recogCanvasUtil = async (
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null
) => {
  if (canvas && context) {
    //   canvasToBlackWhite(canvas);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // following code can be used to update the original canvas
    // note for 0,0,0,0 please refer https://stackoverflow.com/questions/18028580/why-does-canvass-putimagedata-not-work-when-i-specify-target-location
    // context.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
    // context.drawImage(canvas, 0, 0)

    const pixel2DArray = imgTo2DArray(imageData, canvas.height, canvas.width);
    const responseData = await postData(pixel2DArray)
    // console.log("postDada executed!", responseData)
    return responseData
} else {
    console.log("empty canvas or context");
    return null
  }
};

const imgTo2DArray = (imageData: ImageData, height: number, width: number) => {
  const pixelArray = imageData.data;

  const pixel2DArray: number [] [] = [];

  for (let y = 0; y < height; y++) {
    var row = [];
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x) * 4
    //   const red = pixelArray[pixelIndex]
    //   const green = pixelArray[pixelIndex + 1]
    //   const blue = pixelArray[pixelIndex + 2]
      const grayscale = pixelArray[pixelIndex + 3]
      // because red, green and blue are all 0 in black and white mode
      // only push grayscale to pixel2DArray
      row.push(grayscale)
    }
    pixel2DArray.push(row);

  }
//   console.log("pixel2DArray to be returned:", pixel2DArray);
  return pixel2DArray;
};

// const imgToBlackWhite = (imageData: ImageData) => {
//   const pixelArray = imageData.data;
//   const bwPixelArray = new Uint8ClampedArray(pixelArray.length);
// //   console.log("pixelArray in b&w before:", pixelArray);
// //   var count = 0;

//   for (let i = 0; i < pixelArray.length; i += 4) {
//     // Calculate grayscale value
//     const red = pixelArray[i]; // in black white drawing, the value here is 0
//     const green = pixelArray[i + 1]; // in black white drawing, the value here is 0
//     const blue = pixelArray[i + 2]; // in black white drawing, the value here is 0
//     const gray = pixelArray[i + 3]; // not zero
//     const grayscale = (red + green + blue) / 3;
//     //const grayscale = 0;
//     // if(gray !== 0 && count < 3) {
//     //     console.log("(", i, ":", i+3, ")",red, green, blue, gray)
//     //     count += 1
//     // }
//     pixelArray[i] = grayscale; // still get zero here if original image is black and white
//     pixelArray[i + 1] = grayscale; // still get zero here if original image is black and white
//     pixelArray[i + 2] = grayscale; // still get zero here if original image is black and white
//   }
// //   console.log("pixelArray in b&w after:", pixelArray);
//   // return bwPixelArray
// };
