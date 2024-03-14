function previousData() {

  // Corrected: Initialize or load the retries array
  var retries = localStorage.getItem("mirrorRetries")
    ? JSON.parse(localStorage.getItem("mirrorRetries"))
    : []; // Should be an array to match your usage

  // Adjusted to work with retries as an array
  var retryAmount = retries.length > 0 ? retries[retries.length - 1] : 1; // Start from 1 or the last retry amount

  function saveData() {
    retryAmount += 1; // Increase retryAmount by 1
    retries.push(retryAmount); // Push updated retryAmount into retries array

    localStorage.setItem("mirrorRetries", JSON.stringify(retries)); // Save retries as an array

    console.log("Current Retries: ", retryAmount);
    alert("Total retries: " + retryAmount);
  }

  if (localStorage.getItem("gameScores") && localStorage.getItem("mirrorRetries")) {
    console.log("Loaded retries: ", retries);
  }

  document.getElementById("saveButton").addEventListener("click", function () {
    saveData();
  });
}

document.addEventListener("DOMContentLoaded", previousData());
