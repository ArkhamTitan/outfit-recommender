const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/api/outfit", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.json({error: "City Required"});
    try {
        const weather = await getWeather(city, process.env.API_KEY);
        const outfit = getOutfit(weather.temp, weather.condition);

        res.json({
            city,
            temp: weather.temp,
            condition: weather.condition,
            outfit
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    });

    app.listen(PORT, () => console.log("Server running on port", PORT));