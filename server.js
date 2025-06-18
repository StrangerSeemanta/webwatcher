require("dotenv").config({ path: ".env.local" });

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// 🔄 LiveReload: Only in dev mode
if (process.env.NODE_ENV !== 'production') {
  const livereload = require('livereload');
  const connectLivereload = require('connect-livereload');

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, 'public'));

  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });

  app.use(connectLivereload());
}

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
//test version endpoint
app.get("/api/version", (req, res) => {
  res.json({ webwatcher_version: "1.1.0" });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/documentation", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "documentation.html"));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`🟢 Web Watcher running at http://localhost:${PORT}`);
});
