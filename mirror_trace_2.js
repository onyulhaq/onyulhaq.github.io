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

// let x, y;

// let px, py;
// px = py = 0;

// window.addEventListener("mousemove", function (e) {
//   // Gets the x,y position of the mouse cursor
//   x = e.clientX;
//   y = e.clientY;
//   // sets the image cursor to new relative position
//   // "cursor" is an element in the html
//   cursor.style.left = px + x + "px";
//   cursor.style.top = py + y + "px";
// });

var materials = {
  mirror: [false, true, true, true, true, true, true, true, true, , true, true],
  file_names: [
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/sample.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trialh1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
    "https://raw.githubusercontent.com/onyulhaq/mirror_trace/master/trial1.png",
  ],
  xstarts: Array(15).fill(27),
  ystarts: Array(15).fill(275),
  xends: Array(15).fill(370),
  yends: Array(15).fill(28),
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
// Create function for audio  noice
var audio = new Audio();
// Requests image
audio.crossOrigin = "anonymous";
// where to request the imgae from
audio.src =
  "https://raw.githubusercontent.com/onyulhaq/onyulhaq.github.io/master/beep.mp3";
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
  drawing = false; //////////////////////////// Need to change back to false when done
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
    ctx_mirror.drawImage(
      imageObj, // Image

      // x-coordinate of the image
      (dx = 0),
      // y-coordinate of the image - basically where should we put the image
      (dy = 0),
      // the width of the picture
      (dWidth = mywidth),
      //height of the picture
      (dHeight = myheight)
    );

    // How transparent the image should be
    ctx_mirror.globalAlpha = 0.9;
    ctx.globalAlpha = 0.9;

    // Begins a Path
    ctx.beginPath();

    // create the circle of that tells participnts where to start
    // if mirror - if we are on the mirror trials make the circle
    if (mirror) {
      ctx.arc(xstart, ystart, startRadius, 0, 2 * Math.PI, false);
    } else {
      ctx.arc(xstart, ystart, startRadius, 0, 2 * Math.PI, false);
    }
    // color of the circle
    ctx.fillStyle = "green";
    // tells javacript to fill the circle it create in the drawing area
    ctx.fill();
    ctx_mirror.globalAlpha = 1;
    ctx.globalAlpha = 1;
    document.getElementById("status").innerHTML =
      "Click the green circle to begin this trial";
  };
  // Requests image
  imageObj.crossOrigin = "anonymous";
  // where to request the imgae from
  imageObj.src = imagePath;

  //defines data structure for mouse movement
  var mouse = { x: 0, y: 0 };
  var mouseold = { x: 0, y: 0 };

  /* Drawing on Paint App */
  ctx_mirror.lineWidth = 1.2;
  ctx_mirror.lineJoin = "round";
  ctx_mirror.lineCap = "round";
  ctx_mirror.strokeStyle = "blue";

  /* Mouse Capturing Work */
  canvas.addEventListener(
    "mousemove",
    function (e) {
      // Only does this when the mouse is hovering above the drawing canvas. The canvas object refers to canvas = document.querySelector("#paint"); that we established above
      // e.PAGEX is the X xoordinate on the window
      // e.PAGEY is the Y xoordinate on the window
      // "this" refers to "canvas" which is the object that we are performing a method on
      // offsetLeft - refers to how many pixels the object (in this case the box we drew with the Canvas HTML element) is from the left side of the browers
      // e.pageX - this.offsetLeft - this give x coodridina in relation to the "paint" canvas box
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
      // console.log(mouse.x, mouse.y);
      //update status

      var pos = betterPos(canvas, e);

      //var pos = findPos(this);
      //var x = e.pageX - pos.x;
      //var y = e.pageY - pos.y;
      // Basically does the exact same thing - but supposedly gets "better" coordinates. We'll leave it as is
      var x = pos.x;
      var y = pos.y;
      mouse.x = x;
      mouse.y = y;

      if (mirror) {
        // This reverses the coordinates. Currently Mouse.x and Mouse.y start from the left side of the canvas and top part of the canvas. This function makes it so that the coordinates start from the right and the bottom
        var coord = "x=" + (mywidth - x) + ", y=" + (myheight - y);
      } else {
        var coord = "x=" + x + ", y=" + y;
      }

      // Get the image data of the mirror canvas(canvas with the picture to trace). When we are in the mirror trials - enter sx and sy images are reversed - most likely because we are doing a mirror tracing. So in normal circumstance we provide the top left coordinate as the (this time for the mirror trails we are providing the bottom-right) likewise. This basically flips/mirrors the above image and
      if (mirror) {
        var p = ctx_mirror.getImageData(
          mywidth - mouse.x,
          myheight - mouse.y,
          1,
          1
        ).data;
      } else {
        var p = ctx_mirror.getImageData(mouse.x, mouse.y, 1, 1).data;
      }
      // If cursor is hovering over the dark lines in the picture when it's on the canvas show the hex. By using the getImageData function we can see what the color is in rgb.
      var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

      // Calculates distance from the end of the tracing
      var cendRadius = Math.sqrt(
        Math.pow(mouse.x - xend, 2) + Math.pow(mouse.y - yend, 2)
      );

      // End radius is basically the acceptable amnount of distance from the endpoint that we created. Once people are withing that accpetable amount of disatnce then turn off the drawing mode (stop the painting line and mirrored movements) and changed the status to finished

      if (cendRadius < endRadius) {
        if (drawing) {
          drawing = false;
          finished = true;
          if (saveTrace) {
            saveCanvas();
            //call save function
          }
        }
      }
      // console.log({
      //   mouseoldx: mouseold.x,
      //   "mouse.x": mouse.x,
      //   mouseoldy: mouseold.y,
      //   Mousey: mouse.y,
      //   drawing: drawing,
      // });
      // Will likely need to make an alert that tells the participant that they failed, then ask them if they wish to retake the test again.
      // Drawing is made true in the later function where we see if the participants clicked on the green circle that tells them to start.Until then it is on False.
      if (drawing) {
        // Mouse.x and Mouse.y are the coordinates in relation to the top left corner of the drawing canvas. Mouseold are 0,0 (so the top left corner)
        // when we are in drawing moder calculate the distance of the cursor from the top left corner of the drawing canvas
        if (mouseold.x - mouse.x + mouseold.y - mouse.y != 0) {
          distance_current = Math.sqrt(
            Math.pow(mouseold.x - mouse.x, 2) +
            Math.pow(mouseold.y - mouse.y, 2)
          );
        }

        //Otherwise the distance is assumed to be 0
        else {
          distance_current = 0;
        }

        console.log({
          inline: inline,
          on_image: p[0] + p[1] + p[2],
          distance_inline: distance_inline,
          distance_current: distance_current,
        });

        //document.getElementByID("status").innerHTML = p[0]+p[1]+p[2]; This checks if the cursor is over the image lines. When the cursor is over the lines it sets the inline to true. This
        if (p[0] + p[1] + p[2] < 200) {
          if (inline) {
            // Whenever we are on the image sum up how far the cursor is from the top left corner
            distance_inline = distance_inline + distance_current;
          } else {
            inline = true;
            crossings = crossings + 1;
            distance_inline = distance_inline + 0.5 * distance_current;
            distance_offline = distance_offline + 0.5 * distance_current;
            ctx_mirror.beginPath();
            if (mirror) {
              ctx_mirror.moveTo(mywidth - mouse.x, myheight - mouse.y);
            } else {
              ctx_mirror.moveTo(mouse.x, mouse.y);
            }
          }
        } else {
          if (inline) {
            inline = false;

            crossings = crossings + 1;
            distance_inline = distance_inline + 0.5 * distance_current;
            distance_offline = distance_offline + 0.5 * distance_current;
            ctx_mirror.beginPath();
            if (mirror) {
              ctx_mirror.moveTo(mywidth - mouse.x, myheight - mouse.y);
            } else {
              ctx_mirror.moveTo(mouse.x, mouse.y);
            }
          } else {
            distance_offline = distance_offline + distance_current;
          }
        }

        // distance_total how far we are from the top left corner summed up
        //distance inline -
        //score - proportion of the mousemovement spent on tracing the image
        // distance inline = cursor.distance
        distance_total = distance_total + distance_current;
        score = distance_inline / distance_total;
        endTime = new Date();
        timeDiff = (endTime - startTime) / 1000;

        if (inline) {
          ctx_mirror.strokeStyle = "red";
        } else {
          ctx_mirror.strokeStyle = "blue";
          audio.play();
          alert("You are off");
        }

        if (mirror) {
          ctx_mirror.lineTo(mywidth - mouse.x, myheight - mouse.y);
        } else {
          ctx_mirror.lineTo(mouse.x, mouse.y);
        }
        ctx_mirror.stroke();
        document.getElementById("status").innerHTML =
          "Score = " + Math.round(score * 100) + "% ";
        //document.getElementByID("status").innerHTML = p[0]+p[1]+p[2];
      }

      // console.log({
      // "Mirror Status": mirror,
      // "mouse.x": mouse.x,
      // "mouse.y": mouse.y,
      // xend: xend,
      // yend: yend,
      // cendRadius: cendRadius,
      // endRadius: endRadius,
      // coordinates: coord,
      // hex: hex,
      // p: p,
      // "p[0]": p[0],
      // "p[1]": p[1],
      // "p[2]": p[2],
      // });
      else {
        if (!finished) {
          currentRefresh = new Date();
          if (currentRefresh - lastRefresh > 1000 / 30) {
            ctx_mirror.drawImage(imageObj, 0, 0, mywidth, myheight);

            ctx_mirror.fillStyle = "green";
            ctx_mirror.globalAlpha = 0.4;
            //ctx_mirror.beginPath();
            if (mirror) {
              //	ctx_mirror.arc(mywidth - xstart, myheight - ystart, startRadius, 0, 2 * Math.PI, false);
            } else {
              //	ctx_mirror.arc(xstart, ystart, startRadius, 0, 2 * Math.PI, false);
            }
            // ctx_mirror.fill();
            ctx_mirror.globalAlpha = 1;

            ctx_mirror.beginPath();
            if (mirror) {
              ctx_mirror.arc(
                mywidth - mouse.x,
                myheight - mouse.y,
                4,
                0,
                2 * Math.PI,
                false
              );
            } else {
              ctx_mirror.arc(mouse.x, mouse.y, 4, 0, 2 * Math.PI, false);
            }
            ctx_mirror.fillStyle = "green";
            ctx_mirror.fill();
            lastRefresh = currentRefresh;
            document.getElementById("status").innerHTML =
              "Click the green circle to begin this trial";
          }
        } else {
          document.getElementById("status").innerHTML =
            "Finished with score = " +
            Math.round(score * 100) +
            "%<BR> Click next to continue.";
        }
      }

      //store current coordinates
      mouseold.x = mouse.x;
      mouseold.y = mouse.y;
    },
    false
  );
  canvas.addEventListener(
    "mousedown",
    function (e) {
      var currentRadius = Math.sqrt(
        Math.pow(mouse.x - xstart, 2) + Math.pow(mouse.y - ystart, 2)
      );

      if (!finished) {
        if (drawing) {
          //drawing = false;
          //finished = true;
          //if (saveTrace) {
          //	saveCanvas();
          //call save function
          //savecanvas(canvas_mirror.toDataURL())
          //}
        } else {
          if (currentRadius < startRadius) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx_mirror.drawImage(imageObj, 0, 0, mywidth, myheight);
            ctx_mirror.fillStyle = "red";
            ctx_mirror.globalAlpha = 0.4;
            ctx_mirror.beginPath();
            if (mirror) {
              ctx_mirror.arc(
                mywidth - xend,
                myheight - yend,
                endRadius,
                0,
                2 * Math.PI,
                false
              );
            } else {
              ctx_mirror.arc(xend, yend, endRadius, 0, 2 * Math.PI, false);
            }
            ctx_mirror.fill();
            ctx_mirror.globalAlpha = 1;

            drawing = true;
            finished = false;
            startTime = new Date();
            ctx_mirror.beginPath();
            if (mirror) {
              ctx_mirror.moveTo(mywidth - mouse.x, myheight - mouse.y);
            } else {
              ctx_mirror.moveTo(mouse.x, mouse.y);
            }
          }
        }
      }
    },
    false
  );

  var onPaint = function () {
    if (mirror) {
      ctx_mirror.lineTo(mywidth - mouse.x, myheight - mouse.y);
    } else {
      ctx_mirror.lineTo(mouse.x, mouse.y);
    }
    ctx_mirror.stroke();
  };

  function betterPos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }
  function findPos(obj) {
    var curleft = 0,
      curtop = 0;
    //document.getElementById("status").innerHTML = "Find pos: ";

    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
        document.getElementById("status").innerHTML +=
          obj.id + " Left: " + obj.offsetLeft + "Top: " + obj.offsetTop + " / ";
      } while ((obj = obj.offsetParent));
      return { x: curleft, y: curtop };
    }
    return undefined;
  }

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }
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
      },
    });
  }
}
