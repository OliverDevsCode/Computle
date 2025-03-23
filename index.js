const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const leaderboardRouter = require(path.join(__dirname, 'src', 'api', 'leaderboard'));

// Serve static files correctly
app.use(express.static(path.join(__dirname, 'src'))); // Serve src files
app.use(express.static(path.join(__dirname, 'style'))); // Serve CSS
app.use('/api', leaderboardRouter);

// ✅ Fix: Serve JS and other files correctly before the wildcard route
app.get('/*.js', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

// 🛑 Avoid serving index.html for JS files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
