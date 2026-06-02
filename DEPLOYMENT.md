# Deployment Guide for Render

## Step-by-Step Instructions

### 1. Prepare Your Repository

Ensure your project structure matches:
```
worldcup-dashboard-v2/
├── frontend/          # React app
├── server/            # Express backend (ROOT DIRECTORY)
├── package.json       # Root package.json
└── .gitignore
```

### 2. Push to GitHub

```bash
cd worldcup-dashboard-v2
git init
git add .
git commit -m "Initial commit: World Cup Dashboard"
git push origin main
```

### 3. Create Web Service on Render

1. Go to [render.com](https://render.com)
2. Click **New Web Service**
3. Connect your GitHub repository

### 4. Configure Render Service

**General Settings:**
- Name: `worldcup-dashboard` (or your preferred name)
- Runtime: `Node`

**Build & Deploy:**
- **Root Directory**: `server/` ⚠️ **CRITICAL**
- **Build Command**: 
  ```
  cd .. && cd frontend && npm install && npm run build && cd ../server && npm install
  ```
- **Start Command**: 
  ```
  node index.js
  ```

### 5. Set Environment Variables

1. In Render dashboard, go to **Environment**
2. Add the following:
   - Key: `FOOTBALL_DATA_API_KEY`
   - Value: `your_actual_api_key_here` (from football-data.org)
   - Key: `NODE_ENV`
   - Value: `production`

### 6. Deploy

- Click **Create Web Service**
- Render will automatically start the build process
- Monitor the logs to ensure build completes successfully

### 7. Verify Deployment

Once deployed:
1. Check that the service is running (green status)
2. Visit your service URL
3. Verify:
   - Frontend loads correctly
   - API endpoints work (`/api/competitions/WC/matches`)
   - Data displays properly

## Troubleshooting Deployment

### Problem: Build fails with "Cannot find module"

**Solution:**
- Ensure the Build Command is exactly:
  ```
  cd .. && cd frontend && npm install && npm run build && cd ../server && npm install
  ```
- This command must run FROM the `server/` directory

### Problem: Frontend shows "Cannot GET /"

**Solution:**
- Verify `server/public/` directory exists in built output
- Check that Vite config outputs to `../server/public/`
- Check Render logs for build errors

### Problem: API calls return 500 errors

**Solution:**
- Verify `FOOTBALL_DATA_API_KEY` is set in Environment Variables
- The key must be from football-data.org
- Check Render logs for specific error messages

### Problem: Cannot connect to API

**Solution:**
- Verify the API endpoint is accessible from Render region
- Check that Football-Data.org API is working
- Verify rate limits haven't been exceeded (10 req/min on free plan)

## How the Deployment Works

1. **Render starts in `server/` directory** (root directory setting)
2. **Build command executes**:
   - Goes to parent directory: `cd ..`
   - Installs and builds frontend: `cd frontend && npm install && npm run build`
   - Frontend builds to: `../server/public/` (as configured in vite.config.ts)
   - Returns to server and installs dependencies: `cd ../server && npm install`
3. **Start command runs**: `node index.js`
   - Express starts on PORT 3000 (Render automatically maps this)
   - Serves static files from `server/public/`
   - Proxies API calls to Football-Data.org

## Getting Your API Key

1. Visit [https://www.football-data.org/](https://www.football-data.org/)
2. Create a free account
3. Go to your account settings
4. Generate an API Token
5. Add it to Render Environment Variables

## Key Differences from Development

| Feature | Development | Production (Render) |
|---------|-------------|-----------------|
| Frontend Server | Vite dev server on 5173 | Built static files in `server/public/` |
| Backend Server | Express on 3000 | Express on 3000 (mapped by Render) |
| API Calls | Proxied via Vite config | Direct to `/api` routes |
| Environment Variables | From `.env` file | From Render Dashboard |
| Database | None needed | None needed |
| Frontend Build | On-the-fly | Pre-built during deploy |

## Redeploying

To redeploy after code changes:

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

2. Render will automatically trigger a rebuild
3. Check the Deployment Logs in Render dashboard
4. Service will restart automatically once build completes

## Monitoring

- Check Render **Logs** for errors
- Monitor the **Metrics** tab for CPU/Memory usage
- Set up **Alerts** if needed

## Costs

- Render free tier includes one web service
- If you exceed free tier limits, consider upgrading to Starter Plan
