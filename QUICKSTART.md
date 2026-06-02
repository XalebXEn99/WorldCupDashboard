# Quick Start Guide

## 5-Minute Setup for Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Football-Data.org API key (free)

### Step 1: Get Your API Key (2 min)

1. Visit [https://www.football-data.org/](https://www.football-data.org/)
2. Sign up for a free account
3. Go to account settings → API Tokens
4. Copy your API key

### Step 2: Configure Environment (1 min)

Create `server/.env`:
```
FOOTBALL_DATA_API_KEY=your_key_here
PORT=3000
```

### Step 3: Install Dependencies (1 min)

```bash
cd frontend && npm install
cd ../server && npm install
```

### Step 4: Run Locally (1 min)

**Terminal 1** - Frontend dev server:
```bash
cd frontend
npm run dev
```
→ Opens on `http://localhost:5173`

**Terminal 2** - Backend API server:
```bash
cd server
npm start
```
→ Runs on `http://localhost:3000`

✅ Done! The app should be running with live data.

## Build for Production

```bash
npm run build
```

This creates the production build in `server/public/`

## Deploy to Render

1. Push to GitHub
2. Create Web Service on Render
3. Set Root Directory to `server/`
4. Add Build Command: `cd .. && cd frontend && npm install && npm run build && cd ../server && npm install`
5. Add Start Command: `node index.js`
6. Set `FOOTBALL_DATA_API_KEY` environment variable
7. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## What's Running?

- **Frontend** (React): Displays the UI
- **Backend** (Express): Serves frontend + proxies API calls
- **API** (Football-Data.org): World Cup data source

## Key Features

- 🏆 Live World Cup data
- 👥 Family leaderboard scoring
- ⏱️ Match countdown timers
- 🔄 Auto-refreshing scores
- 📱 Responsive design

## Team Assignments

6 family members own teams in 6 groups. Points are calculated based on match results.

See [README.md](./README.md) for full team list.

## Troubleshooting

**Frontend not loading?**
- Check browser console for errors
- Verify backend is running
- Check that API key is set

**API errors?**
- Verify Football-Data.org API key is valid
- Check rate limits (10/min on free plan)
- See server terminal for error messages

**Need help?**
- Check logs in both terminals
- Visit Football-Data.org docs: https://www.football-data.org/client/register
