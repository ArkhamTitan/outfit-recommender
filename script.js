const input = document.getElementById("locationInput");
const btn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");
const weatherPanel = document.getElementById("weatherPanel");
const outfitResults = document.getElementById("outfitResults");
const outfitGrid = document.getElementById("outfitGrid");
const cityName = document.getElementById("cityName");
const weatherDesc = document.getElementById("weatherDesc");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const loading = document.getElementById("loading");

btn.addEventListener("click", fetchOutfit);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchOutfit();
    }
});

async function fetchOutfit() {
    console.log("Button clicked!");
    const city = input.value.trim();
    if (!city) return showError("Please enter a city.");

    hideError();

    try {
        const res = await fetch(`https://outfit-recommender-6lvm.onrender.com/api/outfit?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);

        updateWeatherUI(data);
        updateOutfitUI(data.outfit);
        updateTheme(data.temp);

    } catch (e) {
        showError(e.message);
    }
}

function updateWeatherUI(data) {
    weatherPanel.classList.remove("hidden");

    cityName.textContent = data.city;
    weatherDesc.textContent = data.condition;
    temperature.textContent = `${Math.round(data.temp)}°F`;

    // Emoji icon mapping
    const iconMap = {
        clear: "☀️",
        clouds: "☁️",
        rain: "🌧️",
        snow: "❄️",
        thunderstorm: "⛈️",
        drizzle: "🌦️"
    };

    const conditionKey = data.condition.toLowerCase();

    weatherIcon.textContent = iconMap[conditionKey] || "🌡️";
}

function updateOutfitUI(outfit) {
    outfitResults.classList.remove("hidden");

    outfitGrid.innerHTML = `
        <div class="outfitCard">
            <h4>Top</h4>
            <p>${outfit.top}</p>
        </div>
        <div class="outfitCard">
            <h4>Bottom</h4>
            <p>${outfit.bottom}</p>
        </div>
        <div class="outfitCard">
            <h4>Shoes</h4>
            <p>${outfit.shoes}</p>
        </div>
    `;
}

function updateTheme(temp) {
    document.body.classList.remove("cold", "warm", "hot");

    if (temp < 40) document.body.classList.add("cold");
    else if (temp < 70) document.body.classList.add("warm");
    else document.body.classList.add("hot");
}

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove("hidden");
}

function hideError() {
    errorMsg.classList.add("hidden");
}
