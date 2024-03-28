async function getForecast(url) {
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
        <div class="flex mb-3 bg-gradient-to-r from-indigo-400 to-cyan-300 rounded-lg w-[80%]">
            <div class="flex flex-col text-center p-3 w-[80%]">
                <h4 class="text-2xl">${formattedTodayDate}</h4>
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
        <div class="flex mb-3 bg-gradient-to-r from-emerald-400 to-purple-300 rounded-lg w-[80%]">
            <div class="flex flex-col text-center p-3 w-[80%]">
                <h4 class="text-2xl">${formattedTomorrowDate}</h4>
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
        <div class="flex mb-3 bg-gradient-to-r from-cyan-400 to-indigo-300 rounded-lg w-[80%]">
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
        <div class="flex mb-3 bg-gradient-to-r from-purple-400 to-emerald-300 rounded-lg w-[80%]">
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

getForecast('http://api.openweathermap.org/data/2.5/forecast?id=6173331&APPID=73e6dd36a2a073c414a629760ac198ce');


function getWeatherIcon(description) {
    if (description.includes('cloud')) {
        return './images/cloud.png';
    } else if (description.includes('rain')) {
        return './images/rain.png';
    } else if (description.includes('sun')) {
        return './images/sun.png';
    } else if (description.includes('snow')) {
        return './images/snow.png';
    } else {
        return './images/default.png';
    }
}