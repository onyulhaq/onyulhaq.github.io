const paintBox = document.getElementById("paint-box");
const imageBox = document.getElementById("image-box");
const paintCtx = paintBox.getContext("2d");
const imageCtx = imageBox.getContext("2d");

// Resize both canvases
function resizeCanvases() {
  paintBox.width = paintBox.clientWidth;
  paintBox.height = paintBox.clientHeight;
  imageBox.width = imageBox.clientWidth;
  imageBox.height = imageBox.clientHeight;
}
window.addEventListener("resize", resizeCanvases);
resizeCanvases();

function draw(e) {
  // Get mouse position in paint box
  const rect = paintBox.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Calculate mirrored position
  const mirroredX = paintBox.width - x;
  const mirroredY = paintBox.height - y;

  imageCtx.lineWidth = 5;
  imageCtx.lineCap = "round";
  imageCtx.strokeStyle = "red";

  imageCtx.lineTo(mirroredX, mirroredY);
  imageCtx.stroke();
  imageCtx.beginPath();
  imageCtx.moveTo(mirroredX, mirroredY);
}

// Clear the canvas when mouse leaves paint box
function clearCanvas() {
  imageCtx.clearRect(0, 0, imageBox.width, imageBox.height);
  imageCtx.beginPath(); // Reset the path
}

paintBox.addEventListener("mousemove", draw);
paintBox.addEventListener("mouseleave", clearCanvas);
