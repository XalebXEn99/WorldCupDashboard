# World Cup 2026 Joseph Household Competition

A family World Cup fantasy league application with live scores, group standings, and leaderboard tracking.

## Features

- Next match countdown timer
- Live score updates (every 3 minutes)
- Group stage fixtures and standings
- Knockout stage tracking
- Household leaderboard with points calculation
- Match history
- Prize race tracking (R600 total prize)

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **API**: Football-Data.org API
- **Deployment**: Render

## Setup & Installation

### Local Development

1. **Install dependencies for both frontend and backend**:
   ```bash
   cd frontend && npm install
   cd ../server && npm install
   ```

2. **Set environment variables**:
   Create a `.env` file in the `server/` folder:
   ```
   FOOTBALL_DATA_API_KEY=your_api_key_here
   PORT=3000
   ```

3. **Development mode**:
   Terminal 1 (Frontend):
   ```bash
   cd frontend && npm run dev
   ```
   
   Terminal 2 (Backend):
   ```bash
   cd server && npm start
   ```
   
   Frontend will be available at `http://localhost:5173`
   Backend will be available at `http://localhost:3000`

### Building for Production

```bash
# Build frontend and prepare for server
npm run build
```

This will:
1. Install frontend dependencies
2. Build the React app into `server/public/`
3. Install server dependencies

## Deployment to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "initial commit"
   git push origin main
   ```

2. **Create a new Web Service on Render**:
   - Connect your GitHub repository
   - Set **Root Directory** to `server/`
   - Set **Build Command** to:
     ```
     cd .. && cd frontend && npm install && npm run build && cd ../server && npm install
     ```
   - Set **Start Command** to:
     ```
     node index.js
     ```

3. **Set Environment Variables** on Render:
   - `FOOTBALL_DATA_API_KEY`: Your Football-Data.org API key

4. **Deploy**
   - Render will automatically deploy when you push to GitHub

## Project Structure

```
worldcup-dashboard-v2/
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/           # API and service functions
│   │   ├── data/               # Team owner mappings
│   │   ├── utils/              # Utility functions
│   │   ├── styles/             # CSS styles
│   │   ├── types.ts            # TypeScript types
│   │   ├── App.tsx             # Main app component
│   │   └── index.tsx           # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── server/
│   ├── index.js                # Express server
│   ├── package.json
│   ├── Procfile                # Render deployment config
│   └── public/                 # Built frontend (generated)
├── package.json                # Root package.json
└── .gitignore
```

## How It Works

### Frontend
- React components fetch data from the backend API
- Vite is used for development and bundling
- Built app is served as static files from `server/public/`

### Backend
- Express server proxies requests to Football-Data.org API
- Serves the built React frontend as static files
- Handles API key securely via environment variables

### Deployment
- Render detects the `server/` directory as the root
- Build script builds frontend into `server/public/`
- Frontend is served alongside API routes
- No need for separate frontend service

## Family Team Allocation

- **Jaimee**: USA, Switzerland, Belgium, Japan, Norway, Qatar, Australia, Spain
- **Josh**: Czechia, Paraguay, Haiti, Argentina, Iran, Cape Verde Islands, Congo DR, Curaçao
- **Caleb**: Saudi Arabia, South Africa, Jordan, Algeria, Ghana, Netherlands, Panama, Ivory Coast
- **Jordyn**: Austria, Sweden, Ecuador, New Zealand, Brazil, Turkey, Colombia, Canada
- **Mummy**: France, Portugal, Morocco, Uruguay, Iraq, Germany, Mexico, Bosnia-Herzegovina
- **Dadda**: England, Croatia, South Korea, Uzbekistan, Egypt, Scotland, Senegal, Tunisia

## Points System

- **Win**: 3 points
- **Draw**: 1 point per team
- **Loss**: 0 points

## Troubleshooting

### Build fails on Render
- Check that the API key is set correctly
- Ensure the Root Directory is set to `server/`
- Check the Build Command matches the one above

### Frontend not loading
- Verify the build process completed successfully
- Check that `server/public/` contains the built files
- Ensure the backend is serving static files correctly

### API calls failing
- Verify the Football-Data.org API key is valid
- Check Render logs for error details
- Ensure the API endpoint is accessible

## Getting an API Key

1. Go to [Football-Data.org](https://www.football-data.org/)
2. Sign up for a free account
3. Generate an API key from your account settings
4. Add it as an environment variable on Render

## License

MIT
