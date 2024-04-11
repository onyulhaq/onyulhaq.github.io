//drawing contexts for cursor area and mirrored area
canvas = document.querySelector("#draw_line");

ctx = canvas.getContext("2d");

//Function to record mousemovement and draw line
let startPosition = { x: 0, y: 0 };
let lineCoordinates = { x: 0, y: 0 };
let isDrawStart = false;

// Variable to store the length of the line
let lineLength = 0;
// Function to calculate distance between two points
const calculateDistance = (point1, point2) => {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
};

const getClientOffset = (event) => {
  const { pageX, pageY } = event.touches ? event.touches[0] : event;
  event.touches;
  const x = pageX - canvas.offsetLeft;
  const y = pageY - canvas.offsetTop;

  return {
    x,
    y,
  };
};

const drawLine = () => {
  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y);
  ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
  ctx.stroke();
};

const mouseDownListener = (event) => {
  startPosition = getClientOffset(event);
  isDrawStart = true;
};

const mouseMoveListener = (event) => {
  if (!isDrawStart) return;

  lineCoordinates = getClientOffset(event);
  clearCanvas();
  updateLineAndLength();

  let cur_linelength = updateLineAndLength();
};

const mouseupListener = (event) => {
  isDrawStart = false;
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

canvas.addEventListener("mousedown", mouseDownListener);
canvas.addEventListener("mousemove", mouseMoveListener);
canvas.addEventListener("mouseup", mouseupListener);

canvas.addEventListener("touchstart", mouseDownListener);
canvas.addEventListener("touchmove", mouseMoveListener);
canvas.addEventListener("touchend", mouseupListener);

// Function to update line length and draw line
const updateLineAndLength = () => {
  // Calculate the distance between start and current position
  lineLength = calculateDistance(startPosition, lineCoordinates);

  // Draw the line
  drawLine();

  //   // Output the length of the line (you can display it wherever you want)

  return lineLength;
  //   console.log("Length of the line:", lineLength);
};

// /https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event

function saveCanvas() {
  // Get the canvas screenshot as PNG
  var screenshot = Canvas2Image.saveAsPNG(canvas_mirror, true);

  // This is a little trick to get the SRC attribute from the generated <img> screenshot
  canvas_mirror.parentNode.appendChild(screenshot);
  screenshot.id = "canvasimage";
  data = screenshot.src;
  canvas_mirror.parentNode.removeChild(screenshot);

  // Send the screenshot to PHP to save it on the server
  var url = saveScript;

  jQuery.ajax({
    type: "POST",
    url: url,
    dataType: "text",
    data: {
      id: MID,
      trial: trialnumber,
      score: score,
      distance_inline: distance_inline,
      distance_offline: distance_offline,
      timeDiff: timeDiff,
      crossings: crossings,
      base64data: data,
      finished: finished,
      sessionScores: sessionScores,
      sessionRts: sessionRts,
    },
  });
}
