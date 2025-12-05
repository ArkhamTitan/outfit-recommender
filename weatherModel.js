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
    
    try {
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            
            // Get temperatures from next 8 forecast entries (next 24 hours)
            const next24Hours = forecastData.list.slice(0, 8);
            const temps = next24Hours.map(entry => entry.main.temp);
            
            temp_max = Math.max(...temps, data.main.temp);
            temp_min = Math.min(...temps, data.main.temp);
        }
    } catch (err) {
        // If forecast fails, just use current temp for both
        console.log("Forecast fetch failed, using current temp");
    }

    // returns the temp in F, high/low estimates, and the weather in lowercase
    return {
        temp: data.main.temp,
        temp_max: temp_max,
        temp_min: temp_min,
        condition: data.weather[0].main.toLowerCase()
    };
}

module.exports = { getWeather }