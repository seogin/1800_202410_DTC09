function insertCityFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
              // Get the city name
              let cityName = userDoc.data().city;
              console.log(cityName);
              getForecast(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=73e6dd36a2a073c414a629760ac198ce`, cityName);
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertCityFromFirestore();

async function getForecast(url, cityName) {
    // Retrieve the local forecast
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    // Save the API response as a txt file
    // Note: This part is not possible in client-side JavaScript due to security restrictions.
    // You would need to use Node.js and the 'fs' module to write to a file.

    // Parse the JSON data
    // const vancouverWeather = JSON.parse(data);
    // const localWeather = vancouverWeather['list'];

    const todayDate = new Date(data.list[0].dt * 1000);
    const formattedTodayDate = todayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'});
    const todayTemp = Math.ceil(data.list[0].main.temp - 273);
    const todayTempMin = Math.ceil(data.list[0].main.temp_min - 273);
    const todayTempMax = Math.ceil(data.list[0].main.temp_max - 273);

    const tomorrowDate = new Date(data.list[8].dt * 1000);
    const formattedTomorrowDate = tomorrowDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'});
    const tomorrowTemp = Math.ceil(data.list[8].main.temp - 273);
    const tomorrowTempMin = Math.ceil(data.list[8].main.temp_min - 273);
    const tomorrowTempMax = Math.ceil(data.list[8].main.temp_max - 273);

    const dayAfterTomorrowDate = new Date(data.list[16].dt * 1000);
    const formattedDayAfterTomorrowDate = dayAfterTomorrowDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'});
    const dayAfterTomorrowTemp = Math.ceil(data.list[16].main.temp - 273);
    const dayAfterTomorrowTempMin = Math.ceil(data.list[16].main.temp_min - 273);
    const dayAfterTomorrowTempMax = Math.ceil(data.list[16].main.temp_max - 273);

    const twoDaysAfterTomorrowDate = new Date(data.list[24].dt * 1000);
    const formattedTwoDaysAfterTomorrowDate = twoDaysAfterTomorrowDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'});
    const twoDaysAfterTomorrowTemp = Math.ceil(data.list[24].main.temp - 273);
    const twoDaysAfterTomorrowTempMin = Math.ceil(data.list[24].main.temp_min - 273);
    const twoDaysAfterTomorrowTempMax = Math.ceil(data.list[24].main.temp_max - 273);

    // Display the weather description
    const todayWeatherDescription = data.list[0].weather[0].description;
    const tomorrowWeatherDescription = data.list[1].weather[0].description;
    const dayAfterTomorrowWeatherDescription = data.list[9].weather[0].description;
    const twoDaysAfterTomorrowWeatherDescription = data.list[17].weather[0].description;

    // Display the weather icon
    const todayWeatherIcon = getWeatherIcon(todayWeatherDescription);
    const tomorrowWeatherIcon = getWeatherIcon(tomorrowWeatherDescription);
    const dayAfterTomorrowWeatherIcon = getWeatherIcon(dayAfterTomorrowWeatherDescription);
    const twoDaysAfterTomorrowWeatherIcon = getWeatherIcon(twoDaysAfterTomorrowWeatherDescription);

    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
            <div class="rounded-3xl my-3 mx-0.25 text-lg font-bold text-blue-100 bg-emerald-500 pt-2 mx-0.25 w-100">
            <span class="mt-2 ml-4">${cityName}</span>
            <div class="flex rounded-3xl text-lg font-bold pt-2 bg-gradient-to-r from-indigo-400/90 to-cyan-300/50">
                <div class="flex flex-col text-center p-3 w-[80%]">
                    <h4 class="text-2xl mt-3">${formattedTodayDate}</h4>
                    <h1 class="my-4">${todayTemp} &degC</h1>
                    <div class="flex justify-center gap-4">
                        <p>Min: ${todayTempMin} &degC</p> 
                        <p>Max: ${todayTempMax} &degC</p>
                    </div>
                </div>
                <div class="flex flex-col p-3 mb-4 text-center">
                    <img src="${todayWeatherIcon}" alt="weather-icon" class="w-20 h-20 mx-auto">
                    ${todayWeatherDescription}
                </div>
            </div>
            </div>
        <div class="flex mb-3 rounded-3xl text-lg font-bold pt-2 bg-gradient-to-r from-emerald-400/90 to-purple-300/80 w-100">
            <div class="flex flex-col text-center p-3 w-[80%]">
                <h4 class="text-2xl mt-2">${formattedTomorrowDate}</h4>
                <h1 class="my-4">${tomorrowTemp} &degC</h1>
                <div class="flex justify-center gap-4">
                    <p>Min: ${tomorrowTempMin} &degC</p> 
                    <p>Max: ${tomorrowTempMax} &degC</p>
                </div>
            </div>
            <div class="flex flex-col p-3 mb-4 text-center">
                <img src="${tomorrowWeatherIcon}" alt="weather-icon" class="w-20 h-20 mx-auto">
                ${tomorrowWeatherDescription}
            </div>    
        </div>
        <div class="flex mb-3 bg-gradient-to-r from-cyan-400/80 to-indigo-300/75 rounded-3xl text-lg font-bold pt-2 w-100">
            <div class="flex flex-col text-center p-3 w-[80%]">
                <h4 class="text-2xl">${formattedDayAfterTomorrowDate}</h4>
                <h1 class="my-4">${dayAfterTomorrowTemp} &degC</h1>
                <div class="flex justify-center gap-4">
                    <p>Min: ${dayAfterTomorrowTempMin} &degC</p> 
                    <p>Max: ${dayAfterTomorrowTempMax} &degC</p>
                </div>   
            </div>
            <div class="flex flex-col p-3 mb-4 text-center">
                <img src="${dayAfterTomorrowWeatherIcon}" alt="weather-icon" class="w-20 h-20 mx-auto">
                ${dayAfterTomorrowWeatherDescription}
            </div>
        </div>
        <div class="flex mb-3 bg-gradient-to-r from-purple-400/80 to-emerald-300/75 rounded-3xl text-lg font-bold pt-2 w-100">
            <div class="flex flex-col text-center p-3 w-[80%]">    
                <h4 class="text-2xl">${formattedTwoDaysAfterTomorrowDate}</h4>
                <h1 class="my-4">${twoDaysAfterTomorrowTemp} &degC</h1>
                <div class="flex justify-center gap-4">
                    <p>Min: ${twoDaysAfterTomorrowTempMin} &degC</p> 
                    <p>Max: ${twoDaysAfterTomorrowTempMax} &degC</p>
                </div>
            </div>
            <div class="flex flex-col p-3 mb-4 text-center">
                <img src="${twoDaysAfterTomorrowWeatherIcon}" alt="weather-icon" class="w-20 h-20 mx-auto">
                ${twoDaysAfterTomorrowWeatherDescription}
            </div>
        </div>
    `;
}


function getWeatherIcon(description) {
    if (description.includes('cloud')) {
        return './images/cloud.png';
    } else if (description.includes('rain')) {
        return './images/rain.png';
    } else if (description.includes('sun') || description.includes('clear sky')) {
        return './images/sun.png';
    } else if (description.includes('snow')) {
        return './images/snow.png';
    } else {
        return './images/default.png';
    }
}