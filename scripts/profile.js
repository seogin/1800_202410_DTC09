function getNameFromAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid); // Print the uid in the browser console
      console.log(user.displayName); // Print the user name in the browser console
      let userName = user.displayName;

      // Method #2: Insert using jQuery, corrected event listener syntax
      $("#pollutant").on("click", () => checkPollutant(user));
      $("#name-goes-here").text(userName); // Using jQuery

    } else {
      console.log("No user is logged in");
    }
  });
}

function checkPollutant(user) {
  if (user) {
    const userID = user.uid;

    // Define a path to the subcollection for this user
    const userPollutantPath = db.collection("users").doc(userID).collection("pollutant");

    // Assuming you want a single document for pollutants which you can update
    userPollutantPath.doc(userID).set({
      CO: document.getElementById("CO").checked,
      NO2: document.getElementById("NO2").checked,
      O3: document.getElementById("O3").checked,
      PM10: document.getElementById("PM10").checked,
      PM25: document.getElementById("PM2.5").checked, // Ensure the ID matches your HTML element
      SO2: document.getElementById("SO2").checked
    }).then(() => {
      console.log("Pollutant data successfully written!");
    }).catch((error) => {
      console.error("Error writing pollutant data:", error);
    });
  }
}

getNameFromAuth(); // Run the function
