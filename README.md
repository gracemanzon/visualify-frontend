# Visualify - Spotify Data Visualizer

Visualify is a browser based app that is inspired by Spotify Wrapped and combines a users realtime Spotify account data with detailed graphs. This react frontend works in conjuction with a rails backend found here: [visualify-api](https://github.com/gracemanzon/visualify-api)

- RESTful backend built with Ruby on Rails using an MCV architecture
- User authentication with using JSON web tokens
- Frontend built with React and allowing Spotify API connect using OAuth
- Personalized charts genreated with the Plotly library for React

![screenshot](/assets/visualify-preview.png)

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

You'll need to have the backend code running on http://localhost:3000.
You can view the app on http://localhost:5173.

## Roadmap

- Narrowing Top Artists/Top Tracks view by 6 week periods
- P5.js or CanvasSketch integration to produce personalized graphics
