# Testing Guide

## Pre-Deployment Testing

Before deploying to Render, verify everything works locally:

### 1. Local Build Test

```bash
npm run build
```

Verify:
- ✓ No errors during build
- ✓ `frontend/dist/` directory created
- ✓ `server/public/` contains built files
- ✓ `server/public/index.html` exists

### 2. Production Mode Test

```bash
# Terminal 1: Start the server
cd server
NODE_ENV=production node index.js
```

Verify:
- ✓ Server starts without errors
- ✓ Logs show "✓ Backend running on http://localhost:3000"
- ✓ Can access http://localhost:3000 in browser

### 3. Check Served Files

```bash
# Terminal 2: Test frontend is served
curl http://localhost:3000
```

Should return HTML (not an error)

### 4. Test API Endpoints

```bash
# Test matches endpoint
curl "http://localhost:3000/api/competitions/WC/matches" \
  -H "X-Auth-Token: YOUR_API_KEY"

# Test standings endpoint  
curl "http://localhost:3000/api/competitions/WC/standings" \
  -H "X-Auth-Token: YOUR_API_KEY"
```

Verify:
- ✓ Returns JSON data
- ✓ No 500 errors
- ✓ Data is properly formatted

### 5. Browser Testing

1. Open http://localhost:3000
2. Check that:
   - ✓ Page loads without errors
   - ✓ Header displays correctly
   - ✓ All sections render (Next Match, Live Score, etc.)
   - ✓ Data appears from Football-Data.org
   - ✓ No console errors

### 6. Network Test (DevTools)

1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Verify:
   - ✓ index.html loads from `/`
   - ✓ CSS/JS load from `/assets/`
   - ✓ API calls go to `/api/...`
   - ✓ No 404 errors
   - ✓ All requests have 200 status

### 7. Mobile Responsiveness

1. Open DevTools Device Emulation (Ctrl+Shift+M)
2. Test on different screen sizes:
   - ✓ Mobile (375px)
   - ✓ Tablet (768px)
   - ✓ Desktop (1920px)
3. Verify layout adjusts correctly

## Deployment Verification

### After deploying to Render:

1. **Check Service Status**
   - Dashboard shows green status ✓
   - No error logs ✓

2. **Test Frontend**
   ```bash
   curl https://your-service-name.onrender.com
   ```
   Should return HTML ✓

3. **Test API**
   ```bash
   curl "https://your-service-name.onrender.com/api/competitions/WC/matches"
   ```
   Should return JSON ✓

4. **Visit in Browser**
   - https://your-service-name.onrender.com
   - Page loads ✓
   - Data displays ✓
   - No console errors ✓

5. **Check Logs**
   - Render Dashboard → Logs
   - Look for startup message ✓
   - No error messages ✓

## Automated Testing Checklist

### Frontend
- [ ] All components render without errors
- [ ] API calls return data
- [ ] Leaderboard calculates points correctly
- [ ] CountdownTimer updates
- [ ] Mobile layout responsive
- [ ] No console errors

### Backend
- [ ] Starts without errors
- [ ] Serves static files
- [ ] API routes respond with 200
- [ ] Environment variables loaded
- [ ] No unhandled exceptions

### Integration
- [ ] Frontend loads from `/`
- [ ] API calls work from frontend code
- [ ] Dropdown menus function
- [ ] Score updates work
- [ ] No CORS errors

## Performance Testing

### Load Test (Production)

```bash
# Simple load test with Apache Bench
ab -n 100 -c 10 https://your-service-name.onrender.com/

# Or use wrk if installed
wrk -t4 -c100 -d30s https://your-service-name.onrender.com/
```

Expected results:
- ✓ Most requests < 500ms
- ✓ 0 errors
- ✓ No 5xx responses

## Monitoring

After deployment, monitor:

1. **Render Metrics**
   - CPU usage < 50%
   - Memory usage < 512MB
   - No restarts

2. **Error Logs**
   - Check daily for errors
   - Set up alerts if available

3. **API Performance**
   - Monitor response times
   - Watch for rate limit hits

## Common Issues & Solutions

### Issue: 404 on /
**Solution:** Check `server/public/index.html` exists after build

### Issue: API returns 500
**Solution:** Verify `FOOTBALL_DATA_API_KEY` env var is set

### Issue: CORS errors in console
**Solution:** Should not happen - frontend and backend same origin

### Issue: Styles not loading
**Solution:** Check CSS files in `server/public/assets/`

### Issue: Data not updating
**Solution:** Check API key rate limit (10/min on free tier)

## Test Data

Team assignments for verification:
- Jaimee: USA (should show Jaimee in chips)
- Josh: Argentina (should show Josh)
- Caleb: Netherlands (should show Caleb)
- Jordyn: Brazil (should show Jordyn)
- Mummy: France (should show Mummy)
- Dadda: England (should show Dadda)

If any team doesn't show an owner, there's an issue with team name normalization.

## Smoke Test Script

```bash
#!/bin/bash

echo "Testing World Cup Dashboard..."

# Test homepage
echo "1. Testing homepage..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
echo ""

# Test API endpoint
echo "2. Testing API matches..."
curl -s -o /dev/null -w "%{http_code}" \
  "http://localhost:3000/api/competitions/WC/matches" \
  -H "X-Auth-Token: $FOOTBALL_DATA_API_KEY"
echo ""

# Test API standings
echo "3. Testing API standings..."
curl -s -o /dev/null -w "%{http_code}" \
  "http://localhost:3000/api/competitions/WC/standings" \
  -H "X-Auth-Token: $FOOTBALL_DATA_API_KEY"
echo ""

echo "Smoke test complete!"
```

Run with: `bash smoke-test.sh`

All endpoints should return 200.
