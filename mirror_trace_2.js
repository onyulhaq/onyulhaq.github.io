// This set of scripts implements a mirror trace task suitable for online use with Qualtrics
// It was written by Bob Calin-Jageman
// I was learning javascript as a I went; the code is stitched together from various online sources; sorry it is not very elegant
// You can see a demo of this script in action at: https://dom.az1.qualtrics.com/jfe/form/SV_eeSj6E3YyI8nxdP
// And you can see how pre-screening to ensure browser compatibility works here: https://dom.az1.qualtrics.com/jfe/form/SV_0lEq6SBvvT5LAj3

// this object contains the materials for the task -
//   the mirror property say if that trial should be mirrored
//   the file_names property give the file names for the images to use for each trial.
// NOTE: Currently this points to images hosted on the github site for this project.  You can change this but be sure:
// That the images are hosted on an https server with a flag set to allow cross-domain loading of images
//    xstarts, ystarts are the coordinates for the green dot that sets the trial start
//    xends, yends are the coordinates for where the trial ends
// currently this displays 3 difficult trials (h1, h2, and h3) and 3 regular trials (4, 5, 6)
// the images posted on github all have the same total line length and 15 segments





/* The following event listener moves the image pointer
with respect to the actual mouse cursor
The function is triggered every time mouse is moved */

// Initialize mouse cooridinate variables
// This will allow the image of the mouse pointer to follow where the actual cursor is

let x, y;

let px, py;
px = py = 0;


window.addEventListener("mousemove", function (e) {
  // Gets the x,y position of the mouse cursor
  x = e.clientX;
  y = e.clientY;
  // sets the image cursor to new relative position
  // "cursor" is an element in the html 
  cursor.style.left = px + x + "px";
  cursor.style.top = py + y + "px";
});



var materials = {
  mirror: [false, true, true, true, true, true, true, true],
  file_names: [
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/sample.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh2.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh3.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial2.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial3.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/sample.png",
  ],
  xstarts: [47, 27, 40, 280, 27, 40, 280, 33],
  ystarts: [256, 275, 45, 276, 275, 45, 276, 250],
  xends: [344, 370, 368, 33, 370, 368, 33, 47],
  yends: [260, 28, 267, 250, 28, 267, 250, 256],
};

//	'xstarts' : [47,	27,		40,		280,		40,		383,	352],
//		'ystarts' : [256,	275,	45,		276,		45,		265,	28],
//		'xends' :   [344,	370,	368,	33,			368,	28,		35],
//		'yends' :    [260,	28,		267,	250,		267,	15,		175]

//for saving screenshots
// the script can save screenshots of completed trials.
// to use this feature, set saveTrace to true and set saveScript to your server.  Your server will need a php script for accepting the files.
// the php script is posted on github
var saveScript = "https://calin-jageman.net/mirror_trace/save.php";
var saveTrace = false;

//image dimensions
var mywidth = 400;
var myheight = 300;

var score = 0;
var timeDiff = 0;
var trialnumber = 0;
var MID = 0;
var drawing = false;
var finished = false;
var timeFinished = 0;
var canvas;
var ctx;
var canvas_mirror;
var ctx_mirror;
var crossings = 0;
var distance_total = 0;
var distance_current = 0;
var distance_inline = 0;
var distance_offline = 0;
var startTime = 0;
var endTime = 0;
var lastRefresh = 0;
var currentRefresh = 0;

function do_mirror() {
  //load materials
  var imagePath = materials.file_names[trialnumber];
  // Whether or not not to use the mirror function
  mirror = materials.mirror[trialnumber];
  //
  var xstart = materials.xstarts[trialnumber];
  var ystart = materials.ystarts[trialnumber];

  var startRadius = 15;

  var xend = materials.xends[trialnumber];
  var yend = materials.yends[trialnumber];

  var endRadius = 7;

  //states to track
  drawing = false;
  finished = false;

  score = 0;

  timeDiff = 0;
  timeFinished = 0;

  var inline = false;
  crossings = 0;

  distance_total = 0;
  distance_current = 0;

  distance_inline = 0;
  distance_offline = 0;

  startTime = 0;
  endTime = 0;

  lastRefresh = 0;
  currentRefresh = 0;

  //drawing contexts for cursor area and mirrored area
  canvas = document.querySelector("#paint");

  ctx = canvas.getContext("2d");


  canvas_mirror = document.querySelector("#mirror");

  ctx_mirror = canvas_mirror.getContext("2d");



  //load the image to trace
  // Create instance of an images
  var imageObj = new Image();
  //".onload" - do this when immediately when the page loads
  imageObj.onload = function () {
    ctx_mirror.drawImage(imageObj, // Image
      dx = 0,
      dy = 0,
      dWidth = mywidth,
      dHeight = myheight);



    ctx_mirror.globalAlpha = 0.9;
    ctx.globalAlpha = 0.9;

    // Begins a Path
    ctx.beginPath();

    //
    if (mirror) {
      ctx.arc(xstart, ystart, startRadius, 0, 2 * Math.PI, false);
    } else {
      ctx.arc(xstart, ystart, startRadius, 0, 2 * Math.PI, false);
    };

    ctx.fillStyle = "green";
    ctx.fill();
    ctx_mirror.globalAlpha = 1;
    ctx.globalAlpha = 1;
    document.getElementById("status").innerHTML =
      "Click the green circle to begin this trial";

  };
  imageObj.crossOrigin = "anonymous";
  imageObj.src = imagePath;

  //defines data structure for mouse movement
  var mouse = { x: 0, y: 0 };
  var mouseold = { x: 0, y: 0 };


  /* Drawing on Paint App */
  ctx_mirror.lineWidth = 1.2;
  ctx_mirror.lineJoin = "round";
  ctx_mirror.lineCap = "round";
  ctx_mirror.strokeStyle = "blue";



}

