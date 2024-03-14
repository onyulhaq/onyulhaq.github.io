document.addEventListener("DOMContentLoaded", function () {
  // Initialize or load the scores array
  var scores = localStorage.getItem("gameScores")
    ? JSON.parse(localStorage.getItem("gameScores"))
    : [];
  var currentScore = scores.length > 0 ? scores[scores.length - 1] : 2500; // Start from 2500 or the last score

  // create trial number variable
  var retries = localStorage.getItem("mirrorRetries")
    ? JSON.parse(localStorage.getItem("mirrorRetries"))
    : [];
  var trialnumber = 0;

  // Function to save the current score and update the scores array
  function saveData() {
    currentScore -= 10; // Decrease score by 10
    scores.push(currentScore); // Add new score to the array

    // add trial number by 1
    trialnumber += 1;

    localStorage.setItem("gameScores", JSON.stringify(scores)); // Save the updated array to localStorage
    console.log("Current Score Saved: ", currentScore);
    alert("Score saved! Current score is now: " + currentScore);
  }

  // Check if a saved array exists and load it
  if (localStorage.getItem("gameScores")) {
    console.log("Loaded scores: ", scores);
  }

  // Add event listener to the button
  document.getElementById("saveButton").addEventListener("click", function () {
    saveData();
  });
});
