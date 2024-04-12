function do_line_length() {
  //drawing contexts for cursor area and mirrored area
  canvas = document.querySelector("#draw_line");
  var saveScript = "https://calin-jageman.net/mirror_trace/save.php";

  ctx = canvas.getContext("2d");

  //Function to record mousemovement and draw line
  let startPosition = { x: 0, y: 0 };
  let lineCoordinates = { x: 0, y: 0 };
  let isDrawStart = false;

  // Variable to store the length of the line
  let lineLength = 0;

  // Global variable to store line length
  let lineLengthOnMouseUp = 0;
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
  };

  const mouseupListener = (event) => {
    isDrawStart = false;
    // Update line length when mouse is lifted
    lineLengthOnMouseUp = updateLineAndLength();
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
    console.log(lineLength);

    return lineLength;
    //   console.log("Length of the line:", lineLength);
  };

  // /https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event

  function saveCanvas() {
    // Get the line length by calling updateLineAndLength function
    // var lineLength = updateLineAndLength();

    // Send the screenshot to PHP to save it on the server
    var url = saveScript;

    jQuery.ajax({
      type: "POST",
      url: url,
      dataType: "text",
      data: {
        line_length: lineLengthOnMouseUp,
      },
    });
  }
}
