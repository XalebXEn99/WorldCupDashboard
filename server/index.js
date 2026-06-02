import "dotenv/config.js";
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const API_URL = "https://api.football-data.org/v4";

// Get API key from environment
const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

if (!API_KEY) {
  console.error("ERROR: FOOTBALL_DATA_API_KEY environment variable is missing");
  process.exit(1);
}

console.log("✓ API Key configured");
console.log("✓ Server starting...");

// ============= MIDDLEWARE =============
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ============= API ROUTES =============
// Proxy Football-Data.org API for matches
app.get("/api/competitions/WC/matches", async (req, res) => {
  try {
    console.log("[API] Fetching WC matches...");
    const response = await axios.get(`${API_URL}/competitions/WC/matches`, {
      headers: { "X-Auth-Token": API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    console.error("[API Error] Fetching matches:", err.message);
    res.status(500).json({ error: "Failed to fetch matches", details: err.message });
  }
});

// Proxy Football-Data.org API for standings
app.get("/api/competitions/WC/standings", async (req, res) => {
  try {
    console.log("[API] Fetching WC standings...");
    const response = await axios.get(`${API_URL}/competitions/WC/standings`, {
      headers: { "X-Auth-Token": API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    console.error("[API Error] Fetching standings:", err.message);
    res.status(500).json({ error: "Failed to fetch standings", details: err.message });
  }
});

// ============= SERVE REACT FRONTEND =============
// This handles serving the built React app and all its routes
const frontendPath = path.join(__dirname, "public");

app.get("*", (req, res) => {
  // Serve index.html for all unknown routes (SPA routing)
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(500).send("Error loading application");
    }
  });
});

// ============= START SERVER =============
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✓ Backend running on http://localhost:${PORT}`);
  console.log(`✓ API endpoint: http://localhost:${PORT}/api/competitions/WC/matches`);
  console.log(`✓ Serving frontend from: ${frontendPath}\n`);
});
