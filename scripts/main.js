function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
                document.getElementById("name").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();

// Function to convert RGB color value to Hex
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Function to initiate the fetch operation
function fetchAirQualityData() {
    const url = 'https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyDtWxSnu-NjYmWH9K4utxzzaNmR9bY2Csg';
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
  
    fetch(url, {
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
        return response.json();
      })
      .then(data => displayAirQualityData(data))
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
  
  // Function to display the air quality data with more details
  function displayAirQualityData(data) {
    // Converting RGB color value to Hex for Universal AQI and AQI (US)
    const universalAqiColor = rgbToHex(data.indexes[0].color.red, data.indexes[0].color.green, data.indexes[0].color.blue);
    const usAqiColor = data.indexes[1].color.green !== undefined ? rgbToHex(0, data.indexes[1].color.green, 0) : '#00FF00'; // Assuming green is the only color provided for US AQI
  
    const resultsElement = document.getElementById('results');
  
    // Adding Universal AQI and AQI (US) information
    // let htmlContent = `
    //   <div class="text-lg">
    //     <p><strong>Time:</strong> ${new Date(data.dateTime).toLocaleString()}</p>
    //     <p><strong>Region:</strong> ${data.regionCode.toUpperCase()}</p>
    //     <div style="margin-bottom: 20px;">
    //       <p><strong>Universal AQI:</strong> ${data.indexes[0].aqiDisplay} <span style="color: ${universalAqiColor};">(${data.indexes[0].category})</span></p>
    //       <p><strong>AQI (US):</strong> ${data.indexes[1].aqiDisplay} <span style="color: ${usAqiColor};">(${data.indexes[1].category})</span></p>
    //       <p><strong>Dominant Pollutant:</strong> ${data.indexes[0].dominantPollutant.toUpperCase()}</p>
    //     </div>
    // `;
  
    //Adding pollutants details
    let htmlContent = `<div class="p-4 text-sm"><span class="text-lg font-bold underline decoration-4 decoration-teal-200">Air Quality</span><ul>`;
    // data.pollutants.forEach(pollutant => {
        htmlContent += `
            <div class="pt-4 flex justify-center text-base"><strong>${data.pollutants[0].displayName}</strong> <img class="size-4 mx-2 mt-2 motion-safe:animate-bounce" src="images/CO.png"> </div>
            <div class="flex justify-center">${data.pollutants[0].concentration.value} <span class="text-[10px] mt-0.5 px-1 text-slate-400">${data.pollutants[0].concentration.units}</span></div>
            <div class="pt-4 flex justify-center text-base"><strong>${data.pollutants[1].displayName}</strong> <img class="size-4 mx-2 mt-2 motion-safe:animate-bounce" src="images/dioxide.png"> </div>
            <div class="flex justify-center">${data.pollutants[1].concentration.value} <span class="text-[10px] mt-0.5 px-1 text-slate-400">${data.pollutants[1].concentration.units}</span></div>
            <div class="pt-4 flex justify-center text-base"><strong>${data.pollutants[2].displayName}</strong> <img class="size-4 mx-2 mt-2 motion-safe:animate-bounce" src="images/O3.png"> </div>
            <div class="flex justify-center">${data.pollutants[2].concentration.value} <span class="text-[10px] mt-0.5 px-1 text-slate-400">${data.pollutants[2].concentration.units}</span></div>
            <div class="pt-4 flex justify-center text-base"><strong>${data.pollutants[3].displayName}</strong> <img class="size-4 mx-2 mt-2 motion-safe:animate-bounce" src="images/PM10.png"> </div>
            <div class="flex flex-wrap justify-center">${data.pollutants[3].concentration.value} <span class="text-[10px] mt-0.5 px-1 text-slate-400">${data.pollutants[3].concentration.units}</span></div>
            <div class="pt-4 flex justify-center text-base"><strong>${data.pollutants[4].displayName}</strong> <img class="size-4 mx-2 mt-1.5 motion-safe:animate-bounce" src="images/PM25.png"> </div>
            <div class="flex flex-wrap justify-center">${data.pollutants[4].concentration.value} <span class="text-[10px] mt-0.5 px-1 text-slate-400">${data.pollutants[4].concentration.units}</span></div>
            <div class="pt-4 flex justify-center text-base"><strong>${data.pollutants[5].displayName}</strong> <img class="size-4 mx-2 mt-1 animate-pulse" src="images/SO2.png"> </div>
            <div class="flex flex-wrap justify-center">${data.pollutants[5].concentration.value} <span class="text-[10px] mt-0.5 px-1 text-slate-400">${data.pollutants[5].concentration.units}</span></div>
        `;
    // });
    htmlContent += `</ul></div>`;
  
    // // Adding health recommendations
    // htmlContent += `<div><strong>Health Recommendations:</strong><ul>`;
    // Object.entries(data.healthRecommendations).forEach(([key, value]) => {
    //   if (value !== "...") { // Filter out placeholder values
    //     htmlContent += `<li><strong>${key.replace(/([A-Z])/g, ' $1').trim()}:</strong> ${value}</li>`;
    //   }
    // });
    // htmlContent += `</ul></div></div>`;
  
    resultsElement.innerHTML = htmlContent;
    resultsElement.style.borderColor = universalAqiColor; // Use Universal AQI color for border
  }
  
  // Remember to call `fetchAirQualityData` to fetch and display the data
  document.addEventListener('DOMContentLoaded', fetchAirQualityData);