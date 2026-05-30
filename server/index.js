import express from "express";
import axios from "axios";

const app = express();
const API_URL = "https://v3.football.api-sports.io";
const API_KEY = process.env.API_SPORTS_KEY; // stored safely in Render

app.get("/fixtures", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/fixtures`, {
      headers: { "x-apisports-key": API_KEY },
      params: { league: 1, season: 2026 } // World Cup league ID
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fixtures" });
  }
});

app.get("/standings", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/standings`, {
      headers: { "x-apisports-key": API_KEY },
      params: { league: 1, season: 2026 }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
