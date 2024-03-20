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

function getPollutantPreferences(user, callback) {
  // Example implementation - replace with your actual Firestore query
  // Assuming 'user' is your authenticated Firebase user object
  const userID = user.uid;
  const userPollutantPath = db.collection("users").doc(userID).collection("pollutant").doc(userID);

  userPollutantPath.get().then(doc => {
    if (doc.exists) {
      // Call the callback function with the retrieved data
      callback(doc.data());
    } else {
      console.log("No pollutant preferences found for user");
      callback({});
    }
  }).catch(error => {
    console.error("Error getting pollutant preferences:", error);
    callback({});
  });
}

// Function to convert RGB color value to Hex
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Function to initiate the fetch operation and return a promise
function fetchAirQualityData() {
  const url = 'https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyAmrsLsCTac2ioAb0ChDMdDsfMDVPJeAuM';
  const requestData = {
    universalAqi: true,
    location: {
      latitude: 49.2827,
      longitude: 123.1207
    },
    extraComputations: [
      "HEALTH_RECOMMENDATIONS",
      "DOMINANT_POLLUTANT_CONCENTRATION",
      "POLLUTANT_CONCENTRATION",
      "LOCAL_AQI",
      "POLLUTANT_ADDITIONAL_INFO"
    ],
    languageCode: "en"
  };


  // Return the fetch promise chain
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // This is the data you'll use in the next .then
    });
}

function displayAirQualityData(data, userPreferences) {
  const resultsElement = document.getElementById('results');
  if (!resultsElement) {
    console.error('The element with the ID "results" was not found.');
    return;
  }

  // Assuming the rgbToHex function has been defined elsewhere
  const universalAqiColor = rgbToHex(
    data.indexes[0].color.red,
    data.indexes[0].color.green,
    data.indexes[0].color.blue
  );

  // Start constructing the HTML content
  let htmlContent = `<div style="border-color: ${universalAqiColor};">`;

  // Loop through each pollutant in the data and check user preferences
  htmlContent += '<div><strong>Pollutants:</strong><ul>';
  data.pollutants.forEach(pollutant => {
    // Convert the pollutant code to uppercase because Firestore keys are usually case-sensitive
    if (userPreferences[pollutant.code.toUpperCase()]) {
      htmlContent += `<li>
        <p><strong>${pollutant.displayName} (${pollutant.fullName}):</strong> ${pollutant.concentration.value} ${pollutant.concentration.units}</p>
        <p><strong>Sources:</strong> ${pollutant.additionalInfo.sources}</p>
        <p><strong>Effects:</strong> ${pollutant.additionalInfo.effects}</p>
      </li>`;
    }
  });
  htmlContent += '</ul></div>';

  // Add any additional HTML content here...

  // Close the main container div
  htmlContent += '</div>';

  // Update the DOM with the generated content
  resultsElement.innerHTML = htmlContent;
}



// Assuming user is logged in and you have their user object
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    getPollutantPreferences(user, (userPreferences) => {
      // Fetch and display air quality data with user preferences
      fetchAirQualityData().then(data => {
        displayAirQualityData(data, userPreferences); // Assuming this function handles the data correctly
      }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    });
  } else {
    console.log("No user is logged in");
  }
});



getNameFromAuth(); // Run the function
