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

    // returns the temp in F, high/low estimates, and the weather in lowercase
    return {
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        condition: data.weather[0].main.toLowerCase()
    };
}

module.exports = { getWeather }