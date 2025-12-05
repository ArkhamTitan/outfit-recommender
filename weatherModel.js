const fetch = require("node-fetch");

// Fetches current weather data for a given city using OpenWeatherMap
async function getWeather(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
    )}&units=imperial&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("City not found");
    }

    const data = await response.json();

    // Also fetch 5-day forecast to get better high/low estimates
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
    )}&units=imperial&appid=${apiKey}`;
    
    let temp_max = data.main.temp;
    let temp_min = data.main.temp;

    // returns the temp in F, and the weather in lowercase
    return {
        temp: data.main.temp,
        tempLow:  temp_min,
        tempHigh: temp_max,
        condition: data.weather[0].main.toLowerCase()
    };
}

module.exports = { getWeather }