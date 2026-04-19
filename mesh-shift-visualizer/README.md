# Mesh Circular Shift Visualizer

This is a full-stack interactive web application built with React (Vite) that simulates and visualizes the circular q-shift operation on a 2D mesh topology.

## Algorithm Description
The circular shift on a √p × √p mesh is performed in two stages:
1. **Stage 1 — Row Shift:** Each node shifts within its row by `(q mod √p)` positions horizontally.
2. **Stage 2 — Column Shift:** Each node shifts vertically within its column by `⌊q / √p⌋` positions to map to its global row-major order assignment.

## Setup Instructions

### Local Development
To run this project locally, ensure you have Node.js installed, then execute:

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

### Deployment (Vercel / Netlify)
1. Push this code to a public GitHub repository.
2. Link your GitHub account to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
3. Import the repository. The build command will automatically be detected as `npm run build` and the output directory as `dist`.
4. Click **Deploy**.

## Live Deployment URL
*(Add your live URL here once deployed)*
[LIVE URL]
