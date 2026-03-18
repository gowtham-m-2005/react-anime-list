# MAL Dashboard

A personal MyAnimeList dashboard built with React + Vite.
Live : https://react-anime-list-live.vercel.app/

## Features
- OAuth 2.0 PKCE login with MyAnimeList
- View your anime list by status (watching, completed, on hold, dropped, plan to watch)
- Genre filtering
- Anime detail modal with synopsis, genres, scores and dates
- Stats page with status breakdown chart
- Skeleton loading cards
- Profile picture and username display
- Responsive design

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router
- MyAnimeList API

## Setup

1. Clone the repo
```
   git clone https://github.com/yourusername/react-anime-list.git
   cd react-anime-list
```

2. Install dependencies
```
   npm install
```

3. Create a `.env` file in the root:
```
   VITE_MAL_CLIENT_ID=your_client_id
   VITE_MAL_CLIENT_SECRET=your_client_secret
   VITE_MAL_REDIRECT_URI=http://localhost:5174/callback
```

4. Register your app at [myanimelist.net/apiconfig](https://myanimelist.net/apiconfig)
   - App Type: Web
   - Redirect URL: `http://localhost:5174/callback`

5. Run the app
```
   npm run dev
```

## Screenshots
coming soon
