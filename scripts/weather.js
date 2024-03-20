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

    const todayTemp = Math.ceil(data.list[0].main.temp - 273);
    const todayTempMin = Math.ceil(data.list[0].main.temp_min - 273);
    const todayTempMax = Math.ceil(data.list[0].main.temp_max - 273);

    const tomorrowTemp = Math.ceil(data.list[1].main.temp - 273);
    const tomorrowTempMin = Math.ceil(data.list[1].main.temp_min - 273);
    const tomorrowTempMax = Math.ceil(data.list[1].main.temp_max - 273);

    const dayAfterTomorrowTemp = Math.ceil(data.list[2].main.temp - 273);
    const dayAfterTomorrowTempMin = Math.ceil(data.list[2].main.temp_min - 273);
    const dayAfterTomorrowTempMax = Math.ceil(data.list[2].main.temp_max - 273);

    // Print the weather
    // console.log(localWeather[0]['weather'][0]);
    // console.log('Current weather in Vancouver:');
    // console.log(localWeather[0]['weather'][0]['main'], '-', localWeather[0]['weather'][0]['description']);

    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
        <div class="flex flex-col text-center p-3 mb-4 bg-slate-500 rounded-lg w-[80%]">
            <h4 class="text-2xl">Today</h4>
            <h1 class="my-4">${todayTemp} &degC</h1>
            <div class="flex justify-center gap-4">
                <p>Min: ${todayTempMin} &degC</p> 
                <p>Max: ${todayTempMax} &degC</p>
            </div>
        </div>
        <div class="flex flex-col text-center p-3 mb-4 bg-slate-500 rounded-lg w-[80%]">
            <h4 class="text-2xl">Tomorrow</h4>
            <h1 class="my-4">${tomorrowTemp} &degC</h1>
            <div class="flex justify-center gap-4">
                <p>Min: ${tomorrowTempMin} &degC</p> 
                <p>Max: ${tomorrowTempMax} &degC</p>
            </div>
        </div>
        <div class="flex flex-col text-center p-3 mb-4 bg-slate-500 rounded-lg w-[80%]">
            <h4 class="text-2xl">Day After Tomorrow</h4>
            <h1 class="my-4">${dayAfterTomorrowTemp} &degC</h1>
            <div class="flex justify-center gap-4">
                <p>Min: ${dayAfterTomorrowTempMin} &degC</p> 
                <p>Max: ${dayAfterTomorrowTempMax} &degC</p>
            </div>
        </div>
    `;
}

getForecast('http://api.openweathermap.org/data/2.5/forecast?id=6173331&APPID=73e6dd36a2a073c414a629760ac198ce');