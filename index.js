const express = require('express');
const promClient = require('prom-client');
const app = express();
const port = 5000;

// Metrics setup
const counter = new promClient.Counter({
  name: 'webapp_requests_total',
  help: 'Total number of requests to the web app'
});

promClient.collectDefaultMetrics();

// Root route
app.get('/', (req, res) => {
  counter.inc();
  res.send(`<h1 style="color:teal;">Laxman!!!🚀</h1>`);
});

// Prometheus metrics route
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
