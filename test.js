var materials = {
  mirror: [false, true],
  file_names: [
    "https://raw.githubusercontent.com/onyulhaq/onyulhaq.github.io/master/trialh1_white.png",
    "https://raw.githubusercontent.com/onyulhaq/onyulhaq.github.io/master/triale1.png",
  ],
  xstarts: [56, 80],
  ystarts: [259, 68],
  xends: [365, 318],
  yends: [252, 226],
};

var trialnumber = 13;
//load materials
if ((trialnumber >= 1) & (trialnumber <= 16)) {
  var imagePath = materials.file_names[1];
  // Whether or not not to use the mirror function
  mirror = materials.mirror[1];
  var xstart = materials.xstarts[0];
  var ystart = materials.ystarts[0];
  var xend = materials.xends[0];
  var yend = materials.yends[0];
} else if ((trialnumber >= 17) & (trialnumber <= 35)) {
  var imagePath = materials.file_names[2];
  mirror = materials.mirror[1];
  var xstart = materials.xstarts[1];
  var ystart = materials.ystarts[1];
  var xend = materials.xends[1];
  var yend = materials.yends[1];
}

var startRadius = 10;

console.log(imagePath, mirror, xstart, ystart, xend, yend);
