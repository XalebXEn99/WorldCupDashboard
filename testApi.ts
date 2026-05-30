// testApi.ts
import axios from "axios";

const API_URL = "https://api.football-data.org/v4";
const API_KEY = process.env.VITE_FOOTBALL_DATA_API_KEY;

async function test() {
  const fixtures = await axios.get(`${API_URL}/competitions/WC/matches`, {
    headers: { "X-Auth-Token": API_KEY }
  });
  console.log("Fixtures:", JSON.stringify(fixtures.data, null, 2));

  const standings = await axios.get(`${API_URL}/competitions/WC/standings`, {
    headers: { "X-Auth-Token": API_KEY }
  });
  console.log("Standings:", JSON.stringify(standings.data, null, 2));
}

test().catch(console.error);
