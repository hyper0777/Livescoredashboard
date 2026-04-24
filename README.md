
  # Live Score Dashboard

  This is a code bundle for Live Score Dashboard. The original project is available at https://www.figma.com/design/wSdtm6pwBJr96jOlYRtSz3/Live-Score-Dashboard.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Netlify function

This project now includes a Netlify serverless function at `netlify/functions/server.js`.

When deployed on Netlify, API requests can use these routes:
- `/api/health`
- `/api/test-api`
- `/api/matches/live`
- `/api/streams/live`
- `/api/stream/:matchSlug`
- `/api/highlights/:matchId`

Set `RAPIDAPI_KEY` in Netlify environment variables for live API access.

